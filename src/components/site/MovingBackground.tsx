import { useEffect, useRef } from "react";

export function MovingBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0, frame = 0;
    const pointer = { x: 0, y: 0 };
    const resize = () => {
      width = window.innerWidth; height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio; canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const move = (e: PointerEvent) => {
      pointer.x = (e.clientX / width - .5) * 35;
      pointer.y = (e.clientY / height - .5) * 25;
    };
    const paint = (time: number) => {
      const tokens = getComputedStyle(canvas);
      ctx.clearRect(0, 0, width, height);
      const t = media.matches ? 0 : time * .00015;
      ["--motion-mint", "--motion-lilac", "--motion-rose"].forEach((token, band) => {
        ctx.strokeStyle = tokens.getPropertyValue(token).trim();
        ctx.lineWidth = 1;
        for (let line = 0; line < 24; line++) {
          ctx.beginPath();
          for (let x = -60; x <= width + 60; x += 16) {
            const y = height * (.18 + band * .3) + line * 12 +
              Math.sin(x / (300 + band * 80) + t + band) * (70 + band * 25) +
              Math.cos(x / 600 - t * .6 + line * .025) * 90 + pointer.y + pointer.x * x / width;
            if (x === -60) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      });
      if (!media.matches) frame = requestAnimationFrame(paint);
    };
    resize(); frame = requestAnimationFrame(paint);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
    };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="moving-background pointer-events-none fixed inset-0 -z-10 h-full w-full" />;
}