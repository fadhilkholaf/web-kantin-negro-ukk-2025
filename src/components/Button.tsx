"use client";

import Link from "next/link";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
  Ref,
} from "react";
import { useFormStatus } from "react-dom";

import { cn } from "@/utils/cn";

export const SubmitButton = ({
  label,
  className,
  ref,
  ...props
}: {
  label: string;
  className?: string;
  ref?: Ref<HTMLButtonElement>;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  const { pending } = useFormStatus();

  return (
    <button
      ref={ref}
      type={props.type ?? "submit"}
      disabled={props.disabled ?? pending}
      className={cn(
        "w-full rounded-lg border p-2 text-center hover:bg-gray-200",
        className,
      )}
      {...props}
    >
      {label}
    </button>
  );
};

export const LinkButton = ({
  href,
  children,
  className,
  ref,
  ...props
}: {
  href: string;
  children?: ReactNode;
  className?: string;
  ref?: Ref<HTMLAnchorElement>;
} & DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => {
  return (
    <Link
      ref={ref}
      href={href}
      {...props}
      className={cn(
        "block w-full rounded-lg border p-2 text-center hover:bg-gray-200",
        className,
      )}
    >
      {children}
    </Link>
  );
};
