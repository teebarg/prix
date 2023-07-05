import { buildUrl } from 'lib/api';
import Image from 'next/image';
import Link from 'next/link';

async function getBrands() {
  const res = await fetch(buildUrl('/brand?page=1&limit=500&access_id=y', { page: 1, limit: 500 }));
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch product data');
  }

  return res.json();
}

const homePartners = [
  {
    image: '/assets/supermart/images/partner-logos/logo-spar.png',
    title: 'Spar'
  },
  {
    image: '/assets/supermart/images/partner-logos/logo-medplus.png',
    title: 'Medplus'
  },
  {
    image: '/assets/supermart/images/partner-logos/logo-officerus.png',
    title: 'Office R Us'
  },
  {
    image: '/assets/supermart/images/partner-logos/logo-chi.png',
    title: 'Chi'
  },
  {
    image: '/assets/supermart/images/partner-logos/logo-nestle.png',
    title: 'Nestle'
  },
  {
    image: '/assets/supermart/images/partner-logos/logo-unilever.png',
    title: 'Unilever'
  },
  {
    image: '/assets/supermart/images/partner-logos/logo-reckitt.png',
    title: 'Reckitt Benckiser'
  },
  {
    image: '/assets/supermart/images/partner-logos/logo-belimpex.png',
    title: 'Belimpex'
  },
  {
    image: '/assets/supermart/images/partner-logos/logo-nivea.png',
    title: 'Nivea'
  },
  {
    image: '/assets/supermart/images/partner-logos/logo-hayat.png',
    title: 'Hayat'
  },
  {
    image: '/assets/supermart/images/partner-logos/logo-funtuna.png',
    title: 'Funtuna'
  },
  {
    image: '/assets/supermart/images/partner-logos/logo-zartech.png',
    title: 'Zartech'
  },
  {
    image: '/assets/supermart/images/partner-logos/logo-redbull.png',
    title: 'Red Bull'
  }
];

export async function HomeFooter() {
  const {
    data: { brands }
  } = await getBrands();

  if (!brands?.length) return null;

  return (
    <div className="-mx-12 mt-8 bg-white px-4 pt-4">
      <h2 className="text-center font-semibold">TRUSTED PARTNERS</h2>
      <div className="mt-4 p-4">
        <div className="flex flex-wrap justify-center gap-8">
          {homePartners.map((homePartner: any, i: number) => (
            <div key={i} className="relative h-28 w-28">
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_DOMAIN}/supermart-staging${homePartner.image}`}
                alt={homePartner.title}
                fill
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
        <div className="m-4">
          <h2 className="mt-2">POPULAR BRANDS FROM THE LARGEST ONLINE SUPERMARKET :</h2>
          <div className="">
            {brands.map((brand: any, k: number) => (
              <Link
                key={k}
                className="text-xs font-semibold"
                href={`/brand/products/${brand.name}`}
              >
                <span className="">{brand?.name} | </span>
              </Link>
            ))}
            <span className="text-xs">and more.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
