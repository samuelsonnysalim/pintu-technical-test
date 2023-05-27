import axios, { Method } from 'axios';
import { Path } from 'path-parser';

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_HOSTNAME}api/`;

interface ServiceOptions {
  url: string;
  method: Method | string;
}

interface RequestOptions<D> {
  params: Record<string, any>;
  body: D;
  query: Record<string, string>;
}

type Service<T, D> = (options?: Partial<RequestOptions<D>>) => Promise<T>;

export function createService<T = any, D = any>(
  options: ServiceOptions,
): Service<T, D> {
  return async (request?: Partial<RequestOptions<D>>) =>
    (
      await axios.request<T>({
        url: new Path(options.url).build(request?.params),
        method: options.method,
        data: request?.body,
        params: request?.query,
        ...(request || {}),
      })
    ).data;
}
