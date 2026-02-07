import { suggestedQueries } from '../../data/demoResponses.jsx';

const quickActions = [
  'View My Tasks',
  'Team Calendar',
  'Recent Docs'
];

export function SuggestedQueries({ onSelect }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-bg-secondary/70 p-4">
        <h3 className="text-sm font-semibold text-text-secondary">Try asking</h3>
        <ul className="mt-3 space-y-2 text-sm text-text-muted">
          {suggestedQueries.map((item) => (
            <li
              key={item}
              className="cursor-pointer rounded-lg border border-white/5 bg-bg-tertiary/60 px-3 py-2 transition hover:border-accent-primary/40 hover:text-text-primary"
              onClick={() => onSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-white/10 bg-bg-secondary/70 p-4">
        <h3 className="text-sm font-semibold text-text-secondary">Quick actions</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {quickActions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onSelect(item)}
              className="rounded-full border border-white/10 bg-bg-tertiary/70 px-4 py-2 text-xs text-text-secondary transition hover:border-accent-primary/40 hover:text-text-primary"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
