// src/app/page.tsx
'use client';

import { usePreloader } from '../hooks/usePreloader';
import Preloader from '../components/layout/Preloader';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
// import Hero from '../components/sections/Hero';
// import ProductGrid from '@/components/sections/ProductGrid';
// import AboutSection from '@/components/sections/AboutSection';

export default function Home() {
  const { isLoaded, isPreloaderVisible, handlePreloaderComplete } = usePreloader();

  return (
    <>
      {isPreloaderVisible && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      <main
        className={`transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* <Hero />
        <ProductGrid />
        <AboutSection /> */}
        <Navbar theme="dark" />
        =<Hero/>
        <Footer  />
      </main>
    </>
  );
}