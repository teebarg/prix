'use server';

import { buildQuery } from 'lib/utils';
import { cookies } from 'next/headers';

export async function getCart() {
  const res = await fetch(buildUrl('/cart'), {
    cache: 'no-store'
  });

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch product data');
  }

  return res.json();
}

export async function getCategories() {
  const res = await fetch(buildUrl('/product/categories'));

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch product data');
  }

  return res.json();
}

export const buildUrl = (
  path: string,
  queryParams: Record<string, string | number | Date | undefined | null> = {},
  custom?: string
): string => {
  const domain = process.env.API_DOMAIN!;
  const cookieStore = cookies();
  const session_id = cookieStore.get('session_id');
  let query = buildQuery(`${domain}${path}`, {
    ...queryParams,
    access_id: process.env.ACCESS_ID,
    session_id: session_id?.value
  });

  if (custom) {
    query += custom;
  }
  return query;
};
