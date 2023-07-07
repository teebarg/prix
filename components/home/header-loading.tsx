import Cart from 'components/cart';
import Search from 'components/layout/navbar/search';
import Image from 'next/image';
import Link from 'next/link';

export async function HomeHeaderLoading() {
  const categories = Array(20).fill(1);

  return (
    <>
      <div className="mb-6 hidden bg-[#e4e4e4] sm:block">
        <div className="flex h-[8vh] justify-between px-3">
          <div className="my-auto">
            <Link href="/" className="relative block h-12 w-[20vw]">
              <Image src="/supermart_web.svg" alt="No Image" fill className="object-contain" />
            </Link>
          </div>
          <div className="mx-2 my-auto flex-1 lg:mx-5">
            <Search />
          </div>
          <div className="ml-2 mr-32 flex gap-4">
            <div className="relative w-12">
              <Image src="/favourite.svg" alt="Favourite" fill className="object-contain" />
            </div>
            <div className="relative w-12">
              <Cart />
            </div>
            <div className="relative w-12">
              <Image src="/account_circle.svg" alt="Account" fill className="object-contain" />
            </div>
          </div>
        </div>
        <div className="grid animate-pulse grid-cols-9 gap-[1px]">
          {categories.slice(0, 18).map((_, i: number) => (
            <div className="relative h-10 bg-slate-300" key={i}></div>
          ))}
        </div>
      </div>
    </>
  );
}
