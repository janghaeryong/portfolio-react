import { Header, Footer } from '~/core/ui/navigation';

import { Outlet } from 'react-router-dom';
export default function AppLayout() {
  return (
    <div id="app-shell">
      <Header />
      <main className="bg-white">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
