import Image from "next/image";
import Link from "next/link";

export async function Product({ product }: { product: any }) {
    return (
        <>
            <div key={product.id} className="bg-white">
                <div className="relative">
                    {product?.new && <span className="badge bg-red-50 text-red-700 ring-red-600/10 absolute top-2 left-2">New</span>}
                    {product?.offer && <span className="badge bg-primary text-white absolute top-2 right-2 z-10">Promo</span>}
                    <div className="h-60 w-full overflow-hidden rounded-lg flex items-center justify-center">
                        <div className="w-52 h-52 p-8 relative">
                            <Image
                            src={`http://s3-static-play.supermartng.com/supermart-staging/productImage/${product.image}`}
                            fill
                            alt={product.name}
                            className="object-contain"
                        />
                        </div>
                    </div>
                    <div className="relative mt-4 border-t border-b border-t-gray-400 border-b-gray-400 py-2 px-1 h-24 flex flex-col">
                        <Link href={`/product/${product?.url}`} className="relative py-2 text-xs font-medium text-gray-900">
                            {product.name}
                        </Link>
                        <p className="relative font-semibold mt-auto">₦{product?.defaultStockingStore?.supermart_price}</p>
                    </div>
                </div>
                <div className="flex justify-center items-center py-4">
                    <button
                        type="button"
                        className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </>
    );
}
