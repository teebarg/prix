import { Outfit } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;

export const metadata = {
  title: {
    default: SITE_NAME || 'eCommerce Site',
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(TWITTER_CREATOR &&
    TWITTER_SITE && {
      twitter: {
        card: 'summary_large_image',
        creator: TWITTER_CREATOR,
        site: TWITTER_SITE
      }
    })
};

// const inter = Inter({
//     subsets: ["latin"],
//     display: "swap",
//     variable: "--font-inter",
// });
const outfit = Outfit({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={outfit.className}>
      <body className="darkk:bg-black darkk:text-white darkk:selection:bg-fuchsia-600 darkk:selection:text-white bg-[#e4e4e4] text-black selection:bg-teal-300">
        <Suspense>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
