import { useEffect, useMemo, useState } from "react";
import TableComponent from "@shared/components/common/TableComponent";
import GlobalModal from "@shared/components/common/GlobalModal";
import GlobalConfirmDeleteModal from "@shared/components/common/GlobalConfirmDeleteModal";
import { LexicraftIcon } from "@shared/icons/lexicraft";
import { useLanguage } from "@shared/contexts/LanguageContext";
import { useSecurity } from "@shared/security/SecurityContext";
import { canCrud } from "@shared/security/permissions";
import ForbiddenState from "@shared/security/ForbiddenState";
import { permissionMap } from "@shared/security/permission-map";
import { rbacClient } from "@shared/api/rbac/client";
import { cn } from "@shared/lib/utils";
import { useIsMobile } from "@shared/hooks/use-mobile";

const USER_EMPTY = { name: "", email: "", status: "active", roleIds: [] };
const ROLE_EMPTY = { name: "", permissionNames: [] };

const tabs = [
  { key: "users", label: "rbac.users.title", icon: "users" },
  { key: "roles", label: "rbac.roles.title", icon: "shield" },
  { key: "permissions", label: "rbac.permissions.title", icon: "search" },
];

const UserManagementHub = ({ defaultTab = "users" }) => {
  const isMobile = useIsMobile();
  const { t, isRTL } = useLanguage();
  const { permissions, refreshMe } = useSecurity();
  const [activeTab, setActiveTab] = useState(defaultTab);

  const usersAcl = canCrud(permissions, "adminUsers");
  const rolesAcl = canCrud(permissions, "adminRoles");
  const permissionsAcl = canCrud(permissions, "adminPermissions");

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissionRows, setPermissionRows] = useState([]);
  const [permissionQuery, setPermissionQuery] = useState("");

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedRoleId, setSelectedRoleId] = useState(null);

  const [userForm, setUserForm] = useState(USER_EMPTY);
  const [roleForm, setRoleForm] = useState(ROLE_EMPTY);

  const [editorOpen, setEditorOpen] = useState(false);
  const [editorType, setEditorType] = useState("user");
  const [toDelete, setToDelete] = useState(null);

  const reload = async () => {
    const [usersRes, rolesRes, permissionsRes] = await Promise.all([
      rbacClient.users.list(),
      rbacClient.roles.list(),
      rbacClient.permissions.list(),
    ]);
    setUsers(usersRes);
    setRoles(rolesRes);
    setPermissionRows(permissionsRes);
  };

  useEffect(() => { reload(); }, []);
  useEffect(() => setActiveTab(defaultTab), [defaultTab]);

  const roleNamesById = useMemo(() => Object.fromEntries(roles.map((role) => [role.id, role.name])), [roles]);

  const selectedUser = useMemo(() => users.find((item) => item.id === selectedUserId) || null, [users, selectedUserId]);
  const selectedRole = useMemo(() => roles.find((item) => item.id === selectedRoleId) || null, [roles, selectedRoleId]);

  useEffect(() => {
    if (selectedUser) {
      setUserForm({ name: selectedUser.name, email: selectedUser.email, status: selectedUser.status, roleIds: selectedUser.roleIds });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedRole) {
      setRoleForm({ name: selectedRole.name, permissionNames: selectedRole.permissionNames });
    }
  }, [selectedRole]);

  const effectivePermissions = useMemo(() => {
    if (!selectedUser) return [];
    return Array.from(
      new Set(
        roles
          .filter((role) => selectedUser.roleIds.includes(role.id))
          .flatMap((role) => role.permissionNames),
      ),
    ).sort();
  }, [selectedUser, roles]);

  const groupedPermissions = useMemo(() => {
    const q = permissionQuery.toLowerCase();
    return permissionRows
      .filter((item) => {
        if (!q) return true;
        const hay = `${item.name} ${item.labelAr || ""} ${item.labelEn || ""}`.toLowerCase();
        return hay.includes(q);
      })
      .reduce((acc, item) => {
        acc[item.module] ||= [];
        acc[item.module].push(item);
        return acc;
      }, {});
  }, [permissionRows, permissionQuery]);

  const moduleEntries = useMemo(() => Object.entries(permissionMap), []);
  const allPermissions = useMemo(() => Object.values(permissionMap).flatMap((crud) => Object.values(crud)), []);

  const usersHeaders = useMemo(() => [
    { key: "name", text: t("rbac.users.name") },
    { key: "email", text: t("rbac.users.email") },
    { key: "status", text: t("rbac.users.status") },
    { key: "roles", text: t("rbac.users.roles") },
  ], [t]);

  const rolesHeaders = useMemo(() => [
    { key: "name", text: t("rbac.roles.name") },
    { key: "count", text: t("rbac.roles.permissionsCount") },
  ], [t]);

  const openUserEditor = (id = null) => {
    const editing = users.find((item) => item.id === id) || null;
    setEditorType("user");
    setUserForm(editing ? { name: editing.name, email: editing.email, status: editing.status, roleIds: editing.roleIds } : USER_EMPTY);
    setSelectedUserId(editing?.id || null);
    setEditorOpen(true);
  };

  const openRoleEditor = (id = null) => {
    const editing = roles.find((item) => item.id === id) || null;
    setEditorType("role");
    setRoleForm(editing ? { name: editing.name, permissionNames: editing.permissionNames } : ROLE_EMPTY);
    setSelectedRoleId(editing?.id || null);
    setEditorOpen(true);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    if (selectedUserId) {
      await rbacClient.users.update(selectedUserId, userForm);
      await rbacClient.syncUserRoles(selectedUserId, userForm.roleIds);
    } else {
      await rbacClient.users.create(userForm);
    }
    await reload();
    await refreshMe();
    setEditorOpen(false);
  };

  const saveRole = async (e) => {
    e.preventDefault();
    let roleId = selectedRoleId;
    if (selectedRoleId) {
      await rbacClient.roles.update(selectedRoleId, { name: roleForm.name });
    } else {
      const created = await rbacClient.roles.create({ name: roleForm.name });
      roleId = created.id;
    }
    if (roleId) await rbacClient.syncRolePermissions(roleId, roleForm.permissionNames);
    await reload();
    await refreshMe();
    setEditorOpen(false);
  };

  const toggleRolePermission = (permissionName) => {
    setRoleForm((prev) => ({
      ...prev,
      permissionNames: prev.permissionNames.includes(permissionName)
        ? prev.permissionNames.filter((name) => name !== permissionName)
        : [...prev.permissionNames, permissionName],
    }));
  };

  const currentAcl = activeTab === "users" ? usersAcl : activeTab === "roles" ? rolesAcl : permissionsAcl;
  if (!currentAcl.view) {
    return <ForbiddenState moduleLabel={t(activeTab === "users" ? "rbac.modules.adminUsers" : activeTab === "roles" ? "rbac.modules.adminRoles" : "rbac.modules.adminPermissions")} />;
  }

  const userEditor = (
    <form className="grid gap-3" onSubmit={saveUser}>
      <input className="rounded-xl border border-border bg-background p-2.5" value={userForm.name} onChange={(e) => setUserForm((prev) => ({ ...prev, name: e.target.value }))} placeholder={t("rbac.users.name")} />
      <input className="rounded-xl border border-border bg-background p-2.5" value={userForm.email} onChange={(e) => setUserForm((prev) => ({ ...prev, email: e.target.value }))} placeholder={t("rbac.users.email")} />
      <select className="rounded-xl border border-border bg-background p-2.5" value={userForm.status} onChange={(e) => setUserForm((prev) => ({ ...prev, status: e.target.value }))}>
        <option value="active">{t("rbac.users.active")}</option>
        <option value="inactive">{t("rbac.users.inactive")}</option>
      </select>
      <select multiple className="min-h-28 rounded-xl border border-border bg-background p-2.5" value={userForm.roleIds} onChange={(e) => setUserForm((prev) => ({ ...prev, roleIds: Array.from(e.target.selectedOptions).map((o) => o.value) }))}>
        {roles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}
      </select>
      <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2 text-primary-foreground"><LexicraftIcon name="check" size={16} /> {t("common.save")}</button>
    </form>
  );

  const roleEditor = (
    <form className="grid gap-3" onSubmit={saveRole}>
      <input className="rounded-xl border border-border bg-background p-2.5" value={roleForm.name} onChange={(e) => setRoleForm((prev) => ({ ...prev, name: e.target.value }))} placeholder={t("rbac.roles.name")} />
      <div className="rounded-xl border border-border p-3">
        <div className="mb-3 flex flex-wrap gap-2">
          <button type="button" className="rounded-xl border border-border px-2.5 py-1.5 text-xs" onClick={() => setRoleForm((prev) => ({ ...prev, permissionNames: allPermissions }))}>{t("rbac.roles.selectAll")}</button>
          <button type="button" className="rounded-xl border border-border px-2.5 py-1.5 text-xs" onClick={() => setRoleForm((prev) => ({ ...prev, permissionNames: [] }))}>{t("rbac.roles.clearAll")}</button>
        </div>
        <div className="max-h-80 space-y-3 overflow-auto">
          {moduleEntries.map(([module, crud]) => {
            const modulePermissions = Object.values(crud);
            const moduleAllSelected = modulePermissions.every((perm) => roleForm.permissionNames.includes(perm));

            return (
              <div key={module} className="rounded-xl border border-border/70 p-2.5">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <strong className="text-sm">{module}</strong>
                  <button
                    type="button"
                    className="rounded-lg border border-border px-2 py-1 text-xs"
                    onClick={() => setRoleForm((prev) => ({
                      ...prev,
                      permissionNames: moduleAllSelected
                        ? prev.permissionNames.filter((perm) => !modulePermissions.includes(perm))
                        : Array.from(new Set([...prev.permissionNames, ...modulePermissions])),
                    }))}
                  >
                    {t("rbac.roles.selectModule")}
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {modulePermissions.map((perm) => (
                    <label key={perm} className="inline-flex items-center gap-2 text-xs">
                      <input type="checkbox" checked={roleForm.permissionNames.includes(perm)} onChange={() => toggleRolePermission(perm)} />
                      {perm}
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2 text-primary-foreground"><LexicraftIcon name="check" size={16} /> {t("common.save")}</button>
    </form>
  );

  return (
    <div className="mt-8 space-y-5">
      <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">{t("rbac.hub.title")}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t("rbac.hub.description")}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeTab === "users" && usersAcl.create && <button className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm" onClick={() => openUserEditor()}><LexicraftIcon name="users" size={16} /> {t("rbac.users.add")}</button>}
            {activeTab === "roles" && rolesAcl.create && <button className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm" onClick={() => openRoleEditor()}><LexicraftIcon name="shield" size={16} /> {t("rbac.roles.add")}</button>}
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <div className={cn("inline-flex min-w-full gap-2", isRTL && "flex-row-reverse")}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm",
                  activeTab === tab.key ? "border-primary bg-primary/10 text-primary" : "border-border bg-background",
                )}
              >
                <LexicraftIcon name={tab.icon} size={16} />
                {t(tab.label)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeTab === "users" && (
        <section className={cn("grid gap-4", isMobile ? "grid-cols-1" : "grid-cols-12")}>
          <div className={cn(isMobile ? "" : "col-span-7") }>
            <TableComponent
              title={t("rbac.users.title")}
              data={users}
              headers={usersHeaders}
              addLabel={t("rbac.users.add")}
              onAdd={usersAcl.create ? () => openUserEditor() : undefined}
              onEdit={(id) => {
                setSelectedUserId(id);
                if (isMobile) openUserEditor(id);
              }}
              onDelete={usersAcl.delete ? (id) => setToDelete({ type: "user", item: users.find((u) => u.id === id) || null }) : undefined}
              permissions={usersAcl}
              customRenderers={{
                status: (user) => user.status,
                roles: (user) => user.roleIds.map((roleId) => roleNamesById[roleId]).filter(Boolean).join(", "),
              }}
            />
          </div>
          {!isMobile && (
            <aside className="col-span-5 sticky top-28 h-fit rounded-2xl border border-border bg-card p-4">
              <h3 className="mb-3 font-semibold">{selectedUser ? t("rbac.hub.userEditor") : t("rbac.hub.selectUser")}</h3>
              {selectedUser ? (
                <>
                  {userEditor}
                  <div className="mt-4 rounded-xl border border-border bg-muted/30 p-3">
                    <p className="mb-2 text-sm font-semibold">{t("rbac.hub.effectivePermissions")}</p>
                    <div className="max-h-44 space-y-1 overflow-auto text-xs text-muted-foreground">
                      {effectivePermissions.map((perm) => <p key={perm}>{perm}</p>)}
                    </div>
                  </div>
                </>
              ) : <p className="text-sm text-muted-foreground">{t("rbac.hub.selectUserHint")}</p>}
            </aside>
          )}
        </section>
      )}

      {activeTab === "roles" && (
        <section className={cn("grid gap-4", isMobile ? "grid-cols-1" : "grid-cols-12")}>
          <div className={cn(isMobile ? "" : "col-span-7") }>
            <TableComponent
              title={t("rbac.roles.title")}
              data={roles}
              headers={rolesHeaders}
              addLabel={t("rbac.roles.add")}
              onAdd={rolesAcl.create ? () => openRoleEditor() : undefined}
              onEdit={(id) => {
                setSelectedRoleId(id);
                if (isMobile) openRoleEditor(id);
              }}
              onDelete={rolesAcl.delete ? (id) => setToDelete({ type: "role", item: roles.find((role) => role.id === id) || null }) : undefined}
              permissions={rolesAcl}
              customRenderers={{ count: (role) => role.permissionNames.length }}
            />
          </div>
          {!isMobile && (
            <aside className="col-span-5 sticky top-28 h-fit rounded-2xl border border-border bg-card p-4">
              <h3 className="mb-3 font-semibold">{selectedRole ? t("rbac.hub.roleEditor") : t("rbac.hub.selectRole")}</h3>
              {selectedRole ? roleEditor : <p className="text-sm text-muted-foreground">{t("rbac.hub.selectRoleHint")}</p>}
            </aside>
          )}
        </section>
      )}

      {activeTab === "permissions" && (
        <section className="rounded-2xl border border-border bg-card p-4">
          <input className="mb-4 w-full rounded-xl border border-border bg-background p-2.5" placeholder={t("common.search")} value={permissionQuery} onChange={(e) => setPermissionQuery(e.target.value)} />
          <div className="grid gap-3 lg:grid-cols-2">
            {Object.entries(groupedPermissions).map(([module, modulePermissions]) => (
              <div key={module} className="rounded-xl border border-border/80 p-3">
                <h3 className="mb-2 font-semibold">{module}</h3>
                <div className="space-y-1 text-sm">
                  {modulePermissions.map((perm) => (
                    <div key={perm.name} className="rounded-lg bg-muted/30 px-2 py-1">
                      <span className="font-medium">{perm.name}</span>
                      <p className="text-xs text-muted-foreground">{isRTL ? perm.labelAr : perm.labelEn}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <GlobalModal
        isOpen={editorOpen && isMobile}
        onClose={() => setEditorOpen(false)}
        title={editorType === "user" ? (selectedUserId ? t("rbac.users.edit") : t("rbac.users.add")) : (selectedRoleId ? t("rbac.roles.edit") : t("rbac.roles.add"))}
        titleIcon={<LexicraftIcon name={editorType === "user" ? "users" : "shield"} size={16} />}
      >
        {editorType === "user" ? userEditor : roleEditor}
      </GlobalModal>

      <GlobalConfirmDeleteModal
        isOpen={Boolean(toDelete?.item)}
        onClose={() => setToDelete(null)}
        itemName={toDelete?.item?.name || ""}
        onConfirm={async () => {
          if (!toDelete?.item) return;
          if (toDelete.type === "user") await rbacClient.users.delete(toDelete.item.id);
          if (toDelete.type === "role") await rbacClient.roles.delete(toDelete.item.id);
          await reload();
          await refreshMe();
          setToDelete(null);
        }}
      />
    </div>
  );
};

export default UserManagementHub;
