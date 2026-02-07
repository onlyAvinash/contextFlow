import { motion } from 'framer-motion';

const typeLabel = {
  commit: 'Commit',
  pr: 'Pull Request',
  bug: 'Bug',
  meeting: 'Meeting',
  doc: 'Doc',
  other: 'Update'
};

export function TimelineView({ title, events }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-bg-secondary/70 p-4"
    >
      <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
      <div className="mt-4 space-y-4">
        {events.map((event, idx) => (
          <div key={idx} className="flex gap-3">
            <div className="mt-1 flex flex-col items-center">
              <span className="h-2.5 w-2.5 rounded-full bg-accent-primary shadow-glow" />
              {idx < events.length - 1 && (
                <span className="h-full w-px bg-white/10" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-xs text-text-muted">{event.timestamp}</p>
              <p className="text-sm font-semibold text-text-primary">
                {event.title}
              </p>
              {event.description && (
                <p className="text-sm text-text-secondary">{event.description}</p>
              )}
              <p className="mt-1 text-xs text-text-muted">
                {typeLabel[event.type] ?? 'Update'}
                {event.user?.name ? ` • ${event.user.name}` : ''}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 text-xs text-accent-primary">Load more ↓</button>
    </motion.div>
  );
}
