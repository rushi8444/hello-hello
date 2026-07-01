// src/components/sections/Hero.tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface HeroProps {
  theme?: 'cream' | 'light' | 'dark';
}

const THEME_COLORS = {
  cream: { bg: '#e8e4de', text: '#e30613', line: '#e30613' },
  light: { bg: '#ffffff', text: '#000000', line: '#000000' },
  dark:  { bg: '#000000', text: '#ffffff', line: '#ffffff' },
};

const FEATURED_PRODUCTS = [
  {
    src: '/products/preview-1.jpg',
    title: 'Off by Design',
    price: '$36.50',
    category: 'Apparel',
  },
  {
    src: '/products/preview-2.jpg',
    title: 'Kerned Confidence',
    price: '$25.00',
    category: 'Apparel',
  },
  {
    src: '/products/preview-3.jpg',
    title: 'Specimen No. HH01',
    price: '$30.00',
    category: 'Apparel',
  },
  {
    src: '/products/preview-4.jpg',
    title: 'Grid System Go',
    price: '$30.00',
    category: 'Apparel',
  },
] as const;

const SECONDARY_PRODUCT_ROWS = [
  [
    {
      src: '/products/preview-1.jpg',
      title: 'Neutral Grotesk',
      price: '$30.00',
      category: 'Apparel',
    },
    {
      src: '/products/image-05.jpg',
      title: 'Red Dot Not Award',
      price: '$20.00',
      category: 'Apparel',
    },
    {
      src: '/products/image-06.jpg',
      title: 'Gridlocked',
      price: '$25.00',
      category: 'Apparel',
    },
  ],
  [
    {
      src: '/products/preview-2.jpg',
      title: 'Hello Week 001',
      price: '$30.00',
      category: 'Apparel',
    },
    {
      src: '/products/preview-3.jpg',
      title: 'Hello Week 002',
      price: '$30.00',
      category: 'Apparel',
    },
    {
      src: '/products/preview-4.jpg',
      title: 'Monochrome Manifest',
      price: '$30.00',
      category: 'Apparel',
    },
  ],
  [
    {
      src: '/products/image-05.jpg',
      title: 'Positive Space',
      price: '$30.00',
      category: 'Apparel',
    },
    {
      src: '/products/image-06.jpg',
      title: 'Whitespace Matters',
      price: '$33.00',
      category: 'Apparel',
    },
    {
      src: '/products/preview-1.jpg',
      title: 'Command + K',
      price: '$15.00',
      category: 'Apparel',
    },
  ],
] as const;

export default function Hero({ theme = 'cream' }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const colors = THEME_COLORS[theme];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: logo moves up slower than scroll
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-dvh w-full flex flex-col justify-between overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: colors.bg }}
    >
      {/* Main Logo - Massive OUTFIT text */}
      <motion.div
        className="flex-1 flex items-center justify-center px-4 md:px-8 "
        style={{ y: logoY, scale: logoScale }}
      >
        <div className="relative w-full max-w-350">
          <h1
            className="text-[35vw] md:text-[26vw] lg:text-[24vw] font-black leading-[0.85] tracking-[-0.02em] text-center select-none"
            style={{
              color: colors.text,
              fontFamily: 'var(--font-inter), Helvetica Neue, Arial, sans-serif',
            }}
          >
            OUTFIT
            <span
              className="inline-block text-[3vw] md:text-[2vw] align-super ml-1 md:ml-2 font-normal"
              style={{ color: colors.text }}
            >
              ®
            </span>
          </h1>

          {/* Horizontal line under logo */}
          <motion.div
            className="w-full h-0.5 md:h-0.75 mt-4 md:mt-6 origin-left"
            style={{ backgroundColor: colors.line }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
          />
        </div>
      </motion.div>

      <div className="w-full px-4 md:px-8 pb-6 md:pb-8">
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-12">
          {FEATURED_PRODUCTS.map((product, index) => (
            <motion.article
              key={product.title}
              className="col-span-1 lg:col-span-3"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={product} />
            </motion.article>
          ))}
        </div>

        <div className="flex items-center justify-center py-8 md:py-10 lg:py-12">
          <span className="h-3 w-3 rounded-full bg-[currentColor]" />
        </div>

        <div className="space-y-6 md:space-y-8 lg:space-y-10">
          {SECONDARY_PRODUCT_ROWS.map((row, rowIndex) => (
            <div key={row[0].title} className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-12">
              {row.map((product, productIndex) => (
                <motion.article
                  key={product.title}
                  className="col-span-1 lg:col-span-4"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.6 + rowIndex * 0.14 + productIndex * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ProductCard product={product} />
                </motion.article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
}: {
  product: {
    src: string;
    title: string;
    price: string;
    category: string;
  };
}) {
  return (
    <div className="group overflow-hidden">
      <div className="relative aspect-4/5 w-full overflow-hidden bg-[#dcd8d2]">
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={product.src}
            alt={product.title}
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 25vw, 50vw"
          />
        </motion.div>
      </div>

      <div className="mt-3 text-[13px] md:text-[15px] leading-none text-[currentColor]">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="truncate font-medium tracking-[-0.01em]">{product.title}</h2>
          <span className="shrink-0 font-medium">{product.price}</span>
        </div>

        <div className="mt-2 flex items-center gap-2 text-[10px] md:text-[11px] uppercase tracking-[0.18em] opacity-80">
          <span className="h-2 w-2 rounded-full bg-[currentColor]" />
          <span>{product.category}</span>
        </div>
      </div>
    </div>
  );
}