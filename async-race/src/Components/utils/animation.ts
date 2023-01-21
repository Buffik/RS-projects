function animation(elem: CSSStyleDeclaration, distance: number, cartTime: number) {
  const element = elem;
  let startAnimation: number | null = null;
  function easeInOut(time: number) {
    return 0.5 * (1 - Math.cos(Math.PI * time));
  }

  requestAnimationFrame(function measure(time) {
    if (!startAnimation) {
      startAnimation = time;
    }

    const progress = (time - startAnimation) / cartTime;

    const translate = easeInOut(progress) * distance;

    element.transform = `translateX(${translate}px)`;

    if (progress < 1) {
      requestAnimationFrame(measure);
    }
  });
}

export default animation;
