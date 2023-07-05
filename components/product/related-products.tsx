import { Product } from 'components/product/product';
import { buildUrl, getCart } from 'lib/api';

async function getRelatedProducts(sku: string) {
  const res = await fetch(
    buildUrl(
      `/product/${sku}/related`,
      { limit: 6 },
      '&returnFields[]=modified&returnFields[]=name&returnFields[]=priority&returnFields[]=status&returnFields[]=_id&returnFields[]=defaultStockingStore.supermart_price&returnFields[]=description&returnFields[]=fragile&returnFields[]=fresh&returnFields[]=image&returnFields[]=localProduct&returnFields[]=modified&returnFields[]=brand_name&returnFields[]=priority&returnFields[]=prodDiscount&returnFields[]=productType&returnFields[]=status&returnFields[]=supermart_sku&returnFields[]=url&returnFields[]=_id&returnFields[]=subCategory&returnFields[]=productCategories&returnFields[]=defaultStockingStore&returnFields[]=offer&returnFields[]=new&returnFields[]=is_uk&returnFields[]=maxQuantity&returnFields[]=store_name&returnFields[]=productStockingStores&returnFields[]=store_name&returnFields[]=productStockingStores&returnFields[]=store_name&returnFields[]=productStockingStores&returnFields[]=store_name&returnFields[]=productStockingStores'
    )
  );

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch product data');
  }

  return res.json();
}

export async function RelatedProducts({ sku }: { sku: string }) {
  const {
    data: { products }
  } = await getRelatedProducts(sku);

  if (!products?.length) return <>Default template</>;
  const {
    data: { cart }
  } = await getCart();

  return (
    <>
      <div className="mb-6 px-8">
        <p className="my-4 text-center text-xl font-semibold">Related Products</p>
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-6 xl:gap-x-4">
          {products.map((product: any, k: number) => (
            <Product key={product._id + k} product={product} cart={cart} />
          ))}
        </div>
      </div>
    </>
  );
}
