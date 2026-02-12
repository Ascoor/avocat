import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  isRtl?: boolean;
}

const DataTable = ({ columns, data, isRtl }: DataTableProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="overflow-x-auto rounded-xl border border-border"
    dir={isRtl ? 'rtl' : 'ltr'}
  >
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border bg-secondary/50">
          {columns.map((col) => (
            <th key={col.key} className="px-4 py-3 text-start font-semibold text-foreground whitespace-nowrap">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
            {columns.map((col) => (
              <td key={col.key} className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </motion.div>
);

export default DataTable;
