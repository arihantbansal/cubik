'use client';

import { useMediaQuery } from '@/utils/chakra';
import Spline from '@splinetool/react-spline';

export default function SplineAsset() {
  const [isSmallerThan800] = useMediaQuery('(max-width: 800px)', {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });

  return isSmallerThan800 ? (
    <Spline scene="https://prod.spline.design/lTGvo2EflOHml1Wi/scene.splinecode" />
  ) : (
    <Spline scene="https://prod.spline.design/8XzHj4lBAJA2mngS/scene.splinecode" />
  );
}
