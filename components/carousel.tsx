import { buildUrl } from 'lib/api';
import Image from 'next/image';
import Link from 'next/link';

const { NEXT_PUBLIC_S3_DOMAIN } = process.env;

async function getData() {
  const res = await fetch(buildUrl('/homepage/banners'));

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  // const products = await getCollectionProducts({ collection: 'hidden-homepage-carousel' });
  const {
    data: { banners }
  } = await getData();

  const products = banners?.HomepageScrollBanner?.[0]?.ads;

  const sideBanners = banners?.HomepageSideBanner?.[0]?.ads;

  const mainBanners = banners?.LandingPageBanner?.[0]?.ads;

  if (!products?.length) return <CarouselLoading />;

  return (
    <div>
      <div className="flex h-[450px] gap-4">
        <div className="relative flex-1">
          <Image
            alt={mainBanners[0].name}
            className="h-full w-full"
            fill
            src={`${NEXT_PUBLIC_S3_DOMAIN}/supermart-staging/banner_images/desktop/${mainBanners[0].image}`}
          />
        </div>
        <div className="flex w-1/4 flex-col gap-4">
          <div className="relative flex-1">
            <Image
              alt={sideBanners[0].name}
              className="h-full w-full"
              fill
              src={`${NEXT_PUBLIC_S3_DOMAIN}/supermart-staging/banner_images/desktop/${sideBanners[0].image}`}
            />
          </div>
          <div className="relative h-1/3">
            <Image
              alt={sideBanners[0].name}
              className="h-full w-full"
              fill
              src={`${NEXT_PUBLIC_S3_DOMAIN}/supermart-staging/banner_images/desktop/${sideBanners[1].image}`}
            />
          </div>
        </div>
      </div>
      <div className="relative mt-6 w-full overflow-hidden bg-black dark:bg-white">
        <div className="flex animate-carousel">
          {[...products, ...products].map((product, i) => (
            <Link
              key={`${product.name}${i}`}
              href={`/${product.target_url}`}
              className="relative h-[30vh] w-1/2 flex-none md:w-1/3"
            >
              {product.image ? (
                <Image
                  alt={product.name}
                  className="h-full object-contain"
                  fill
                  sizes="33vw"
                  src={`${NEXT_PUBLIC_S3_DOMAIN}/supermart-staging/banner_images/desktop/${product.image}`}
                />
              ) : null}
              <div className="absolute inset-y-0 right-0 flex items-center justify-center">
                <div className="inline-flex bg-white p-4 text-xl font-semibold text-black dark:bg-black dark:text-white">
                  {product.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function CarouselLoading() {
  return (
    <div className="animate-pulse">
      <div className="flex h-[450px] gap-4">
        <div className="relative h-full flex-1 bg-slate-300"></div>
        <div className="flex h-full w-1/4 flex-col gap-4">
          <div className="relative flex-1 bg-slate-300"></div>
          <div className="relative h-1/3 bg-slate-300"></div>
        </div>
      </div>
      <div className="relative mt-6 w-full overflow-hidden bg-white">
        <div className="flex animate-carousel gap-2">
          {[1, 1, 1, 1, 1, 1].map((_, i) => (
            <div key={i} className="h-60 w-1/3 flex-none bg-slate-300"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
