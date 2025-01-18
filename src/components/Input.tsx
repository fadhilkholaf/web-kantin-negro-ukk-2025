import { DetailedHTMLProps, InputHTMLAttributes, Ref } from "react";

import { cn } from "@/utils/cn";

const Input = ({
  label,
  className,
  ref,
  ...props
}: {
  label: string;
  className?: string;
  ref?: Ref<HTMLInputElement>;
} & DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.id}>
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <input
        ref={ref}
        {...props}
        className={cn("rounded-lg border p-2", className)}
      />
    </div>
  );
};

export default Input;
