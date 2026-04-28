"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, ChevronDown } from "lucide-react";
import { useRef } from "react";
import FloatingCode from "../ui/FloatingCode";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

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
      className="relative min-h-screen flex items-start sm:items-center overflow-hidden pt-20 sm:pt-20"
    >
      {/* ── Фон ── */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_50%,rgba(20,184,166,0.08),transparent)]" />

      {/* ── Плавающие блоки кода (только Hero) ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <FloatingCode />
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
            <span>187-ФЗ</span>
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
