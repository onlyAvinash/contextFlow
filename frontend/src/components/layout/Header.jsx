const integrations = [
  { name: 'GitHub', status: 'mock' },
  { name: 'Notion', status: 'mock' },
  { name: 'Calendar', status: 'mock' }
];

export function Header() {
  return (
    <header className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-bg-secondary/70 px-6 py-5 shadow-glow backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-text-muted">ContextFlow</p>
          <h1 className="font-display text-3xl font-semibold text-text-primary">AI Knowledge Orchestrator</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Ask a question. Get the perfect interface.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {integrations.map((integration) => (
            <span
              key={integration.name}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-bg-tertiary/80 px-3 py-1 text-xs text-text-secondary"
            >
              <span className="h-2 w-2 rounded-full bg-warning" />
              {integration.name} ({integration.status})
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
