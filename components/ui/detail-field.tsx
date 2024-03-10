import { cn } from "@/lib/utils";
import * as React from "react";

const Dl = React.forwardRef<
  HTMLDListElement,
  React.HTMLAttributes<HTMLDListElement>
>(({ className, ...props }, ref) => (
  <dl ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
));

Dl.displayName = "Dl";

const Dt = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <dt
      ref={ref}
      className={cn("mr-2 inline-block font-bold", className)}
      {...props}
    />
  ),
);

Dt.displayName = "Dt";

const Dd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <dd ref={ref} className={cn("inline", className)} {...props} />
  ),
);

Dd.displayName = "Dd";

const DContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));

DContainer.displayName = "DContainer";

export { DContainer, Dd, Dl, Dt };
