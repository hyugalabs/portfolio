"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const TimeZoneGlobe = dynamic(() => import("./time-zone-globe"), { ssr: false });

const timeFormat = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });

// Rendered only after mount: the server can't know the visitor's clock.
function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="mx-auto min-h-10 max-w-xs text-balance text-sm leading-5 text-offwhite/70 sm:min-h-5 sm:max-w-none">
      {now && (
        <>
          <span aria-hidden className="mr-2 inline-block size-1.5 rounded-full bg-coral align-middle" />
          It&rsquo;s <time className="tabular-nums text-offwhite">{timeFormat.format(now)}</time> where you are.
          We work with you from anywhere.
        </>
      )}
    </p>
  );
}

/** The upper hemisphere of the globe, rising from the bottom of the hero. */
export function GlobeHorizon() {
  return (
    <div className="relative">
      <LocalTime />
      <div className="relative left-1/2 mt-8 h-[75vw] w-screen -translate-x-1/2 max-h-[34rem] sm:h-[60vw] overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
        <div className="absolute left-1/2 top-0 w-[150vw] max-w-[68rem] sm:w-[120vw] -translate-x-1/2">
          <TimeZoneGlobe />
        </div>
      </div>
    </div>
  );
}
