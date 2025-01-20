import { DetailedHTMLProps, InputHTMLAttributes, Ref } from "react";

import { cn } from "@/utils/cn";

export const Input = ({
  label,
  ref,
  ...props
}: {
  label: string;
  ref?: Ref<HTMLInputElement>;
} & DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  return (
    <div className="flex flex-col font-mono text-primary">
      <label htmlFor={props.id}>
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <input
        ref={ref}
        {...props}
        className={cn(
          "rounded-full border border-primary px-2 py-1 focus:outline-secondary",
          props.className,
        )}
      />
    </div>
  );
};
