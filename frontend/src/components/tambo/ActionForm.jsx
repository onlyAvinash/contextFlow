import { motion } from 'framer-motion';

export function ActionForm({ title, date, time, attendees }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl border border-white/10 bg-bg-secondary/70 p-5"
    >
      <h3 className="text-sm font-semibold text-text-primary">📅 {title}</h3>
      <div className="mt-4 space-y-3 text-sm">
        <div>
          <label className="text-xs uppercase text-text-muted">Title</label>
          <div className="mt-1 rounded-lg border border-white/10 bg-bg-tertiary/70 px-3 py-2">
            Engineering Sync
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase text-text-muted">Date</label>
            <div className="mt-1 rounded-lg border border-white/10 bg-bg-tertiary/70 px-3 py-2">
              {date}
            </div>
          </div>
          <div>
            <label className="text-xs uppercase text-text-muted">Time</label>
            <div className="mt-1 rounded-lg border border-white/10 bg-bg-tertiary/70 px-3 py-2">
              {time}
            </div>
          </div>
        </div>
        <div>
          <label className="text-xs uppercase text-text-muted">Attendees</label>
          <div className="mt-1 space-y-2">
            {attendees.map((person) => (
              <div key={person} className="rounded-lg border border-white/10 bg-bg-tertiary/70 px-3 py-2">
                👤 {person}
              </div>
            ))}
            <div className="rounded-lg border border-dashed border-white/20 px-3 py-2 text-text-muted">
              + Add more...
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="rounded-lg border border-white/10 px-4 py-2 text-xs text-text-secondary">
          Cancel
        </button>
        <button className="rounded-lg bg-accent-primary px-4 py-2 text-xs font-semibold text-bg-primary">
          Create Meeting
        </button>
      </div>
    </motion.div>
  );
}
