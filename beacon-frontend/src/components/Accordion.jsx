import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

export function Accordion({ children, className }) {
  return <div className={cn("space-y-2 w-full", className)}>{children}</div>;
}

export function AccordionItem({ title, children, className }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("border border-neutral-200 rounded-lg overflow-hidden dark:border-neutral-700", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 text-left font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 transition-colors duration-200"
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-neutral-500 transition-transform duration-200",
            isOpen && "transform rotate-180"
          )}
        />
      </button>
      
      <div
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="p-4 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}