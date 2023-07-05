import { AddToCart } from 'components/product/add-to-cart';
import Image from 'next/image';
import Link from 'next/link';

export async function Product({ product, cart }: { product: any; cart: any }) {
  return (
    <>
      <div key={product._id} className="rounded-md bg-white">
        <div className="relative">
          {product?.new && (
            <span className="badge absolute left-2 top-2 bg-red-50 text-red-700 ring-red-600/10">
              New
            </span>
          )}
          {product?.offer && (
            <span className="badge absolute right-2 top-2 z-10 bg-primary text-white">Promo</span>
          )}
          <div className="flex h-60 w-full items-center justify-center overflow-hidden rounded-lg">
            <div className="relative h-52 w-52 p-8">
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_DOMAIN}/supermart-staging/productImage/${product.image}`}
                fill
                alt={product.name}
                className="object-contain"
              />
            </div>
          </div>
          <div className="relative mt-4 flex h-24 flex-col border-b border-t border-[#e5e5e5] px-1 py-2">
            <Link
              href={`/product/${product?.url}`}
              className="relative line-clamp-2 py-2 text-xs font-medium text-gray-900"
            >
              {product.name}
            </Link>
            <div className="relative mt-auto flex gap-1">
              <p className="font-semibold">₦{product?.defaultStockingStore?.supermart_price}</p>
              {product?.defaultStockingStore?.oldPrice && (
                <p className="text-xs font-normal line-through">
                  ₦{product?.defaultStockingStore?.oldPrice}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center py-4">
          <AddToCart
            store_name={product?.defaultStockingStore?.store_name}
            supermart_sku={product.supermart_sku}
            cart={cart}
          />
        </div>
      </div>
    </>
  );
}
