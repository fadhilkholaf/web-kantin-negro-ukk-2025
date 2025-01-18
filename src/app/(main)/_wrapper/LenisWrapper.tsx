"use client";

import { ReactNode, useEffect, useRef } from "react";

import ReactLenis, { LenisRef } from "lenis/react";
import { cancelFrame, frame } from "motion/react";

const LenisWrapper = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis options={{ autoRaf: false }} ref={lenisRef} root>
      {children}
    </ReactLenis>
  );
};

export default LenisWrapper;
