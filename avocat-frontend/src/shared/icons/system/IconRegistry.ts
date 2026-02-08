import caseOutline from "../../../icons/svg/outline/case-outline_24.svg?raw";
import gavelOutline from "../../../icons/svg/outline/gavel-outline_24.svg?raw";
import scalesOutline from "../../../icons/svg/outline/scales-outline_24.svg?raw";
import courthouseOutline from "../../../icons/svg/outline/courthouse-outline_24.svg?raw";

export type IconVariant = "outline" | "filled" | "3d";

export interface IconAsset {
  id: string;
  svg: string;
  variant: IconVariant;
  viewBox: string;
  strokeWidth: number;
}

export const iconRegistry: Record<string, IconAsset> = {
  "case-outline": {
    id: "case-outline",
    svg: caseOutline,
    variant: "outline",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
  },
  "gavel-outline": {
    id: "gavel-outline",
    svg: gavelOutline,
    variant: "outline",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
  },
  "scales-outline": {
    id: "scales-outline",
    svg: scalesOutline,
    variant: "outline",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
  },
  "courthouse-outline": {
    id: "courthouse-outline",
    svg: courthouseOutline,
    variant: "outline",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
  },
};

export type IconRegistry = typeof iconRegistry;
