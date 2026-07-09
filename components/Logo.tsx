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
      aria-label="NADZ Healthcare — home"
      className={`flex items-center ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={light ? "/assets/logo-nadz-dark.svg" : "/assets/logo-nadz.svg"}
        alt="NADZ Healthcare"
        className="h-11 w-auto sm:h-12"
      />
    </Link>
  );
}
