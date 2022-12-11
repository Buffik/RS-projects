import { TOptionsForLoader, TApiKey } from '../../types';
declare class Loader {
    private baseLink;
    private options;
    constructor(baseLink: string, options: Partial<TOptionsForLoader> & Partial<TApiKey>);
    getResp<T>({ endpoint, options }: {
        endpoint: string;
        options?: Partial<TOptionsForLoader>;
    }, callback?: (data: T) => void): void;
    errorHandler(res: Response): Response;
    makeUrl(options: Partial<TOptionsForLoader>, endpoint: string): string;
    load<U>(method: string, endpoint: string, callback: (data: U) => void, options?: {}): void;
}
export default Loader;
