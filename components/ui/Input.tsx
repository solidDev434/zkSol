"use client";

import * as React from "react"

import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  error?: string;
}

function Input({ className, type, error, ...props }: InputProps) {

  return (
    <div
      role="group"
      className="form-group"
    >
      <div className="relative">
        <input
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:text-primary-foreground border-grey-300/45 flex h-10 sm:h-12  w-full min-w-0 rounded-[6px] border bg-grey-100 p-4 text-sm sm:text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
            "focus-visible:ring-yellow-300/20 focus-visible:border-yellow-300/60 focus-visible:ring-1",
            "aria-invalid:ring-destructive/20 aria-invalid:border-destructive aria-invalid:shadow-lg aria-invalid:shadow-destructive-shadow",
            className
          )}
          {...props}
        />

      </div>

      {/* Error */}
      {error && (
        <span className="text-sm font-inter text-destructive-light">{error}</span>
      )}
    </div>
  )
}

export { Input }
