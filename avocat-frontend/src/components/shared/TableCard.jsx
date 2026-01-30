import React from "react";

const TableCard = ({ children }) => {
  return (
    <div className="rounded-xl border border-border bg-card shadow-soft">
      <div className="w-full overflow-x-auto">{children}</div>
    </div>
  );
};

export default TableCard;
