"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, ChevronDown } from "lucide-react";
import { useRef, useEffect } from "react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

const CODE_SNIPPETS = [
  { code: `def scan_repo():\n  vulns = check_nvd()\n  return report(vulns)` },
  { code: `const audit = async () => {\n  await sast.run()\n  return findings\n}` },
  { code: `SELECT * FROM vulns\nWHERE severity='HIGH'\nAND status='open'` },
  { code: `if (token.expired) {\n  throw new AuthError(403)\n}` },
  { code: `result = analyzer\n  .scan(repo)\n  .filter(HIGH)` },
  { code: `npm audit --json\n| jq '.vulnerabilities'` },
  { code: `helmet.csp({ directives:\n  { defaultSrc: ["'self'"] }\n})` },
];

const FLOAT_POSITIONS = [
  { right: "4%",  top: "8%",  delay: 0,   floatY: 12, duration: 9,  opacity: 0.7 },
  { right: "22%", top: "18%", delay: 1.5, floatY: 10, duration: 11, opacity: 0.55 },
  { right: "6%",  top: "42%", delay: 2.8, floatY: 8,  duration: 10, opacity: 0.65 },
  { right: "26%", top: "58%", delay: 0.7, floatY: 14, duration: 8,  opacity: 0.5 },
  { right: "12%", top: "72%", delay: 2.0, floatY: 10, duration: 12, opacity: 0.6 },
  { right: "30%", top: "35%", delay: 1.2, floatY: 9,  duration: 10, opacity: 0.45 },
  { right: "18%", top: "82%", delay: 3.4, floatY: 11, duration: 9,  opacity: 0.5 },
];

function DotsCanvas() {
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

    type Dot = { x: number; y: number; r: number; alpha: number; aDir: number; dx: number; dy: number; isTeal: boolean };
    const N = 160;
    let dots: Dot[] = [];
    const init = () => {
      dots = Array.from({ length: N }, () => ({
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
    init();

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

interface HeroProps {
  onOpenDownload: () => void;
  onOpenDemo: () => void;
}

export default function Hero({ onOpenDownload, onOpenDemo }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* ── Фон ── */}
      <div className="absolute inset-0 z-0 bg-bg-primary" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_50%,rgba(20,184,166,0.08),transparent)]" />

      {/* ── Анимированные точки ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <DotsCanvas />
      </div>

      {/* ── Плавающие блоки кода ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {CODE_SNIPPETS.map((item, i) => {
          const pos = FLOAT_POSITIONS[i];
          return (
            <motion.div
              key={i}
              className="absolute hidden sm:block"
              style={{ right: pos.right, top: pos.top }}
              initial={{ opacity: 0 }}
              animate={{ opacity: pos.opacity }}
              transition={{ duration: 1.5, delay: pos.delay }}
            >
              <motion.div
                animate={{ y: [0, -pos.floatY, 0] }}
                transition={{
                  duration: pos.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: pos.delay,
                }}
                className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] leading-relaxed text-teal-primary bg-bg-secondary/40 backdrop-blur-sm border border-teal-primary/20 rounded-lg px-3 py-2.5 max-w-[210px]"
              >
                <pre className="whitespace-pre">{item.code}</pre>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Левый градиент — текст всегда читается ── */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-bg-primary via-bg-primary/85 to-transparent" />
      {/* нижний переход — перекрывает край Hero */}
      <div className="absolute bottom-0 left-0 right-0 h-64 z-[2] bg-gradient-to-t from-bg-primary via-bg-primary/90 to-transparent" />
      {/* верхний переход */}
      <div className="absolute top-0 left-0 right-0 h-24 z-[2] bg-gradient-to-b from-bg-primary/60 to-transparent" />

      {/* ── Мобильный декор: плавающие значки ── */}
      <div className="md:hidden absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -12, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[8%] w-14 h-14 rounded-2xl border border-teal-primary/40 bg-teal-primary/10 flex items-center justify-center backdrop-blur-sm"
        >
          <Shield size={22} className="text-teal-primary" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[32%] right-[20%] w-10 h-10 rounded-xl border border-teal-primary/25 bg-bg-secondary/60 backdrop-blur-sm"
        />
        <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-teal-primary/6 blur-3xl" />
      </div>

      {/* ── Текстовый контент ── */}
      <motion.div
        className="relative z-20 max-w-[1280px] mx-auto px-6 md:px-12 w-full"
        style={{ opacity }}
      >
        <div className="max-w-2xl mx-auto sm:mx-0 text-center sm:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge className="text-sm sm:text-base px-4 py-2">
              <Shield size={15} />
              Российская DevSecOps-платформа
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-4 text-[1.85rem] leading-[1.15] sm:text-[2.4rem] md:text-5xl lg:text-[4.5rem] font-extrabold font-[family-name:var(--font-manrope)] tracking-[-0.02em]"
          >
            Безопасность вашего кода —{" "}
            <span className="text-teal-primary">на автопилоте</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-4 text-base md:text-xl text-text-secondary leading-relaxed max-w-xl mx-auto sm:mx-0"
          >
            Автоматически находим уязвимости в коде, зависимостях и API.
            Защищаем ваши приложения до того, как их найдут хакеры.
            Бесплатная версия — навсегда.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start"
          >
            <Button variant="primary" size="lg" className="w-full sm:w-auto" onClick={onOpenDownload}>
              Скачать бесплатно
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto" onClick={onOpenDemo}>
              Запросить демо
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="mt-4 text-sm text-text-muted"
          >
            
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="mt-6 flex items-center justify-center sm:justify-start flex-wrap gap-x-3 gap-y-1.5 font-[family-name:var(--font-jetbrains-mono)] text-xs text-text-muted"
          >
            <span>152-ФЗ</span>
            <span className="text-border">•</span>
            <span>ГОСТ</span>
            <span className="text-border">•</span>
            <span>OWASP Top 10</span>
            <span className="text-border">•</span>
            <span>CWE Top 25</span>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Стрелка вниз ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={28} className="text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
