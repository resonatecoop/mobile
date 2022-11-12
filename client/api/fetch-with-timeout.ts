import { FetchError } from "./error";

export type FetchOptions = RequestInit & {
  timeout?: number;
};

const DEFAULT_TIMEOUT = 15000;

export default async function fetchWithTimeout(
  url: string,
  opts: FetchOptions
): ReturnType<typeof fetch> {
  const controller = new AbortController();

  const headers = {
    ...opts.headers,
  };

  const abortTimer = setTimeout(() => {
    controller.abort("request timed out");
  }, opts.timeout || DEFAULT_TIMEOUT);

  return fetch(url, {
    ...opts,
    headers,
    signal: controller.signal,
  })
    .then(async (res) => {
      if (!res.ok) {
        const payload = await res.json();

        const err = new FetchError(
          `Request failed: ${url} ${res.status} ${payload.message}`,
          url,
          res
        );

        return Promise.reject(err);
      }
      return res;
    })
    .finally(() => {
      clearTimeout(abortTimer);
    });
}
