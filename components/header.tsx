import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="flex h-16 w-full  items-center bg-background shadow-md">
      <div className="container flex items-center justify-between">
        <Link href="/" className="p-2 text-base font-extrabold md:text-xl">
          Where in the world?
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
