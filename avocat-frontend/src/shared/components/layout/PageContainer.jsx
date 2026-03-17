import React from "react";
import { cn } from "@shared/lib/utils";

const PageContainer = ({ className, children }) => (
  <div className={cn("container mx-auto", className)}>{children}</div>
);

export default PageContainer;
