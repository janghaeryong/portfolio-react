import { useEffect, useId, useState } from 'react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const asideId = useId();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 Y 위치가 50px 이상이면 true
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-100 ${
          isScrolled
            ? 'text-black bg-white shadow-md'
            : 'text-white bg-transparent'
        }`}
      >
        <nav className="container max-w-6xl mx-auto px-6 h-15 md:h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="#hero">
              <h1 className="text-2xl font-bold">JHR Portfolio</h1>
            </a>
          </div>

          {/* 데스크톱 네비 */}
          <div className="hidden md:flex items-center gap-x-10">
            <a href="#about" className="hover:text-blue-500 transition-colors">
              About
            </a>
            <a href="#skills" className="hover:text-blue-500 transition-colors">
              Skills
            </a>
            <a
              href="#projects"
              className="hover:text-blue-500 transition-colors"
            >
              Projects
            </a>
          </div>
          {/* 모바일 메뉴 버튼 */}
          <button
            type="button"
            className={`md:hidden p-2  ${isScrolled ? 'text-black' : 'text-white'}`}
            aria-label="Open menu"
            aria-controls={asideId}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <span className="text-3xl" aria-hidden>
              ☰
            </span>
          </button>
        </nav>
      </header>

      {/* 모바일 사이드 메뉴 */}
      <aside
        id={asideId}
        className={[
          'md:hidden fixed right-0 inset-y-0 w-64 bg-white dark:bg-gray-800 shadow-lg',
          'transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : 'translate-x-full',
          'z-50',
        ].join(' ')}
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between p-4">
          <strong className="text-lg">메뉴</strong>
          <button
            type="button"
            className="p-2 text-black"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <span className="text-2xl" aria-hidden>
              ✕
            </span>
          </button>
        </div>

        <nav className="flex flex-col space-y-4 mt-4 px-6 pb-6">
          <a
            href="#about"
            className="hover:text-blue-500 transition-colors"
            onClick={handleNavClick}
          >
            About
          </a>
          <a
            href="#skills"
            className="hover:text-blue-500 transition-colors"
            onClick={handleNavClick}
          >
            Skills
          </a>
          <a
            href="#projects"
            className="hover:text-blue-500 transition-colors"
            onClick={handleNavClick}
          >
            Projects
          </a>
        </nav>
      </aside>
    </>
  );
}
