type SkeletonProps = {
  className?: string;
};

export function Skeleton({
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={`ui-skeleton ${className}`}
      aria-hidden="true"
    />
  );
}