import { Header } from "./Header.jsx";

export function MainLayout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col pb-10">
      <Header />
      <main className="mx-auto mt-6 w-full max-w-7xl flex-1 px-6">{children}</main>
    </div>
  );
}
