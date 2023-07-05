import { HomeHeader } from 'components/home/header';
import Footer from 'components/layout/footer';
import { ReactNode, Suspense } from 'react';

export default async function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <Suspense>
        <div>
          <div className="min-h-screen">
            <Suspense>
              <div className="mb-6">
                <HomeHeader />
              </div>
            </Suspense>
            <Suspense>
              <main>{children}</main>
            </Suspense>
          </div>
          <Footer />
        </div>
      </Suspense>
    </div>
  );
}
