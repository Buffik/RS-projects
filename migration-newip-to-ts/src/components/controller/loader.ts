import { OptionsForLoader, UrlOptions } from '../../types';

class Loader {
  baseLink: string;
  options: OptionsForLoader;

  constructor(baseLink: string, options: OptionsForLoader) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp<T>(
    {
      endpoint,
      options = {},
    }: { endpoint: string; options?: OptionsForLoader },
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
      if (res.status === 401 || res.status === 404) throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: OptionsForLoader, endpoint: string) {
    const urlOptions: UrlOptions = {
      ...this.options,
      ...options,
    };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load<U>(
    method: string,
    endpoint: string,
    callback: (data: U) => void,
    options = {}
  ) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
