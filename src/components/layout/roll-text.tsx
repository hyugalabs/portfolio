import { Fragment, type ReactNode } from "react";

/* Each character sits above a text-shadow copy of itself; when the nearest
   `group` is hovered or focused the real one slides up and the copy slides
   into place, staggered per character. Words stay whole so long labels wrap;
   `after` is glued to the last word so it never strands on its own line. */
export function RollText({ text, after }: { text: string; after?: ReactNode }) {
  let n = 0;
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, w) => (
          <Fragment key={w}>
            {w > 0 && " "}
            <span className="relative inline-block overflow-x-visible overflow-y-clip whitespace-nowrap align-bottom leading-[1.08]">
              {[...word].map((char) => {
                const i = n++;
                return (
                  <span
                    key={i}
                    className="relative inline-block transition-transform duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] group-hover:-translate-y-[1.2em] group-focus-visible:-translate-y-[1.2em] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-visible:translate-y-0"
                    style={{ textShadow: "0 1.2em var(--color-coral)", transitionDelay: `${i * 0.015}s` }}
                  >
                    {char}
                  </span>
                );
              })}
              {w === words.length - 1 && after}
            </span>
          </Fragment>
        ))}
      </span>
    </>
  );
}
