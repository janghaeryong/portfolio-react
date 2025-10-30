import { Header, Footer } from '@/shared/ui/navigation';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="app-shell">
      <Header />
      <main className="bg-white">
        {children}
      </main>
      <Footer />
    </div>
  );
}
