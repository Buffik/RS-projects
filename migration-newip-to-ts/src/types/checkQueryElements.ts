//checking element to be at HTML file, if not, throwing Error

export function checkedQuerySelector(
  parent: Element | Document,
  selector: string
): Element {
  const el = parent.querySelector(selector);
  if (!el) {
    throw new Error(`Selector ${selector} didn't match any elements.`);
  }
  return el;
}

//checking element be typed correct, if not, throwing Error with msg which type should have

export function queryElement<T extends typeof Element>(
  container: Document | Element,
  type: T,
  selector: string
): InstanceType<T> {
  const el = checkedQuerySelector(container, selector);
  if (!(el instanceof type)) {
    throw new Error(
      `Selector ${selector} matched ${el} which is not an ${type}`
    );
  }
  return el as InstanceType<T>;
}
