import Link from "next/link";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`dark:text-primary dark:hover:text-foreground text-foreground hover:text-primary text-2xl font-bold transition-colors ${className}`}
    >
      얼마
    </Link>
  );
}
