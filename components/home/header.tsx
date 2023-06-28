import Search from "components/layout/navbar/search";
import Image from "next/image";
import Link from "next/link";

async function getCategories() {
    const res = await fetch(
        "https://smpl.supermartng.com/product/categories?access_id=ylemrZr7QzQKOVujBBSr&session_id=3djwLXseHgZ7BdWcyharj9QwaBTwWsPsLVxqk4OysAuKtI9GCe"
    );

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch product data");
    }

    return res.json();
}

export async function HomeHeader() {
    const {
        data: { categories },
    } = await getCategories();

    if (!categories?.length) return null;

    return (
        <>
            <div className="hidden sm:block bg-[#e4e4e4]">
                <div className="flex justify-between h-[8vh] px-3">
                    <div className="my-auto">
                        <Link href="/" className="block h-12 w-[20vw] relative">
                            <Image src="/supermart_web.svg" alt="No Image" fill className="object-contain" />
                        </Link>
                    </div>
                    <div className="flex-1 my-auto mx-2 lg:mx-5">
                        <Search />
                    </div>
                    <div className="flex gap-4 ml-2 mr-32">
                        <div className="relative w-12">
                            <Image src="/favourite.svg" alt="Favourite" fill className="object-contain" />
                        </div>
                        <div className="relative w-12">
                            <Image src="/shopping_cart.svg" alt="Shopping Cart" fill className="object-contain" />
                        </div>
                        <div className="relative w-12">
                            <Image src="/account_circle.svg" alt="Account" fill className="object-contain" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-9 gap-[1px]">
                    {categories.slice(0, 18).map((cat: any, i: number) => (
                        <div className="relative h-10" key={cat.name + i}>
                            <button
                                className={`bg-primary text-white capitalize text-left w-full h-full px-1`}
                                type="button"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <span className="truncate text-xs">{cat.name}</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
