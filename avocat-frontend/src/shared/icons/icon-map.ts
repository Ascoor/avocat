export const iconMap = {
  BiPlusCircle: { name: "document", usage: "Add action" },
  BiMinusCircle: { name: "lock", usage: "Remove action" },
  BiPencil: { name: "tool", usage: "Edit action" },
  BiTrash: { name: "shield", usage: "Delete action" },
  AiFillEye: { name: "search", usage: "View action" },
  AiFillCheckCircle: { name: "scales", usage: "Status indicator" },
  FaRegFile: { name: "document", usage: "Case file" },
  CaseDetails: { name: "briefcase", usage: "Case details header" },
} as const;

export type IconMap = typeof iconMap;
