// src/components/layout/Footer.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface FooterProps {
  theme?: 'cream' | 'light' | 'dark';
}

export default function Footer({ theme }: FooterProps) {
  // Use global CSS variables controlled by Navbar
  const colors = {
    bg: 'transparent',
    text: 'var(--foreground)',
    border: 'var(--foreground)'
  };

  const socialLinks = [
    { label: 'Dribbble', href: 'https://dribbble.com/hellohello' },
    { label: 'Instagram', href: 'https://instagram.com/hellohello' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/hellohello' },
    { label: 'Twitter (X)', href: 'https://twitter.com/hellohello' },
  ];

  const navLinks = [
    { label: 'Work', href: 'https://hellohello.is/work' },
    { label: 'Services', href: 'https://hellohello.is/services' },
    { label: 'About', href: 'https://hellohello.is/about' },
    { label: 'Careers', href: 'https://hellohello.is/careers' },
  ];

  return (
    <footer
      className="w-full px-6 md:px-8 pt-10 pb-6 md:pt-14 md:pb-8 transition-colors duration-500"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {/* Top: Mission Statement */}
      <div className="mb-8">
        <p
          className="text-[22px] md:text-[32px] lg:text-[40px] leading-[1.2] font-normal max-w-[900px]"
          style={{ color: colors.text }}
        >
          Created by the ++hellohello team, this store and signature collection celebrates our collective creativity and passion for apparel. Carefully designed.
        </p>
      </div>

      {/* Divider */}
      <div
        className="w-full h-[1px] mb-8 md:mb-10 transition-colors duration-500"
        style={{ backgroundColor: colors.border, opacity: 0.4 }}
      />

      {/* Bottom Grid */}
      <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-6">
        {/* Brand / Copyright */}
        <div className="col-span-2 md:col-span-3">
          <Link
            href="https://hellohello.is"
            className="inline-flex items-center gap-2 group mb-2"
          >
            <PlusIcon color={colors.text} size={14} />
            <span
              className="text-sm md:text-base font-semibold tracking-tight"
              style={{ color: colors.text }}
            >
              hellohello
            </span>
          </Link>
          <p
            className="text-xs md:text-sm opacity-80"
            style={{ color: colors.text }}
          >
            All rights reserved © 2026
          </p>
        </div>

        {/* Address */}
        <div className="col-span-2 md:col-span-3">
          <address
            className="not-italic text-sm md:text-base leading-relaxed"
            style={{ color: colors.text }}
          >
            Libertad 2529<br />
            Office 102<br />
            Montevideo, Uruguay
          </address>
        </div>

        {/* Privacy Policy */}
        <div className="col-span-1 md:col-span-2">
          <Link
            href="/privacy"
            className="text-sm md:text-base hover:opacity-60 transition-opacity duration-300"
            style={{ color: colors.text }}
          >
            Privacy Policy
          </Link>
        </div>

        {/* Social Links */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-2 md:gap-3">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm md:text-base hover:opacity-60 transition-opacity duration-300"
              style={{ color: colors.text }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Nav Links */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-2 md:gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm md:text-base hover:opacity-60 transition-opacity duration-300"
              style={{ color: colors.text }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        
      </div>
    </footer>
  );
}

/* Plus Icon */
function PlusIcon({ color, size = 14 }: { color: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
    >
      <rect x="5" y="0" width="4" height="14" rx="1" fill={color} />
      <rect x="0" y="5" width="14" height="4" rx="1" fill={color} />
    </svg>
  );
}