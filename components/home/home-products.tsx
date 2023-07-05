import { Product } from 'components/product/product';
import { buildUrl, getCart } from 'lib/api';
import Link from 'next/link';

async function getData() {
  const res = await fetch(buildUrl('/product-slots/LandingPage'));
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch product data');
  }

  return res.json();
}

export async function HomeProducts() {
  const {
    data: { adSlots }
  } = await getData();

  if (!adSlots?.length) return null;
  const {
    data: { cart }
  } = await getCart();

  return (
    <>
      <div className="">
        {adSlots.slice(0, 6).map((adSlot: any, i: number) => (
          <div key={i}>
            <div className="home-category mt-8 flex justify-between p-3 font-semibold">
              <h2 className="mb-0 text-white">{adSlot?.name}</h2>
              <span>
                <Link
                  href={`/${adSlot.viewMorelink}`}
                  className="font-weight-semi-bold"
                  style={{ color: '#28a745' }}
                >
                  VIEW MORE
                </Link>
              </span>
            </div>
            <div className="grid grid-cols-1 gap-y-12 bg-white/50 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-6 xl:gap-x-4">
              {adSlot.adProducts.map((adProduct: any, k: number) => (
                <Product key={k} product={adProduct.product} cart={cart} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
