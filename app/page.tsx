import { Carousel } from 'components/carousel';
// import { ThreeItemGrid } from 'components/grid/three-items';
// import { Categories } from "components/home/categories";
import { HomeFooter } from 'components/home/footer';
import { HomeHeader } from 'components/home/header';
import { HomeProducts } from 'components/home/home-products';
// import Footer from 'components/layout/footer';
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
      {/* <Categories /> */}
      <Suspense>
        <div className="px-12">
          <Suspense>
            <div className="-mx-12 mb-6">
              <HomeHeader />
            </div>
          </Suspense>
          <Carousel />
          <Suspense>
            <HomeProducts />
          </Suspense>
          <Suspense>
            <HomeFooter />
          </Suspense>
          {/* <Suspense>
                    <Footer />
                </Suspense> */}
        </div>
      </Suspense>
    </>
  );
}
