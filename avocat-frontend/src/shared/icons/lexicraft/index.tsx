import React from "react";
import {
  ArrowForwardIcon,
  BriefcaseIcon,
  CalendarIcon,
  CourtIcon,
  DocumentIcon,
  EditIcon,
  GavelIcon,
  LockIcon,
  ScalesIcon,
  SearchIcon,
  ShieldIcon,
  ClientIcon,
  SortDownIcon,
  SortUpIcon,
  TrashIcon,
  ToolIcon,
  UserIcon,
  UsersIcon,
  ViewIcon,
} from "./icons";
import { lexicraftManifest, type LexicraftIconName } from "./manifest";

const manifestMap = new Map(lexicraftManifest.map((item) => [item.name, item]));

export const LEXICRAFT_ICONS = {
  gavel: GavelIcon,
  scales: ScalesIcon,
  shield: ShieldIcon,
  document: DocumentIcon,
  briefcase: BriefcaseIcon,
  user: UserIcon,
  client:ClientIcon,
  users: UsersIcon,
  lock: LockIcon,
  court: CourtIcon,
  calendar: CalendarIcon,
  search: SearchIcon,
  tool: ToolIcon,
  view: ViewIcon,
  edit: EditIcon,
  trash: TrashIcon,
  "sort-up": SortUpIcon,
  "sort-down": SortDownIcon,
  "arrow-forward": ArrowForwardIcon,
};

export type LexicraftIconProps = {
  name: LexicraftIconName;
  size?: number;
  className?: string;
  title?: string;
  ariaLabel?: string;
  dir?: "ltr" | "rtl";
  isDirectional?: boolean;
};

export const LexicraftIcon = ({
  name,
  size = 24,
  className,
  title,
  ariaLabel,
  dir,
  isDirectional,
}: LexicraftIconProps): JSX.Element | null => {
  const IconComponent = LEXICRAFT_ICONS[name];
  if (!IconComponent) return null;

  const manifestEntry = manifestMap.get(name);
  const resolvedDirectional = isDirectional ?? manifestEntry?.isDirectional ?? false;
  const resolvedDir =
    dir ??
    (typeof document !== "undefined" ? (document.documentElement.dir as "ltr" | "rtl") : "ltr");
  const mirroredClass = resolvedDirectional && resolvedDir === "rtl" ? "rtl-mirror" : "";

  return (
    <IconComponent
      size={size}
      title={title}
      ariaLabel={ariaLabel}
      className={[className, mirroredClass].filter(Boolean).join(" ")}
    />
  );
};
