export declare function checkedQuerySelector(parent: Element | Document, selector: string): Element;
export declare function queryElement<T extends typeof Element>(container: Document | Element, type: T, selector: string): InstanceType<T>;
