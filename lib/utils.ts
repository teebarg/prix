import { ReadonlyURLSearchParams } from 'next/navigation';

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const stringGen = (len: number): string => {
  let text: string = '';

  const charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < len; i++) {
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return text.toString();
};

export function buildQuery(
  baseUrl: string,
  queryParams: Record<string, string | Date | undefined | null>
): string {
  let url = baseUrl;
  let firstQueryParam = true;

  for (const key in queryParams) {
    if (queryParams.hasOwnProperty(key)) {
      if (firstQueryParam) {
        url += `?${key}=${queryParams[key]}`;
        firstQueryParam = false;
      } else {
        url += `&${key}=${queryParams[key]}`;
      }
    }
  }

  return url;
}
