import Header from '../shared/ui/header';
import Footer from '../shared/ui/footer';
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
