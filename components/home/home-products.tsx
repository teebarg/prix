import { Product } from "components/product/product";
import Link from "next/link";

async function getData() {
    const res = await fetch(
        "https://smpl.supermartng.com/product-slots/LandingPage?access_id=ylemrZr7QzQKOVujBBSr&session_id=3djwLXseHgZ7BdWcyharj9QwaBTwWsPsLVxqk4OysAuKtI9GCe"
    );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch product data");
    }

    return res.json();
}

export async function HomeProducts() {
    const {
        data: { adSlots },
    } = await getData();

    if (!adSlots?.length) return null;

    return (
        <>
            <div className="">
                {adSlots.slice(0, 6).map((adSlot: any, i: number) => (
                    <>
                        <div className="flex justify-between mt-8 home-category font-semibold p-3">
                            <h2 className="mb-0 text-white">{adSlot?.name}</h2>
                            <span>
                                <Link href={`/${adSlot.viewMorelink}`} className="font-weight-semi-bold" style={{ color: "#28a745" }}>
                                    VIEW MORE
                                </Link>
                            </span>
                        </div>
                        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-6 xl:gap-x-4 bg-white/50" key={i}>
                            {adSlot.adProducts.map((adProduct: any, k: number) => (
                                <Product key={k} product={adProduct.product} />
                            ))}
                        </div>
                    </>
                ))}
            </div>
        </>
    );
}
