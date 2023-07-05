import Cart from 'components/cart';
import Search from 'components/layout/navbar/search';
import { getCategories } from 'lib/api';
import Image from 'next/image';
import Link from 'next/link';

export async function HomeHeader() {
  const {
    data: { categories }
  } = await getCategories();

  if (!categories?.length) return null;

  return (
    <>
      <div className="hidden bg-[#e4e4e4] sm:block">
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
        <div className="grid grid-cols-9 gap-[1px]">
          {categories.slice(0, 18).map((cat: any, i: number) => (
            <div className="relative h-10" key={cat.name + i}>
              <button
                className={`h-full w-full bg-primary px-1 text-left capitalize text-white`}
                type="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="truncate text-xs">{cat.name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
