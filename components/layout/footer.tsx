import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

const { FACEBOOK, TWITTER, INSTAGRAM, PARTNER } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const cookiesList = cookies();
  const hasCookie = cookiesList.has('cookie');

  return (
    <footer className="">
      <div>
        {!hasCookie && (
          <div className="center fixed bottom-0 z-50 w-full bg-primary px-5 py-2 shadow-lg">
            <div className="text-xs italic text-white">
              We use cookies to enhance your shopping experience. By continuing to browse the site,
              you are agreeing to our use of cookies.{' '}
              <a className="text-orange-500" href="/content/cookie">
                Find out more here
              </a>
            </div>
            <button
              type="button"
              className="ml-2 min-w-[100px] rounded-md border border-primary bg-white px-4"
            >
              <span className="text-primary opacity-100">Accept</span>
            </button>
          </div>
        )}

        <div className="space-y-4 bg-primary py-6 text-white">
          <div className="center gap-4">
            <p>
              <Link href="/">Home</Link>
            </p>
            <p>
              <Link href="/content/faq">FAQ</Link>
            </p>
            <p>
              <Link href="/content/e-wallet">E-Wallet</Link>
            </p>
            <p>
              <Link href="http://blog.supermart.ng" target="_blank" rel="noopener">
                Blog
              </Link>
            </p>
            <p>
              <Link href="/content/contact-us">Contact</Link>
            </p>
            <p>
              <Link href="/content/privacy">Privacy</Link>
            </p>
            <p>
              <Link href="/content/cookie">Cookie</Link>
            </p>
            <p>
              <Link href="/content/terms">Terms</Link>
            </p>
            <p>
              <Link href="/business">Corporate Purchases</Link>
            </p>
          </div>

          <div className="center gap-4">
            <div>
              <p>Follow Us:</p>
            </div>
            <div>
              <Link
                href={`https://www.facebook.com/${FACEBOOK}`}
                target="_blank"
                rel="noopener"
                className="flex"
              >
                <div className="relative w-12">
                  <Image src="/facebook_logo.svg" alt="facebook" fill className="object-contain" />
                </div>
                <p className="hidden sm:block">Facebook</p>
              </Link>
            </div>
            <div>
              <Link
                href={`https://twitter.com/${TWITTER}`}
                target="_blank"
                rel="noopener"
                className="flex"
              >
                <div className="relative w-12">
                  <Image src="/twitter_logo.svg" alt="facebook" fill className="object-contain" />
                </div>
                <p className="hidden sm:block">Twitter</p>
              </Link>
            </div>
            <div>
              <Link
                href={`https://instagram.com/${INSTAGRAM}`}
                target="_blank"
                rel="noopener"
                className="flex"
              >
                <div className="relative w-12">
                  <Image src="/instagram_logo.svg" alt="facebook" fill className="object-contain" />
                </div>
                <p className="hidden sm:block">Instagram</p>
              </Link>
            </div>
          </div>

          <div className="center">
            <p>
              &copy; {copyrightDate} {PARTNER}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
