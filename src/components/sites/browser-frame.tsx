import Image from "next/image";

/* A client site's screenshot in a browser frame showing its real domain.
   Hover/focus styling comes from the caller through `className` and the nearest `group`. */
export function BrowserFrame({
  name,
  image,
  domain,
  sizes,
  preload,
  className = "",
}: {
  name: string;
  image: string;
  domain: string;
  sizes: string;
  preload?: boolean;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-offwhite/[0.04] ring-1 ring-offwhite/10 ${className}`}>
      <div className="flex h-9 items-center gap-3 border-b border-offwhite/10 px-4">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-offwhite/15" />
          <span className="size-2.5 rounded-full bg-offwhite/15" />
          <span className="size-2.5 rounded-full bg-offwhite/15" />
        </span>
        <span className="mx-auto truncate rounded-md bg-offwhite/[0.06] px-3 py-0.5 text-xs text-offwhite/55">
          {domain}
        </span>
        <span className="w-[42px]" aria-hidden="true" />
      </div>
      <div className="relative aspect-8/5 overflow-hidden">
        <Image
          src={image}
          alt={`Homepage of ${name}`}
          fill
          preload={preload}
          sizes={sizes}
          className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
      </div>
    </div>
  );
}
