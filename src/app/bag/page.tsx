'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function BagPage() {
  return (
    <main className="min-h-dvh ">
      <Navbar theme="cream" />

      <section className="relative overflow-hidden px-4 pb-8 pt-10 md:px-6 md:pb-14 md:pt-12">
       

        <div className="mx-auto flex  items-end justify-between gap-6">
          <div className="w-full">
            <h1 className="select-none font-black uppercase leading-[0.82]  text-[20vw] sm:text-[18vw] md:text-[17vw] lg:text-[16vw]">
              Your Bag
            </h1>

            <div className="mt-4 h-0.75 w-full bg-(--foreground) md:mt-6" />
          </div>

          
        </div>
      </section>

      <section className="relative overflow-hidden px-4 pb-14 pt-8 md:px-6 md:pb-20 md:pt-10">
        <div className="mx-auto ">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-8">
              <p className=" uppercase leading-[0.88] tracking-[-0.06em] text-[15vw] sm:text-[13vw] md:text-[11vw] lg:text-[8vw]">
                Not even one thing?
                <br />
                That&apos;s sad
              </p>
            </div>

            
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function PlusMark() {
  return (
    <span className="inline-flex h-4 w-4 text-[#ff140f] md:h-5 md:w-5">
      <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <rect x="5" y="0" width="4" height="14" rx="1" fill="currentColor" />
        <rect x="0" y="5" width="14" height="4" rx="1" fill="currentColor" />
      </svg>
    </span>
  );
}