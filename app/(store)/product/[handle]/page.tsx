import { AddToCart } from 'components/product/add-to-cart';
import { RelatedProducts } from 'components/product/related-products';
import { buildUrl, getCart } from 'lib/api';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

async function getProduct(sku: string) {
  const res = await fetch(buildUrl(`/product/url/${sku}`));

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch product data');
  }

  return res.json();
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const { data } = await getProduct(params.handle);

  if (!data || data.length < 1) return notFound();

  const product = data[0];
  const {
    data: { cart }
  } = await getCart();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `${process.env.NEXT_PUBLIC_S3_DOMAIN}/supermart-staging/productImage/${product.image}`,
    offers: {
      '@type': 'AggregateOffer',
      availability:
        product.status === 'Active'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      priceCurrency: 'NGN',
      highPrice: product?.defaultStockingStore?.supermart_price,
      lowPrice: 0
    }
  };

  return (
    <div className="px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <div className="flex gap-8 bg-white px-16 py-4">
        <div className="px-8">
          <div className="relative h-96 w-[28rem] rounded-md border border-gray-300 p-8">
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_DOMAIN}/supermart-staging/productImage/${product.image}`}
              fill
              alt={product.name}
              className="object-contain object-center"
            />
          </div>
        </div>
        <div className="flex-1">
          <p className="text-2xl font-semibold">{product.name}</p>
          <div className="my-4 border-b border-t border-gray-300 py-4">
            <p>
              Price:{' '}
              <span className="font-semibold">
                ₦{product?.defaultStockingStore?.supermart_price}
              </span>{' '}
            </p>
            <AddToCart
              store_name={product?.defaultStockingStore?.store_name}
              supermart_sku={product.supermart_sku}
              cart={cart}
            />
          </div>
          <p className="text-xl font-semibold">Product Description</p>
          <p className="text-sm">{product.description}</p>
        </div>
      </div>
      <RelatedProducts sku={product.supermart_sku} />
    </div>
  );
}
