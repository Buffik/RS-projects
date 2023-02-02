function animation(
  elem: CSSStyleDeclaration | undefined,
  distance: number,
  carTime: number,
) {
  const element = elem;
  let startAnimation: number | null = null;
  const state = { id: 0 };

  function step(timestamp: number) {
    if (!startAnimation) startAnimation = timestamp;
    const time = timestamp - startAnimation;
    const passed = Math.round(time * (distance / carTime));

    if (element) element.transform = `translateX(${Math.min(passed, distance)}px)`;
    if (passed < distance) {
      state.id = requestAnimationFrame(step);
    }
  }

  state.id = requestAnimationFrame(step);

  return state;
}

export default animation;
