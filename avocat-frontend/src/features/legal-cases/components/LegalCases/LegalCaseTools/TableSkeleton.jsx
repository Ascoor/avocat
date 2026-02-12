import React from 'react';

const TableSkeleton = () => (
  <div className="table-skeleton">
    <div className="skeleton-header">
      <div className="skeleton-item"></div>
      <div className="skeleton-item"></div>
      <div className="skeleton-item"></div>
    </div>
    <div className="skeleton-row">
      <div className="skeleton-item"></div>
      <div className="skeleton-item"></div>
      <div className="skeleton-item"></div>
    </div>
    {/* Add more skeleton rows as needed */}
  </div>
);

export default TableSkeleton;
