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

    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(canvas);

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

    // Светлая тема — статичная сетка
    const gridSpacing = 60;

    let raf: number;
    let lastTheme: boolean | null = null;

    const draw = () => {
      const light = isLightTheme();

      // Логируем только при изменении темы
      if (lastTheme !== light) {
        console.log("DotsCanvas theme:", light ? "light" : "dark", "grid:", light ? "showing" : "dots");
        lastTheme = light;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (light) {
        // Рисуем тонкую техническую сетку
        ctx.strokeStyle = "rgba(20,184,166,0.25)";
        ctx.lineWidth = 0.8;

        // Вертикальные линии
        for (let x = 0; x <= canvas.width; x += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }

        // Горизонтальные линии
        for (let y = 0; y <= canvas.height; y += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        // Точки на пересечениях
        ctx.fillStyle = "rgba(20,184,166,0.4)";
        for (let x = 0; x <= canvas.width; x += gridSpacing) {
          for (let y = 0; y <= canvas.height; y += gridSpacing) {
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else {
        // Тёмная тема — анимированные точки
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
    draw();

    // Слушаем изменения темы
    const observer = new MutationObserver(() => {
      // Перерисовка произойдет автоматически в следующем кадре
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      observer.disconnect();
    };
  }, [dotCount]);

  return <canvas ref={canvasRef} className={className} style={style} />;
}
