import { Header } from './Header.jsx';

export function MainLayout({ children }) {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-10 pt-8">
      <Header />
      <main className="mt-6 flex-1">{children}</main>
      <footer className="mt-8 text-xs text-text-muted">
        ContextFlow MVP • Built for UI Strikes Back
      </footer>
    </div>
  );
}
