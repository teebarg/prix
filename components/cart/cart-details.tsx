'use client';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { AddToCart } from 'components/product/add-to-cart';
import { stringGen } from 'lib/utils';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export default function CartDetails({ cart = {} }: { cart: any }) {
  const [cookie, setCookie] = useCookies(['session_id']);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!cookie['session_id']) {
      setCookie('session_id', stringGen(32), {
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      });
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex">
        <Image
          src="/shopping_cart.svg"
          alt="Shopping Cart"
          fill
          className="cursor-pointer object-contain"
          onClick={() => setOpen(true)}
        />
        <span className="absolute -right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-white">
          {cart.totalItems}
        </span>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-lg">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-base font-semibold leading-6 text-white">
                          <div className="flex items-center justify-between bg-secondary px-4 py-2">
                            <div>
                              <p className="font-semibold">Your Basket</p>
                              <p>1 items</p>
                            </div>
                            <p className="text-xl font-semibold">N{15000}</p>
                          </div>
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 space-y-2 px-4">
                        {cart.cart_items.map((item: any, key: number) => (
                          <div key={key} className="flex w-full items-center gap-2">
                            <div className="relative h-10 w-10 rounded-md border border-gray-300">
                              <Image
                                src={`${process.env.NEXT_PUBLIC_S3_DOMAIN}/supermart-staging/productImage/${item.image}`}
                                alt="Shopping Cart"
                                fill
                                className="object-contain"
                              />
                            </div>
                            <p className="line-clamp-2 flex-1 text-sm">{item.name}</p>
                            <AddToCart
                              store_name={item.stocking_store}
                              supermart_sku={item.supermart_sku}
                              cart={cart}
                              size="sm"
                            />
                            <p className="w-10 text-xs">₦{item.supermart_price * item.quantity}</p>
                            <div className="relative h-8 w-8">
                              <Image
                                src="/trash.svg"
                                alt="delete"
                                fill
                                className="object-scale-down"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
