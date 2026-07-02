// src/components/layout/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../hooks/useCart';

interface NavbarProps {
  theme?: 'light' | 'dark' | 'cream';
  onThemeToggle?: () => void;
}

const THEMES = [
  { key: 'cream', bg: '#e8e4de', text: '#e30613', label: 'Cream / Red' },
  { key: 'light', bg: '#ffffff', text: '#000000', label: 'White / Black' },
  { key: 'dark',  bg: '#000000', text: '#ffffff', label: 'Black / White' },
] as const;

export default function Navbar({ theme = 'cream', onThemeToggle }: NavbarProps) {
  const { itemCount } = useCart();
  const pathname = usePathname();
  const [currentThemeIndex, setCurrentThemeIndex] = useState(() => {
    const initialIndex = THEMES.findIndex(t => t.key === theme);
    return initialIndex >= 0 ? initialIndex : 0;
  });
  const [isScrolled, setIsScrolled] = useState(false);

  const currentTheme = THEMES[currentThemeIndex];
  const isBagActive = pathname.startsWith('/bag');
  const isShopActive = pathname === '/' || pathname.startsWith('/shop');

  // Cycle through themes: cream → light → dark → cream
  const handleThemeToggle = () => {
    setCurrentThemeIndex((prev) => (prev + 1) % THEMES.length);
    onThemeToggle?.();
  };

  // Detect scroll for optional style changes
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('reset-hero-gallery'));
    }
  };

  return (
    <>
      {/* Theme CSS Variables injected per theme */}
      <style jsx global>{`
        :root {
          --background: ${currentTheme.bg};
          --foreground: ${currentTheme.text};
          --nav-bg: ${currentTheme.bg};
          --nav-text: ${currentTheme.text};
        }
      `}</style>

      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 md:py-6"
        style={{ backgroundColor: 'var(--nav-bg)' }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Left: ++ Logo */}
        <Link href="/" onClick={handleHomeClick} className="flex items-center group">
          <motion.div
            className="flex gap-1"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {/* Two plus signs */}
            <PlusIcon color="var(--nav-text)" />
            <PlusIcon color="var(--nav-text)" />
          </motion.div>
        </Link>

        {/* Right: Nav Items */}
        <div className="flex items-center gap-8 md:gap-12">
          {/* Shop Link */}
          <Link
            href="/"
            onClick={handleHomeClick}
            aria-current={isShopActive ? 'page' : undefined}
            className="relative text-base md:text-base font-medium tracking-wide group"
            style={{ color: 'var(--nav-text)' }}
          >
            <span className="relative">
              Shop
              <span
                className={`absolute left-0 -bottom-0.5 h-[1.5px] w-full origin-left transition-transform duration-300 ${
                  isShopActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
                style={{ backgroundColor: 'var(--nav-text)' }}
              />
            </span>
          </Link>

          {/* Bag Link */}
          <Link
            href="/bag"
            aria-current={isBagActive ? 'page' : undefined}
            className="relative text-base md:text-base font-medium tracking-wide group"
            style={{ color: 'var(--nav-text)' }}
          >
            <span className="relative">
              Bag ({itemCount})
              <span
                className={`absolute left-0 -bottom-0.5 h-[1.5px] w-full origin-left transition-transform duration-300 ${
                  isBagActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
                style={{ backgroundColor: 'var(--nav-text)' }}
              />
            </span>
          </Link>

          {/* Theme Toggle Dots */}
          <div className="flex items-center gap-2 ml-2">
            {THEMES.map((t, i) => (
              <button
                key={t.key}
                onClick={handleThemeToggle}
                className="relative w-5 h-5 md:w-6 md:h-6 rounded-full border-[1.5px] transition-all duration-300 focus:outline-none"
                style={{
                  borderColor: 'var(--nav-text)',
                  backgroundColor: i === currentThemeIndex ? 'var(--nav-text)' : 'transparent',
                }}
                aria-label={`Switch to ${t.label}`}
              >
                {i === currentThemeIndex && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: 'var(--nav-text)' }}
                    layoutId="activeTheme"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Optional: Spacer to push content below navbar */}
      <div className="h-18 md:h-22" />
    </>
  );
}

/* Plus Icon Component */
function PlusIcon({ color }: { color: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="md:w-6 md:h-6"
    >
      <rect x="7" y="0" width="6" height="20" rx="1" fill={color} />
      <rect x="0" y="7" width="20" height="6" rx="1" fill={color} />
    </svg>
  );
}