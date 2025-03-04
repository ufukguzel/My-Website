'use client';

import { useEffect, useRef } from 'react';

export const OkAsciiArt = () => {
  const hasLogged = useRef(false);

  useEffect(() => {
    if (!hasLogged.current) {
      console.log(`
    U   U  FFFFF  U   U  K   K      GGGG  U   U  ZZZZZ  EEEEE  L
 U   U  F      U   U  K  K      G      U   U      Z  E      L
 U   U  FFFF   U   U  KKK       G  GG  U   U     Z   EEEE   L
 U   U  F      U   U  K  K      G   G  U   U    Z    E      L
  UUU   F       UUU   K   K      GGGG   UUU    ZZZZZ  EEEEE  LLLLL


  Check out my GitHub: https://github.com/ufukguzel 
      `);
      hasLogged.current = true;
    }
  }, []);

  return null;
};
