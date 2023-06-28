import Image from "next/image";
import Link from "next/link";

async function getData() {
    const res = await fetch(
        "https://smpl.supermartng.com/homepage/banners?access_id=ylemrZr7QzQKOVujBBSr&session_id=3djwLXseHgZ7BdWcyharj9QwaBTwWsPsLVxqk4OysAuKtI9GCe"
    );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export async function Carousel() {
    // Collections that start with `hidden-*` are hidden from the search page.
    // const products = await getCollectionProducts({ collection: 'hidden-homepage-carousel' });
    const {
        data: { banners },
    } = await getData();

    const products = banners?.HomepageScrollBanner?.[0]?.ads;

    const sideBanners = banners?.HomepageSideBanner?.[0]?.ads;

    const mainBanners = banners?.LandingPageBanner?.[0]?.ads;

    if (!products?.length) return null;

    return (
        <>
            <div className="flex gap-4 h-[450px]">
                <div className="flex-1 relative">
                    <Image
                        alt={mainBanners[0].name}
                        className="h-full w-full"
                        fill
                        src={`http://s3-static-play.supermartng.com/supermart-staging/banner_images/desktop/${mainBanners[0].image}`}
                    />
                </div>
                <div className="flex flex-col gap-4 w-1/4">
                    <div className="flex-1 relative">
                        <Image
                            alt={sideBanners[0].name}
                            className="h-full w-full"
                            fill
                            src={`http://s3-static-play.supermartng.com/supermart-staging/banner_images/desktop/${sideBanners[0].image}`}
                        />
                    </div>
                    <div className="h-1/3 relative">
                        <Image
                            alt={sideBanners[0].name}
                            className="h-full w-full"
                            fill
                            src={`http://s3-static-play.supermartng.com/supermart-staging/banner_images/desktop/${sideBanners[1].image}`}
                        />
                    </div>
                </div>
            </div>
            <div className="relative w-full overflow-hidden bg-black dark:bg-white mt-6">
                <div className="flex animate-carousel">
                    {[...products, ...products].map((product, i) => (
                        <Link key={`${product.name}${i}`} href={`/${product.target_url}`} className="relative h-[30vh] w-1/2 flex-none md:w-1/3">
                            {product.image ? (
                                <Image
                                    alt={product.name}
                                    className="h-full object-contain"
                                    fill
                                    sizes="33vw"
                                    src={`http://s3-static-play.supermartng.com/supermart-staging/banner_images/desktop/${product.image}`}
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
        </>
    );
}
