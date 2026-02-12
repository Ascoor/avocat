export type LexicraftCategory =
  | "Court"
  | "Documents"
  | "Security"
  | "Finance"
  | "People"
  | "Tools"
  | "General";

export type LexicraftIconMeta = {
  name: string;
  tags: string[];
  category: LexicraftCategory;
  isDirectional?: boolean;
};

export const lexicraftManifest = [
  { name: "gavel", tags: ["judge", "court", "law"], category: "Court" },
  { name: "scales", tags: ["balance", "justice", "law"], category: "Court" },
  { name: "shield", tags: ["security", "privacy", "protection"], category: "Security" },
  { name: "document", tags: ["file", "contract", "papers"], category: "Documents" },
  { name: "briefcase", tags: ["work", "case", "office"], category: "Documents" },
  { name: "user", tags: ["person", "profile"], category: "People" },
  { name: "users", tags: ["team", "clients"], category: "People" },
  { name: "lock", tags: ["secure", "privacy"], category: "Security" },
  { name: "court", tags: ["building", "justice"], category: "Court" },
  { name: "calendar", tags: ["schedule", "date"], category: "General" },
  { name: "search", tags: ["find", "lookup"], category: "Tools" },
  { name: "tool", tags: ["settings", "wrench"], category: "Tools" },
  { name: "view", tags: ["preview", "eye"], category: "Tools" },
  { name: "edit", tags: ["edit", "pencil"], category: "Tools" },
  
  { name: "client", tags: ["client", "clients", "customer", "user"], category: "People" },
  { name: "trash", tags: ["delete", "remove"], category: "Tools" },
  { name: "sort-up", tags: ["sort", "ascending"], category: "Tools" },
  { name: "sort-down", tags: ["sort", "descending"], category: "Tools" },
  { name: "arrow-forward", tags: ["direction", "next"], category: "General", isDirectional: true },
] satisfies LexicraftIconMeta[];

export type LexicraftIconName = (typeof lexicraftManifest)[number]["name"];
