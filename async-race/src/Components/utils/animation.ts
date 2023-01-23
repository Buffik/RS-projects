function animation(
  elem: CSSStyleDeclaration,
  distance: number,
  carTime: number,
) {
  const element = elem;
  let startAnimation: number | null = null;
  const state = { id: 0 };

  function step(timestamp: number) {
    if (!startAnimation) startAnimation = timestamp;
    const time = timestamp - startAnimation!;
    const passed = Math.round(time * (distance / carTime));

    element.transform = `translateX(${Math.min(passed, distance)}px)`;
    if (passed < distance) {
      state.id = requestAnimationFrame(step);
    }
  }

  state.id = requestAnimationFrame(step);

  return state;

  // function easeInOut(time: number) {
  //   return 0.5 * (1 - Math.cos(Math.PI * time));
  // }

  // requestAnimationFrame(function measure(time) {
  //   if (!startAnimation) {
  //     startAnimation = time;
  //   }

  //   const progress = (time - startAnimation) / carTime;

  //   const translate = easeInOut(progress) * distance;

  //   element.transform = `translateX(${translate}px)`;

  //   if (progress < 1) {
  //     requestAnimationFrame(measure);
  //   }
  // });
}

export default animation;
