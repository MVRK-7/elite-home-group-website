import { useEffect, useRef, useState } from 'react';
import './Header.css';

const NAV_LINKS = [
  { href: '#listings', label: 'Listings' },
  { href: '#team', label: 'Our Team' },
  { href: '#results', label: 'Results' },
];

export default function Header() {
  const navRef = useRef<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => {
      if (window.scrollY > 24) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on resize back to desktop, so it can't be left
  // open-but-hidden if the viewport crosses the breakpoint while open.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header ref={navRef} className={`site-header ${menuOpen ? 'menu-open' : ''}`}>
      <a href="#top" className="brand" onClick={() => setMenuOpen(false)}>
        <span className="brand-dot" />
        <span className="brand-name">Elite Home Group</span>
      </a>

      <button
        type="button"
        className="menu-toggle"
        aria-expanded={menuOpen}
        aria-controls="site-nav"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="menu-toggle-bar" />
        <span className="menu-toggle-bar" />
      </button>

      <nav id="site-nav" className="site-nav">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="nav-link" onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>
          Book a consultation
        </a>
      </nav>
    </header>
  );
}
