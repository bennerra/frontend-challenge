import { useEffect, useLayoutEffect, useState } from 'react';

import { EScreenSize } from '@/common/e-screen-size';
import * as globals from '@/styles/_variables.module.scss';

const keysGlobals = [
  'screenXS',
  'screenSM',
  'screenMD',
  'screenMXL',
  'screenLG',
  'screenXL',
  'screenXXL',
];

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [screenSize, setScreenSize] = useState('');

  useEffect(() => {
    const handleResize = (event: UIEvent) => {
      const target = event.currentTarget as Window;
      setWidth(target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    const getGlobalsScreenValue = () => {
      return keysGlobals.find((key) => width <= parseInt(globals[key], 10));
    };

    const screen = (getGlobalsScreenValue() || 'screenXXL').split('screen')[1];

    setScreenSize(EScreenSize[screen as keyof typeof EScreenSize]);
  }, [width]);

  return {
    screenSize,
    isScreenXs: width <= parseInt(globals.screenXS, 10),
    isScreenSm: width <= parseInt(globals.screenSM, 10),
    isScreenMd: width <= parseInt(globals.screenMD, 10),
    isScreenMXl: width <= parseInt(globals.screenMXL, 10),
    isScreenLG: width <= parseInt(globals.screenLG, 10),
    isScreenXl: width <= parseInt(globals.screenXL, 10),
    isScreenXXl: width <= parseInt(globals.screenXXL, 10),
  };
};
