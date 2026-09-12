import type { ImgHTMLAttributes, ReactNode } from "react";

type AvatarProps = {
  src?: string;
  alt?: string;
  fallback?: ReactNode;
  className?: string;
  imageProps?: ImgHTMLAttributes<HTMLImageElement>;
};

export function Avatar({
  src,
  alt = "Avatar",
  fallback,
  className = "",
  imageProps,
}: AvatarProps) {
  return (
    <div className={`ui-avatar ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="ui-avatar-image"
          {...imageProps}
        />
      ) : (
        <span className="ui-avatar-fallback">
          {fallback}
        </span>
      )}
    </div>
  );
}