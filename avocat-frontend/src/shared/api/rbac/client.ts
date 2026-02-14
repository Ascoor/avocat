import { mockRbacClient } from "./mock";
import { realRbacClient } from "./real";

const mode = (import.meta.env.VITE_RBAC_MODE || "real").toLowerCase();

export const rbacClient = mode === "real" ? realRbacClient : mockRbacClient;
export const rbacMode = mode;
