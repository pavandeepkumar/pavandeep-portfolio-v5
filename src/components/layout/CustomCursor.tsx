import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState<string | null>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Detect touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setTargetPos({ x: e.clientX, y: e.clientY });

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        setLabel(cursorTarget.getAttribute('data-cursor'));
        setIsPointer(true);
      } else {
        const interactive = target.closest('button, a, input, textarea, select, [role="button"]');
        if (interactive) {
          setLabel(null);
          setIsPointer(true);
        } else {
          setLabel(null);
          setIsPointer(false);
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Smooth lerp animation for the outer ring
  useEffect(() => {
    if (isTouchDevice) return;
    let animationFrameId: number;

    const updatePosition = () => {
      setPos((prev) => ({
        x: prev.x + (targetPos.x - prev.x) * 0.2,
        y: prev.y + (targetPos.y - prev.y) * 0.2,
      }));
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetPos, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer tracking ring / pill */}
      <div
        className="fixed transition-transform ease-out will-change-transform"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          left: 0,
          top: 0,
        }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-150 rounded-full border ${
            label
              ? 'bg-cyan-500/20 border-cyan-400 backdrop-blur-xs px-3 py-1 text-[10px] font-mono tracking-wider font-semibold text-cyan-200'
              : isPointer
              ? 'w-9 h-9 bg-white/10 border-white/40'
              : 'w-6 h-6 bg-transparent border-cyan-500/30'
          }`}
        >
          {label && <span>{label}</span>}
        </div>
      </div>

      {/* Tiny direct center dot */}
      <div
        className="fixed w-1.5 h-1.5 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-75"
        style={{
          transform: `translate3d(${targetPos.x}px, ${targetPos.y}px, 0)`,
          left: 0,
          top: 0,
        }}
      />
    </div>
  );
};
