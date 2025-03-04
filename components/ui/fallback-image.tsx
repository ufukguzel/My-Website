"use client";

import { useState } from "react";
import Image, { ImageProps as NextImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface FallbackImageProps extends Omit<NextImageProps, "src"> {
  src: string;
  fallbackSrc?: string;
}

export function FallbackImage({
  src,
  alt = "",
  className,
  fallbackSrc = "https://source.unsplash.com/random/800x600?technology",
  fill,
  ...props
}: FallbackImageProps) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      onError={() => setImageSrc(fallbackSrc)}
      className={cn(
        "transition-all duration-200",
        fill && "absolute inset-0 h-full w-full",
        className
      )}
      fill={fill}
      {...props}
    />
  );
}
