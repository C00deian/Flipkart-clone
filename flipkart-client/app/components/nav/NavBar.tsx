'use client';

import Link from 'next/link';
import { Redressed } from 'next/font/google';
import { CartCount } from './CartCount';
import UserMenu from './UserMenu';
import Image from 'next/image';


const redressed = Redressed({
  subsets: ['latin'],
  weight: ['400'],
});

export default function NavBar() {
  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">

      {/* TOP NAV */}
      <div className="h-16 flex justify-center">
        <div className="
          w-full
          max-w-[1248px]
          px-4
          flex
          items-center
          justify-between
          gap-4
        ">

        <Link href="/" className="flex items-center">
  <Image
    src="/fklogo.svg"
    alt="E-shop"
    width={160}
    height={40}
    priority
  />
</Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-[620px] mx-6">
            <input
              className="
                w-full
                h-10
                bg-slate-100
                rounded-sm
                px-4
                text-sm
                outline-none
              "
              placeholder="Search for Products, Brands and More"
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-6 whitespace-nowrap">
            <UserMenu />
            <CartCount />
          </div>

        </div>
      </div>
    </header>
  );
}
