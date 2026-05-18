import { motion } from 'framer-motion';

/**
 * Premium DataTable — theme-aware, RTL-ready.
 * Props:
 *  - columns: [{ key, label, align?, render?(value,row) }]
 *  - data: array
 *  - isRtl: bool
 *  - actions?: (row) => ReactNode   // renders into compact row-actions cell
 *  - empty?: ReactNode
 */
const DataTable = ({ columns, data, isRtl, actions, empty }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
    className="table-pro-wrap overflow-x-auto"
    dir={isRtl ? 'rtl' : 'ltr'}
  >
    <table className="table-pro">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className="whitespace-nowrap"
              style={{ textAlign: col.align || (isRtl ? 'right' : 'left') }}
            >
              {col.label}
            </th>
          ))}
          {actions && <th className="w-px whitespace-nowrap text-end">—</th>}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-10 text-muted-foreground">
              {empty ?? (isRtl ? 'لا توجد بيانات' : 'No data')}
            </td>
          </tr>
        ) : (
          data.map((row, i) => (
            <tr key={row.id ?? i}>
              {columns.map((col) => (
                <td key={col.key} className="whitespace-nowrap" style={{ textAlign: col.align || 'start' }}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              {actions && (
                <td className="whitespace-nowrap text-end">
                  <div className="row-actions">{actions(row)}</div>
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </motion.div>
);

export default DataTable;
