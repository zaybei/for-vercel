'use client';
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function LottiePlayer({ src, style }: { src: string; style: React.CSSProperties }) {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        const response = await fetch(src);
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error('Error loading Lottie animation:', error);
      }
    };

    fetchAnimation();
  }, [src]);

  if (!animationData) return null;

  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={style}
    />
  );
}
