import { Carousel, CarouselLoading } from 'components/carousel';
import { HomeFooter } from 'components/home/footer';
import { HomeHeader } from 'components/home/header';
import { HomeHeaderLoading } from 'components/home/header-loading';
import { HomeProducts, HomeProductsLoading } from 'components/home/home-products';
import Footer from 'components/layout/footer';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance eCommerce store built with Next.js.'
  // openGraph: {
  //     images: [
  //         {
  //             url: `/api/og?title=${encodeURIComponent(process.env.SITE_NAME || "")}`,
  //             width: 1200,
  //             height: 630,
  //         },
  //     ],
  //     type: "website",
  // },
};

export default async function HomePage() {
  return (
    <>
      <Suspense>
        <Suspense fallback={<HomeHeaderLoading />}>
          <div className="mb-6">
            <HomeHeader />
          </div>
        </Suspense>
        <div className="px-12">
          <Suspense fallback={<CarouselLoading />}>
            <Carousel />
          </Suspense>
          <Suspense fallback={<HomeProductsLoading />}>
            <HomeProducts />
          </Suspense>
        </div>
        <Suspense>
          <HomeFooter />
        </Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
