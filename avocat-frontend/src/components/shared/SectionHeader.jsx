import React from "react";

const SectionHeader = ({ title, subtitle, actions }) => {
  return (
    <div className="mb-4 flex flex-col gap-3 md:mb-6 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-xl font-extrabold tracking-tight md:text-2xl">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex gap-2">{actions}</div> : null}
    </div>
  );
};

export default SectionHeader;
