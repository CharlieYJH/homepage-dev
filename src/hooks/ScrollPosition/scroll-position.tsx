import React, { useRef, useLayoutEffect } from 'react';

export const useScrollPosition = (
  effect: Function,
  depends?: React.DependencyList,
  element?: HTMLElement,
  timeout?: number
): void => {
  const getScroll = (element: HTMLElement): { x: number; y: number } => {
    const pos = element
      ? element.getBoundingClientRect()
      : document.body.getBoundingClientRect();
    return { x: pos.left, y: pos.top };
  };

  const position = useRef(getScroll(document.body));
  let throttle: ReturnType<typeof setTimeout> = null;

  const callback = (): void => {
    position.current = getScroll(element);
    effect(position.current);
    throttle = null;
  };

  useLayoutEffect(() => {
    const handleScroll = (): void => {
      if (timeout) {
        if (throttle == null) {
          throttle = setTimeout(callback, timeout);
        }
      } else {
        callback();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return (): void => window.removeEventListener('scroll', handleScroll);
  }, depends);
};
