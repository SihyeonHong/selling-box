import Link from "next/link";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`text-foreground hover:text-primary text-2xl font-bold transition-colors ${className}`}
    >
      얼마
    </Link>
  );
}
