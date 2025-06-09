
"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxComponentProps extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  id: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const CheckboxComponent = ({ id, checked, onCheckedChange, className, ...props }: CheckboxComponentProps) => {
  return (
    <CheckboxPrimitive.Root
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        "size-[20px] border border-gray-300 rounded-[4px] flex items-center justify-center transition-colors data-[state=checked]:bg-black data-[state=checked]:border-black focus:outline-none",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <CheckIcon className="w-[14px] h-[14px] text-white" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};

export default CheckboxComponent;
