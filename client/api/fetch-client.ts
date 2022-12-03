import { FetchError } from "./error";
import fetchWithTimeout, { FetchOptions } from "./fetch-with-timeout";

interface ServiceClientOptions {
  baseURL?: string;
  headers?: Record<string, string>;
  timeout?: number;
}

export class FetchClient {
  options: ServiceClientOptions;
  constructor(options: ServiceClientOptions) {
    this.options = options;
  }

  mergeOptions(options?: ServiceClientOptions): ServiceClientOptions {
    return {
      ...this.options,
      ...options,
      headers: this.mergeHeaders(options?.headers),
    };
  }

  mergeHeaders(newHeaders: Record<string, string> = {}) {
    const headers = { ...this.options.headers };
    for (const key of Object.keys(newHeaders)) {
      const value = newHeaders[key];
      if (value === undefined) {
        delete headers[key];
      } else {
        headers[key] = value;
      }
    }
    return headers;
  }

  setOptions(options?: ServiceClientOptions) {
    this.options = this.mergeOptions(options);
  }

  extend(options: ServiceClientOptions) {
    return new FetchClient(this.mergeOptions(options));
  }

  getURL(endpoint: string, prefix: string) {
    const result = new URL(endpoint, prefix);
    return result.toString();
  }

  request(
    _method: string,
    endpoint: string,
    body?: BodyInit,
    options?: ServiceClientOptions
  ) {
    const { baseURL, headers, timeout = 0 } = this.mergeOptions(options);
    const url = this.getURL(endpoint, baseURL || "");
    const method = _method.toUpperCase();
    const opts: FetchOptions = {
      method,
      headers,
      timeout,
    };

    // fetch will throw if given body for these
    if (method !== "GET" && method !== "HEAD") {
      opts.body = body;
    }

    return fetchWithTimeout(url, opts);
  }

  json<T, U = unknown>(
    method: string,
    endpoint: string,
    payload: U | undefined,
    options: Partial<ServiceClientOptions> = { headers: {} }
  ) {
    if (!options.headers) {
      options.headers = {};
    }

    options.headers["Content-Type"] = "application/json";
    options.headers["Accept"] = "application/json";

    return this.request(
      method,
      endpoint,
      JSON.stringify(payload),
      options
    ).then<T>((res) => (res.status === 204 ? (null as T) : parseJSON(res)));
  }

  put<T, U = unknown>(
    endpoint: string,
    payload?: U,
    options?: ServiceClientOptions
  ) {
    return this.json<T, U>("PUT", endpoint, payload, options);
  }

  post<T, U = unknown>(
    endpoint: string,
    payload?: U,
    options?: ServiceClientOptions
  ) {
    return this.json<T, U>("POST", endpoint, payload, options);
  }

  patch<T, U = unknown>(
    endpoint: string,
    payload?: U,
    options?: ServiceClientOptions
  ) {
    return this.json<T, U>("PATCH", endpoint, payload, options);
  }

  get<T, U extends Record<string, string>>(
    endpoint: string,
    params?: U,
    options?: ServiceClientOptions
  ) {
    if (params) {
      endpoint += "?" + new URLSearchParams(params).toString();
    }
    return this.json<T>("GET", endpoint, {}, options);
  }

  submit<T>(endpoint: string, body: BodyInit, options?: ServiceClientOptions) {
    return this.request("POST", endpoint, body, {
      ...options,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }).then<T>(parseJSON);
  }
}

function parseJSON(res: Response) {
  return res.json().catch(() => {
    return Promise.reject(
      new FetchError("Failed to parse JSON payload", res.url, res)
    );
  });
}
