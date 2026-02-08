import { motion } from 'framer-motion';

export function DocumentCard({ title, excerpt, author, lastUpdated, tags = [], url }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-bg-secondary/70 p-4"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-sm font-semibold text-text-primary">📄 {title}</h4>
          <p className="mt-1 text-xs text-text-muted">Last updated {lastUpdated}</p>
          <p className="text-xs text-text-muted">by {author}</p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-accent-primary"
        >
          Open →
        </a>
      </div>
      <p className="mt-3 text-sm text-text-secondary">“{excerpt}”</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-bg-tertiary/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
