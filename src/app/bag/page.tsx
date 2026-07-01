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
       

        <div className="mx-auto flex max-w-350 items-end justify-between gap-6">
          <div className="w-full">
            <h1 className="select-none font-black uppercase leading-[0.82] tracking-[-0.06em] text-[#ff140f] text-[20vw] sm:text-[18vw] md:text-[17vw] lg:text-[16vw]">
              Your Bag
            </h1>

            <div className="mt-4 h-0.75 w-full bg-[#ff140f] md:mt-6" />
          </div>

          
        </div>
      </section>

      <section className="relative overflow-hidden px-4 pb-14 pt-8 md:px-6 md:pb-20 md:pt-10">
        <div className="mx-auto max-w-350">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-8">
              <p className="font-black uppercase leading-[0.88] tracking-[-0.06em] text-[#ff140f] text-[15vw] sm:text-[13vw] md:text-[11vw] lg:text-[8vw]">
                Not even one thing?
                <br />
                That&apos;s sad
              </p>
            </div>

            {/* <div className="lg:col-span-4 lg:pt-4">
              <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-full bg-[#d7d2cb] sm:h-56 sm:w-56 lg:-mt-28 lg:h-64 lg:w-64 lg:ml-auto">
                <Image
                  src="/products/preview-2.jpg"
                  alt="Empty bag illustration"
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 256px, 224px"
                />
              </div>

              <div className="mt-8 flex items-center gap-3 text-[#ff140f]">
                <span className="h-2 w-2 rounded-full bg-[#ff140f]" />
                <span className="text-xs font-medium uppercase tracking-[0.2em]">
                  No items added yet
                </span>
              </div>

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#ff140f] opacity-90">
                Browse the collection and add something to your bag. The empty state stays bold so the page still feels like part of the same brand system.
              </p>

              <Link
                href="/"
                className="mt-6 inline-flex items-center gap-2 border-b border-[#ff140f] pb-1 text-sm font-medium uppercase tracking-[0.18em] text-[#ff140f] transition-opacity hover:opacity-60"
              >
                Continue shopping
              </Link>
            </div> */}
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