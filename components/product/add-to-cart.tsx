'use client';

import clsx from 'clsx';
import { buildUrl } from 'lib/api';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, useTransition } from 'react';

// import LoadingDots from "components/loading-dots";

export function AddToCart({
  store_name,
  supermart_sku,
  cart,
  size = 'md'
}: {
  store_name: string;
  supermart_sku: string;
  cart: any;
  size?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState<number>(0);

  const debounceDelay = 100;
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const debounce = useCallback((callback: () => void) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(callback, debounceDelay);
  }, []);

  useEffect(() => {
    const itemCount: number = cart?.cart_items?.find(
      (item: any) => item.supermart_sku === supermart_sku
    )?.quantity;
    setCount(itemCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart?.cart_items]);

  const addItem = async (quantity: number) => {
    const response = await fetch(await buildUrl('/cart'), {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity, store_name, supermart_sku }),
      method: 'POST',
      cache: 'no-store'
    });
    const { status } = await response.json();
    return status === 'error';
  };

  const decreaseQuantity = () => {
    setCount(count - 1);
    handleTransition(count - 1);
  };

  const increaseQuantity = () => {
    setCount(count + 1);
    handleTransition(count + 1);
  };

  const handleInputChange = (e: any) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      setCount(newQuantity);
      handleTransition(newQuantity);
    }
  };

  const handleTransition = (newQuantity: number) => {
    debounce(() => {
      startTransition(async () => {
        const error = await addItem(newQuantity);

        if (error) {
          alert(error);
          return;
        }
        router.refresh();
      });
    });
  };

  const ctrlSz = size == 'md' ? 'h-10 w-10' : 'h-6 w-6';
  const inputSz = size == 'md' ? 'w-12 h-10 text-sm' : 'w-6 h-6 text-xs';

  return (
    <>
      {count > 0 ? (
        <div className="flex items-center focus:outline-none">
          <button
            className={clsx('rounded-s-lg bg-primary text-white hover:bg-primary/80', ctrlSz)}
            onClick={decreaseQuantity}
          >
            -
          </button>
          <input
            className={clsx('number-input border-b border-t border-gray-300 text-center', inputSz)}
            type="number"
            min={1}
            value={count}
            onChange={handleInputChange}
          />
          <button
            className={clsx('rounded-e-md bg-primary text-white hover:bg-primary/80', ctrlSz)}
            onClick={increaseQuantity}
          >
            +
          </button>
        </div>
      ) : (
        <button
          aria-label="Add item to cart"
          disabled={isPending}
          onClick={() => {
            handleTransition(1);
          }}
          className={clsx(
            'rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/50 focus-visible:outline-none'
          )}
        >
          Add To Cart
        </button>
      )}
    </>
  );
}
