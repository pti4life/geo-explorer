import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="bg-background h-16 shadow-md  w-full flex items-center">
      <div className="container flex items-center justify-between">
        <span className="text-base md:text-xl font-extrabold">
          Where in the world?
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}
