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
  ref,
  ...props
}: {
  label: string;
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
      {...props}
      className={cn(
        "w-full rounded-full border border-primary px-2 py-1 text-center font-italiana font-bold tracking-wider text-primary hover:bg-neutral/10",
        props.className,
      )}
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
        "block w-full rounded-full border border-primary px-2 py-1 text-center font-italiana font-bold tracking-wider text-primary hover:bg-neutral/10",
        className,
      )}
    >
      {children}
    </Link>
  );
};
