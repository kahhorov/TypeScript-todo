import * as React from "react";

import { cn } from "../../lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-indigo-500/20 border py-2 px-4 rounded-lg w-full outline-0 focus:outline-indigo-400 focus:outline-3 transition-all duration-150 bg-indigo-500/20 text-indigo-500",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
