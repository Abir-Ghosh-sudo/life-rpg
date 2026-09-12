import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant =
  | "primary"
  | "reward"
  | "success"
  | "danger"
  | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const variantClass = {
    primary: "ui-button-primary",
    reward: "ui-button-reward",
    success: "ui-button-success",
    danger: "ui-button-danger",
    outline: "ui-button-outline",
  }[variant];

  return (
    <button
      type={type}
      className={`ui-button ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}