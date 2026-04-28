"use client";

import React, { useRef, useEffect } from "react";

interface DotsCanvasProps {
  className?: string;
  style?: React.CSSProperties;
  dotCount?: number;
}

export default function DotsCanvas({ className, style, dotCount = 200 }: DotsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
    let lastW = 0;
    let lastH = 0;
    const URL_BAR_TOLERANCE = 200;
    const applySize = () => {
      const newW = canvas.offsetWidth;
      const newH = canvas.offsetHeight;
      canvas.width = newW;
      canvas.height = newH;
      lastW = newW;
      lastH = newH;
    };
    const setSize = (force = false) => {
      const newW = canvas.offsetWidth;
      const newH = canvas.offsetHeight;
      if (!force && newW === lastW && Math.abs(newH - lastH) < URL_BAR_TOLERANCE) {
        return;
      }
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        applySize();
        resizeTimeout = null;
      }, 200);
    };
    applySize();
    const ro = new ResizeObserver(() => setSize());
    ro.observe(canvas);
    const onOrientation = () => setSize(true);
    window.addEventListener("orientationchange", onOrientation);

    const isLightTheme = () => document.documentElement.classList.contains("light");

    // Тёмная тема — анимированные точки
    type Dot = {
      x: number; y: number; r: number;
      alpha: number; aDir: number;
      dx: number; dy: number;
      isTeal: boolean;
    };

    let dots: Dot[] = [];
    const initDots = () => {
      dots = Array.from({ length: dotCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.45 + 0.1,
        aDir: Math.random() > 0.5 ? 1 : -1,
        dx: (Math.random() - 0.5) * 0.07,
        dy: -(Math.random() * 0.1 + 0.03),
        isTeal: Math.random() > 0.7,
      }));
    };
    initDots();

    // Светлая тема — анимированные волны
    let waveOffset = 0;
    let lastTime = 0;
    // Определяем тач-устройство для агрессивной оптимизации
    const isTouchDevice = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;
    const waveSpeed = isTouchDevice ? 0.025 : 0.012;

    let raf: number;

    const draw = (timestamp: number) => {
      const light = isLightTheme();

      // Ограничиваем частоту кадров
      if (timestamp - lastTime < frameInterval) {
        raf = requestAnimationFrame(draw);
        return;
      }
      lastTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (light) {
        // Рисуем плавные градиентные волны
        waveOffset += waveSpeed;

        // Кэшируем ширину для оптимизации
        const w = canvas.width;
        const h = canvas.height;

        // Первая волна (задняя, более прозрачная)
        ctx.fillStyle = "rgba(20,184,166,0.03)";
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 30) {
          const y = Math.sin((x * 0.003) + waveOffset) * 60 + Math.sin((x * 0.007) + waveOffset * 1.5) * 30;
          ctx.lineTo(x, h * 0.4 + y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();

        // Вторая волна (средняя)
        ctx.fillStyle = "rgba(20,184,166,0.05)";
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 30) {
          const y = Math.sin((x * 0.004) + waveOffset * 1.2 + 2) * 50 + Math.sin((x * 0.006) + waveOffset * 0.8) * 25;
          ctx.lineTo(x, h * 0.5 + y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();

        // Третья волна (передняя)
        ctx.fillStyle = "rgba(20,184,166,0.02)";
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 30) {
          const y = Math.sin((x * 0.005) + waveOffset * 0.7 + 4) * 40 + Math.sin((x * 0.008) + waveOffset * 1.3) * 20;
          ctx.lineTo(x, h * 0.65 + y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();
      } else {
        // Тёмная тема — анимированные точки (тоже с ограничением)
        dots.forEach((d) => {
          d.alpha += d.aDir * 0.003;
          if (d.alpha > 0.7 || d.alpha < 0.08) d.aDir *= -1;
          d.x += d.dx;
          d.y += d.dy;
          if (d.y < -2) d.y = canvas.height + 2;
          if (d.x < -2) d.x = canvas.width + 2;
          if (d.x > canvas.width + 2) d.x = -2;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          ctx.fillStyle = d.isTeal
            ? `rgba(45,212,191,${d.alpha})`
            : `rgba(210,240,240,${d.alpha * 0.75})`;
          ctx.fill();
        });
      }

      raf = requestAnimationFrame(draw);
    };
    draw(0);

    // Слушаем изменения темы
    const observer = new MutationObserver(() => {
      // Перерисовка произойдет автоматически в следующем кадре
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      observer.disconnect();
      window.removeEventListener("orientationchange", onOrientation);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, [dotCount]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        ...style,
        willChange: "transform",
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
        contain: "paint",
      }}
    />
  );
}
