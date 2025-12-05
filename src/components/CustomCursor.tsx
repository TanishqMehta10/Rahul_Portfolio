import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const hoverable = target.closest('a, button, input, textarea, label, .cursor-hover');
      // If hovering an interactive element, immediately set ring to mouse position
      if (hoverable && ringRef.current) {
        ringRef.current.style.left = `${mouse.current.x}px`;
        ringRef.current.style.top = `${mouse.current.y}px`;
      }
      if (hoverable) {
        isHovering.current = true;
        if (ringRef.current) ringRef.current.classList.add('cursor-hovering');
      } else {
        isHovering.current = false;
        if (ringRef.current) ringRef.current.classList.remove('cursor-hovering');
      }
    };

    const onLeave = () => {
      mouse.current.x = -100;
      mouse.current.y = -100;
      if (dotRef.current) {
        dotRef.current.style.left = `-100px`;
        dotRef.current.style.top = `-100px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `-100px`;
        ringRef.current.style.top = `-100px`;
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseout', onLeave);

    // animation loop for ring (smooth follow)
    const loop = () => {
      // increase lerp factor for tighter following (higher = snappier)
      pos.current.x += (mouse.current.x - pos.current.x) * 0.36;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.36;
      if (ringRef.current) {
        ringRef.current.style.left = `${pos.current.x}px`;
        ringRef.current.style.top = `${pos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    // initialize positions off-screen
    if (dotRef.current) {
      dotRef.current.style.left = `-100px`;
      dotRef.current.style.top = `-100px`;
    }
    if (ringRef.current) {
      ringRef.current.style.left = `-100px`;
      ringRef.current.style.top = `-100px`;
    }

    rafRef.current = requestAnimationFrame(loop);

    // hide on touch devices
    const onTouchStart = () => {
      if (dotRef.current) dotRef.current.style.display = 'none';
      if (ringRef.current) ringRef.current.style.display = 'none';
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onLeave);
      window.removeEventListener('touchstart', onTouchStart);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="custom-cursor-ring" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
}
