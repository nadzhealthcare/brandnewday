import Link from "next/link";

export default function Logo({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="NADZ Healthcare, home"
      className={`flex items-center ${className}`}
    >
      {/* The navbar is glass over the hero on desktop but solid white on
          mobile, so in the light state each breakpoint needs a different mark.
          Rendering both and swapping with a media query keeps this off the JS,
          which would otherwise need a viewport check and flash on hydration. */}
      {light ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-nadz.svg"
            alt="NADZ Healthcare"
            className="h-11 w-auto sm:h-12 lg:hidden"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-nadz-dark.svg"
            alt=""
            aria-hidden="true"
            className="hidden h-11 w-auto sm:h-12 lg:block"
          />
        </>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src="/assets/logo-nadz.svg"
          alt="NADZ Healthcare"
          className="h-11 w-auto sm:h-12"
        />
      )}
    </Link>
  );
}
