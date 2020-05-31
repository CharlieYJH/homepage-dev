import React, { useState, useEffect } from 'react';

export const WindowSizeContext = React.createContext({
  width: 0,
  height: 0,
});

export const WindowSizeContextProvider: React.FC<{}> = (props) => {
  const getSize = (): { width: number; height: number } => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [size, setSize] = useState(getSize());

  useEffect(() => {
    const handleResize = (): void => {
      setSize(getSize());
    };
    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, [size]);

  return (
    <WindowSizeContext.Provider value={size}>{props.children}</WindowSizeContext.Provider>
  );
};
