import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
};

export function Textarea({
  className = "",
  ...props
}: TextareaProps) {
  return (
    <textarea
      className={`ui-textarea ${className}`}
      {...props}
    />
  );
}