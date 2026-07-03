// src/components/sections/Hero.tsx
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

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

const PRODUCT_DESCRIPTIONS: Record<string, string> = {
  'Off by Design': 'A soft reminder that not everything needs to be bold and urgent. Syntax break approved.',
  'Kerned Confidence': 'A bold statement on typography and grid alignment. Wear it with spacing.',
  'Specimen No. HH01': 'The flagship specimen shirt. Perfect hierarchy, print-on-apparel.',
  'Grid System Go': 'Structured layout for fluid movements. Calculated proportions.',
  'Neutral Grotesk': 'Minimalist aesthetics. High-contrast typography on premium cotton.',
  'Red Dot Not Award': 'Keep your head warm and your design principles warmer. Pantone? Nah, this is ++ red.',
  'Gridlocked': 'Break free from the alignment constraints. Abstract typography layout.',
  'Hello Week 001': 'Limited edition weekly release. The first volume.',
  'Hello Week 002': 'Limited edition weekly release. Volume two.',
  'Monochrome Manifest': 'Sleek contrast and clean forms. A statement of black and white.',
  'Positive Space': 'Embracing the active areas of the grid. Contrast redefined.',
  'Whitespace Matters': 'The breathing room your layout deserves. Comfort in simplicity.',
  'Command + K': 'Quick action, immediate style. Command and control.',
};

const PRODUCT_LAYOUTS: Record<string, { aspect: string; desktopSpan: string }> = {
  // First Grid (curated set)
  'Off by Design': { aspect: 'aspect-[3/4]', desktopSpan: 'col-span-1' },
  'Kerned Confidence': { aspect: 'aspect-[3/4]', desktopSpan: 'col-span-1' },
  'Specimen No. HH01': { aspect: 'aspect-[3/4]', desktopSpan: 'col-span-1' },
  'Grid System Go': { aspect: 'aspect-[3/4]', desktopSpan: 'col-span-1' },

  // Secondary Row 1
  'Neutral Grotesk': { aspect: 'aspect-[1920/2857]', desktopSpan: 'md:col-span-3 col-span-3' },
  'Red Dot Not Award': { aspect: 'aspect-[242/240]', desktopSpan: 'md:col-span-3 col-span-3' },
  'Gridlocked': { aspect: 'aspect-square', desktopSpan: 'md:col-start-9 md:col-end-[-1] col-start-3 col-end-9' },

  // Secondary Row 2
  'Hello Week 001': { aspect: 'aspect-[242/240]', desktopSpan: 'md:col-span-3 col-span-4' },
  'Hello Week 002': { aspect: 'aspect-[1920/2867]', desktopSpan: 'md:col-start-6 md:col-end-9 col-start-3 col-end-6' },
  'Monochrome Manifest': { aspect: 'aspect-[242/240]', desktopSpan: 'md:col-start-9 md:col-end-12 col-start-6 col-end-9' },

  // Secondary Row 3
  'Positive Space': { aspect: 'aspect-[1920/2345]', desktopSpan: 'col-span-5' },
  'Whitespace Matters': { aspect: 'aspect-[242/240]', desktopSpan: 'md:col-start-11 md:col-end-[14] col-start-2 col-end-5' },
  'Command + K': { aspect: 'aspect-[1920/2868]', desktopSpan: 'md:col-start-[14] md:col-end-[17] col-start-5 col-end-9' },
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);

  useEffect(() => {
    const handleReset = () => {
      setExpandedProductId(null);
    };
    window.addEventListener('reset-hero-gallery', handleReset);
    return () => {
      window.removeEventListener('reset-hero-gallery', handleReset);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: logo moves up slower than scroll
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const isAnyExpanded = expandedProductId !== null;

  return (
    <section
      ref={containerRef}
      className="relative min-h-dvh w-full flex flex-col justify-between overflow-hidden transition-colors duration-500"
    >
      {/* Main Logo - Massive OUTFIT text */}
      <AnimatePresence>
        {!isAnyExpanded && (
          <motion.div
            className="flex-1 flex items-center justify-center px-4 md:px-8 overflow-hidden"
            style={{ y: logoY, scale: logoScale }}
            initial={{ opacity: 1, height: 'auto' }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.8, -0.01, 0.34, 1.01] }}
          >
            <div className="relative w-full max-w-350 py-8">
              <h1
                className="text-[35vw] md:text-[26vw] lg:text-[24vw] font-black leading-[0.85] tracking-[-0.02em] text-center select-none"
                style={{ fontFamily: 'var(--font-inter), Helvetica Neue, Arial, sans-serif' }}
              >
                OUTFIT
                <span
                  className="inline-block text-[3vw] md:text-[2vw] align-super ml-1 md:ml-2 font-normal"
                >
                  ®
                </span>
              </h1>

              {/* Horizontal line under logo */}
              <motion.div
                className="w-full h-0.5 md:h-0.75 mt-4 md:mt-6 origin-left bg-[currentColor]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full px-4 md:px-8 pb-6 md:pb-8">
        {/* Featured Products Grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4 lg:gap-6">
          {FEATURED_PRODUCTS.map((product, index) => {
            const isThisExpanded = expandedProductId === product.title;
            if (isAnyExpanded && !isThisExpanded) return null;

            return (
              <motion.article
                layout
                key={product.title}
                className={isThisExpanded ? "col-span-2 lg:col-span-4" : "col-span-1"}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard
                  product={product}
                  isExpanded={isThisExpanded}
                  onToggleExpand={() => {
                    setExpandedProductId(prev => prev === product.title ? null : product.title);
                  }}
                />
              </motion.article>
            );
          })}
        </div>

        {/* Separator Dot */}
        {!isAnyExpanded && (
          <div className="flex items-center justify-center py-8 md:py-10 lg:py-12">
            <span className="h-3 w-3 rounded-full bg-[currentColor]" />
          </div>
        )}

        {/* Secondary Products Grid Container */}
        <div className="space-y-6 md:space-y-8 lg:space-y-10">
          {SECONDARY_PRODUCT_ROWS.map((row, rowIndex) => {
            const isProductInRowExpanded = row.some(p => p.title === expandedProductId);
            if (isAnyExpanded && !isProductInRowExpanded) return null;

            return (
              <div key={row[0].title} className="grid grid-cols-8 gap-6 md:grid-cols-16 max-sm:flex max-sm:flex-col mb-24 md:mb-34">
                {row.map((product, productIndex) => {
                  const isThisExpanded = expandedProductId === product.title;
                  if (isAnyExpanded && !isThisExpanded) return null;

                  const layout = PRODUCT_LAYOUTS[product.title] || { desktopSpan: 'col-span-1' };
                  const articleClass = isThisExpanded 
                    ? "col-span-8 md:col-span-16" 
                    : layout.desktopSpan;

                  return (
                    <motion.article
                      layout
                      key={product.title}
                      className={articleClass}
                      initial={{ opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.65,
                        delay: 0.1 + productIndex * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <ProductCard
                        product={product}
                        isExpanded={isThisExpanded}
                        onToggleExpand={() => {
                          setExpandedProductId(prev => prev === product.title ? null : product.title);
                        }}
                      />
                    </motion.article>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  isExpanded,
  onToggleExpand,
}: {
  product: {
    src: string;
    title: string;
    price: string;
    category: string;
  };
  isExpanded: boolean;
  onToggleExpand: () => void;
}) {
  const cardImageRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('Red');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const description = PRODUCT_DESCRIPTIONS[product.title] || 
    'A premium garment from the OUTFIT collection, crafted with meticulous attention to detail and typographic hierarchy.';

  const handleMouseMove = (e: React.MouseEvent) => {
    if (cardImageRef.current) {
      const rect = cardImageRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleAddToBag = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  // 1. EXPANDED STATE (SPLIT-SCREEN WITH MASSIVE TYPOGRAPHY & SELECTORS)
  if (isExpanded) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 w-full  p-6 md:p-10 lg:p-16 min-h-[85vh] transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)]">
        {/* Left Side: Product Image */}
        <div className="col-span-1 lg:col-span-6 flex items-center justify-center relative aspect-square lg:aspect-[4/5] overflow-hidden">
          <Image
            src={product.src}
            alt={product.title}
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>

        {/* Right Side: Product Details & Options */}
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-between">
          <div className="flex flex-col">
            {/* Return Link */}
            <button
              onClick={(e) => {
                e.preventDefault();
                onToggleExpand();
              }}
              className="group mb-8 flex items-center gap-1.5 tracking-tight  font-semibold text-xl cursor-pointer w-fit"
            >
              <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 transition-transform duration-300 group-hover:-translate-x-1.5">
                <path d="M21.2715 7.95782L4.95769 7.95782L12.8603 0.0551758L9.23741 0.0763642L0 9.31377L9.21622 18.53H12.8603L4.97888 10.6485L21.2927 10.6485L21.2715 7.95782Z" fill="currentColor"></path>
              </svg>
              Return to Shop
            </button>

            {/* Product Title (Massive Red Text) */}
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black leading-[0.85] tracking-[-0.03em] mb-4 ">
              {product.title}
            </h1>

            {/* Price (Massive Red Text) */}
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 ">
              {product.price}
            </div>

            {/* Product Description */}
            <p className="text-lg md:text-xl lg:text-2xl leading-normal  mb-12 font-medium max-w-[52ch]">
              {description}
            </p>

            {/* Color Selector */}
            <dl className="mb-6 flex items-center justify-between gap-8 border-b-2 border-[#ff0001] pb-4 ">
              <dt className="text-2xl tracking-tight font-semibold">Color</dt>
              <dd className="flex gap-6">
                {['Black', 'Red'].map((color) => {
                  const isSelected = selectedColor === color;
                  return (
                    <button
                      key={color}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedColor(color);
                      }}
                      className={`text-2xl leading-9 px-1 transition duration-300 ease-in-out cursor-pointer ${
                        isSelected 
                          ? 'font-bold border-b-2 border-[#ff0001]' 
                          : 'opacity-65 hover:opacity-100'
                      }`}
                    >
                      {color}
                    </button>
                  );
                })}
              </dd>
            </dl>

            {/* Size Selector */}
            <dl className="mb-6 flex items-center justify-between gap-8 border-b-2 border-[#ff0001] pb-4">
              <dt className="text-2xl tracking-tight font-semibold">Size</dt>
              <dd className="flex gap-5 flex-wrap">
                {['S', 'M', 'L', 'XL', '2XL'].map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedSize(size);
                      }}
                      className={`text-2xl leading-9 px-1 transition duration-300 ease-in-out cursor-pointer ${
                        isSelected 
                          ? 'font-bold border-b-2 border-[#ff0001]' 
                          : 'opacity-65 hover:opacity-100'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </dd>
            </dl>

            {/* Quantity Selector */}
            <dl className="mb-12 flex items-center justify-between gap-8 border-b-2 border-[#ff0001] pb-4 ">
              <dt className="text-2xl tracking-tight font-semibold">Quantity</dt>
              <dd className="flex items-center gap-6 text-2xl">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setQuantity(q => Math.max(1, q - 1));
                  }}
                  className="hover:opacity-75 transition-opacity px-2 cursor-pointer font-medium"
                >
                  -
                </button>
                <span className="min-w-8 text-center font-bold">{quantity}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setQuantity(q => q + 1);
                  }}
                  className="hover:opacity-75 transition-opacity px-2 cursor-pointer font-medium"
                >
                  +
                </button>
              </dd>
            </dl>
          </div>

          {/* Add to Bag Button (with snaking arrows) */}
          <div className="pt-4">
            <button
              onClick={handleAddToBag}
              className="w-full inline-flex items-center justify-between no-underline overflow-hidden relative border-b-2 border-current py-5 bg-transparent group/add pointer-events-auto text-3xl uppercase tracking-wider font-extrabold  transition-colors duration-300 cursor-pointer"
            >
              {/* Sliding Arrow 1 */}
              <span className="transition-transform duration-500 [transition-timing-function:cubic-bezier(0.8,-0.01,0.34,1.01)] absolute left-0 -translate-x-[1.5em] opacity-0 group-hover/add:translate-x-0 group-hover/add:opacity-100">
                <svg width="0.80em" height="0.80em" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[0.80em] w-[0.80em]">
                  <path d="M2.1573 18L15.1348 5.02247V17.5955L18 14.6966V0H3.33708L0.438203 2.89888H12.9775L0 15.8764L2.1573 18Z" fill="currentColor"></path>
                </svg>
              </span>
              
              {/* Action Text */}
              <span className="w-full text-center transition-transform duration-500 [transition-timing-function:cubic-bezier(0.8,-0.01,0.34,1.01)] group-hover/add:translate-x-[0.6em]">
                {isAdded ? 'Added!' : 'Add to Bag'}
              </span>
              
              {/* Sliding Arrow 2 */}
              {!isAdded && (
                <span className="transition-transform duration-500 [transition-timing-function:cubic-bezier(0.8,-0.01,0.34,1.01)] group-hover/add:translate-x-[2.0em] group-hover/add:opacity-0 inline-block">
                  <svg width="0.80em" height="0.80em" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[0.80em] w-[0.80em]">
                    <path d="M2.1573 18L15.1348 5.02247V17.5955L18 14.6966V0H3.33708L0.438203 2.89888H12.9775L0 15.8764L2.1573 18Z" fill="currentColor"></path>
                  </svg>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. NORMAL CARD STATE (WITH CUSTOM HOVER CURSOR ON IMAGE)
  const layout = PRODUCT_LAYOUTS[product.title] || { aspect: 'aspect-4/5' };
  return (
    <div className="group flex flex-col h-full select-none">
      {/* Image Container with Custom Cursor */}
      <div 
        ref={cardImageRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          e.preventDefault();
          onToggleExpand();
        }}
        className={`relative ${layout.aspect} w-full overflow-hidden   cursor-none rounded-xl`}
      >
        {/* Parallax / Zoom Image Wrapper */}
        <motion.div
          className="absolute inset-0 rounded-xl overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={product.src}
            alt={product.title}
            fill
            className="object-cover object-center rounded-xl"
            sizes="(min-width: 1024px) 25vw, 50vw"
          />
        </motion.div>

        {/* Custom Red VIEW MORE Hover Cursor */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="pointer-events-none absolute bg-[var(--nav-bg)] text-[var(--nav-text)] z-10 flex items-center justify-center rounded-full   w-20 h-20 -ml-10 -mt-10"
              style={{
                left: mousePos.x,
                top: mousePos.y,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            >
              <span className="text-[10px]  tracking-widest leading-none text-center">
                VIEW MORE
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card Info details */}
      <div className="mt-3 text-[13px] md:text-[15px] leading-none ">
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
