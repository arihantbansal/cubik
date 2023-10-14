import { useEffect, useState } from "react";

export function usePreloadedImage(src: string | null): string | null {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (src) {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        setLoadedSrc(src);
      };
    } else {
      setLoadedSrc(null);
    }
  }, [src]);

  return loadedSrc;
}

export default usePreloadedImage;
