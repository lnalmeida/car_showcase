"use client";

import * as React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import { cn } from "@/lib/utils"; // ajuste esse import se necessário

export const Switch = React.forwardRef(({ className, ...props }, ref) => (
  <RadixSwitch.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-4 w-8 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-muted ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gray-300",
      className
    )}
    {...props}
  >
    <RadixSwitch.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-gray-700 shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </RadixSwitch.Root>
));

Switch.displayName = "Switch";
