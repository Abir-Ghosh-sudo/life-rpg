type SeparatorProps = {
  className?: string;
  orientation?: "horizontal" | "vertical";
};

export function Separator({
  className = "",
  orientation = "horizontal",
}: SeparatorProps) {
  return (
    <div
      className={`ui-separator ui-separator-${orientation} ${className}`}
      role="separator"
      aria-orientation={orientation}
    />
  );
}