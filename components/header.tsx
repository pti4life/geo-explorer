import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="flex h-16 w-full  items-center bg-background shadow-md">
      <div className="container flex items-center justify-between">
        <span className="text-base font-extrabold md:text-xl">
          Where in the world?
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}
