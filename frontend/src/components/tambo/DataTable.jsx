import { motion } from 'framer-motion';
import { ArrowUpDown } from 'lucide-react';

const statusStyles = {
  P0: 'bg-error/20 text-error border-error/40',
  P1: 'bg-warning/20 text-warning border-warning/40',
  P2: 'bg-info/20 text-info border-info/40'
};

function formatCell(value, type) {
  if (type === 'date') {
    return new Date(value).toLocaleDateString();
  }
  if (type === 'status') {
    const style = statusStyles[value] ?? 'bg-bg-tertiary text-text-secondary border-white/10';
    return (
      <span className={`inline-flex items-center rounded-full border px-2 py-1 text-xs ${style}`}>
        {value}
      </span>
    );
  }
  return value;
}

export function DataTable({ title, columns, rows, actions }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="overflow-hidden rounded-2xl border border-white/10 bg-bg-secondary/70"
    >
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        <div className="flex gap-2">
          <button className="rounded-lg border border-white/10 bg-bg-tertiary/70 px-3 py-1 text-xs text-text-secondary">
            Export
          </button>
          <button className="rounded-lg border border-white/10 bg-bg-tertiary/70 px-3 py-1 text-xs text-text-secondary">
            Filter
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-bg-tertiary/80 text-xs uppercase text-text-muted">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3">
                  <span className="flex items-center gap-2">
                    {col.label}
                    <ArrowUpDown className="h-3.5 w-3.5 opacity-60" />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((row, idx) => (
              <motion.tr
                key={`${row.id ?? idx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.03 }}
                className="hover:bg-bg-tertiary/60"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-text-secondary">
                    {formatCell(row[col.key], col.type)}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      {actions?.length ? (
        <div className="flex gap-2 border-t border-white/5 px-5 py-4">
          {actions.map((action) => (
            <button
              key={action.label}
              className="rounded-lg bg-accent-primary px-4 py-2 text-xs font-semibold text-bg-primary"
            >
              {action.label}
            </button>
          ))}
        </div>
      ) : null}
    </motion.div>
  );
}
