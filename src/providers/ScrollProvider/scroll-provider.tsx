import React, { useState, useLayoutEffect } from 'react';

export const ScrollContext = React.createContext({
  x: 0,
  y: 0,
});

interface Properties {
  element: HTMLElement;
  timeout?: number;
}

export const ScrollContextProvider: React.FC<Properties> = (props) => {
  const getScroll = (element: HTMLElement): { x: number; y: number } => {
    const pos = element.getBoundingClientRect();
    return { x: pos.left, y: pos.top };
  };

  const [pos, setPos] = useState(getScroll(props.element));
  let throttle: ReturnType<typeof setTimeout> = null;

  const callback = (): void => {
    setPos(getScroll(props.element));
    throttle = null;
  };

  useLayoutEffect(() => {
    const handleScroll = (): void => {
      if (props.timeout) {
        if (throttle == null) {
          throttle = setTimeout(callback, props.timeout);
        }
      } else {
        callback();
      }
    };

    document.body.addEventListener('scroll', handleScroll);

    return (): void => document.body.removeEventListener('scroll', handleScroll);
  }, [pos]);

  return <ScrollContext.Provider value={pos}>{props.children}</ScrollContext.Provider>;
};
