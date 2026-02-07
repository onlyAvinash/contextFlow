import { motion } from 'framer-motion';
import { Line, LineChart, ResponsiveContainer } from 'recharts';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';

const trendIcon = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  neutral: Minus
};

const trendColor = {
  up: 'text-success',
  down: 'text-error',
  neutral: 'text-text-muted'
};

export function MetricCard({ title, value, trend, icon, sparkline }) {
  const TrendIcon = trend?.direction ? trendIcon[trend.direction] : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl border border-white/10 bg-bg-secondary/70 p-4"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-text-muted">{title}</p>
        {icon && (
          <span className="rounded-full border border-white/10 bg-bg-tertiary/70 px-2 py-1 text-[10px] text-text-secondary">
            {icon}
          </span>
        )}
      </div>
      <div className="mt-3 text-3xl font-semibold text-text-primary">{value}</div>
      {trend && (
        <div className={`mt-2 flex items-center gap-2 text-xs ${trendColor[trend.direction]}`}>
          {TrendIcon && <TrendIcon className="h-4 w-4" />}
          <span>
            {trend.percentage}% {trend.direction === 'up' ? 'up' : trend.direction === 'down' ? 'down' : 'flat'} {trend.period}
          </span>
        </div>
      )}
      {sparkline?.length ? (
        <div className="mt-3 h-10">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparkline}>
              <Line type="monotone" dataKey="value" stroke="var(--accent-primary)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : null}
      <button className="mt-4 text-xs text-accent-primary">View details →</button>
    </motion.div>
  );
}
