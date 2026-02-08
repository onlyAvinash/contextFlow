export function Header() {
  return (
    <header className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-bg-secondary/70 px-6 py-5 shadow-glow backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-text-muted">ContextFlow</p>
          <h1 className="font-display text-2xl font-semibold text-text-primary">Knowledge Orchestrator</h1>
        </div>
        <div className="flex items-center gap-3 text-xs text-text-secondary">
          <button className="rounded-full border border-white/10 px-4 py-2 text-sm">History</button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-bg-tertiary/70 text-sm font-semibold text-text-secondary">
            AR
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-text-secondary/80">
        <span>Ask a question. Get the perfect interface.</span>
        <span className="text-text-muted">Last sync: 2m ago • System status: Healthy</span>
      </div>
    </header>
  );
}
