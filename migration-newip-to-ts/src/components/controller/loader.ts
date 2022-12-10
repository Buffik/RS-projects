import { TOptionsForLoader, IUrlOptions, ResponseStatus, TApiKey } from '../../types';

class Loader {
  private baseLink: string;
  private options: Partial<TOptionsForLoader> & Partial<TApiKey>;

  constructor(baseLink: string, options: Partial<TOptionsForLoader> & Partial<TApiKey>) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp<T>(
    { endpoint, options = {} }: { endpoint: string; options?: Partial<TOptionsForLoader> },
    callback = (data: T) => {
      if (!data) {
        console.error('No callback for GET response');
      }
    }
  ) {
    this.load<T>('GET', endpoint, callback, options);
  }

  errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === ResponseStatus.Unauthorized || res.status === ResponseStatus.NotFound)
        throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: Partial<TOptionsForLoader>, endpoint: string) {
    const urlOptions: IUrlOptions = {
      ...this.options,
      ...options,
    };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load<U>(method: string, endpoint: string, callback: (data: U) => void, options = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
