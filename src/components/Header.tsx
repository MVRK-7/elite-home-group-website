import { useEffect, useRef } from 'react';
import './Header.css';

export default function Header() {
  const navRef = useRef<HTMLElement | null>(null);

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

  return (
    <header ref={navRef} className="site-header">
      <a href="#top" className="brand">
        <span className="brand-dot" />
        <span className="brand-name">Elite Home Group</span>
      </a>
      <nav className="site-nav">
        <a href="#listings" className="nav-link">Listings</a>
        <a href="#team" className="nav-link">Our Team</a>
        <a href="#results" className="nav-link">Results</a>
        <a href="#contact" className="nav-cta">Book a consultation</a>
      </nav>
    </header>
  );
}
