"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield, Sun, Moon } from "lucide-react";
import Button from "../ui/Button";
import { useTheme } from "../providers/ThemeProvider";

const navLinks = [
  { label: "Возможности", href: "#features" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Как работает", href: "#how-it-works" },
  { label: "Кейсы", href: "#cases" },
  { label: "FAQ", href: "#faq" },
];

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
      className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-text-secondary hover:text-teal-primary hover:border-teal-primary/50 transition-all duration-200 bg-bg-secondary/50"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -30, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </motion.div>
    </button>
  );
}

export default function Header({ onOpenDemo, onOpenDownload }: { onOpenDemo: () => void; onOpenDownload: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-bg-primary/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/10"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group" aria-label="Геркулес — на главную">
          <div className="w-9 h-9 rounded-lg bg-teal-primary/10 border border-teal-primary/30 flex items-center justify-center group-hover:bg-teal-primary/20 transition-colors">
            <Shield size={20} className="text-teal-primary" />
          </div>
          <span className="text-xl font-bold font-[family-name:var(--font-manrope)] tracking-tight text-text-primary">
            Геркулес
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Основная навигация">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-sm text-text-secondary hover:text-teal-primary transition-colors font-medium"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Button variant="ghost" size="sm" onClick={onOpenDemo}>
            Войти
          </Button>
          <Button variant="primary" size="sm" onClick={onOpenDownload}>
            Попробовать бесплатно
          </Button>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="w-10 h-10 rounded-lg border border-border/60 bg-bg-secondary/50 flex items-center justify-center text-text-secondary hover:text-teal-primary hover:border-teal-primary/50 transition-all duration-200"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <motion.div
              key={mobileOpen ? "close" : "open"}
              initial={{ rotate: -15, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.15 }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden overflow-hidden bg-bg-primary/98 backdrop-blur-2xl border-b border-border"
          >
            <nav className="px-6 pt-2 pb-4">
              {navLinks.map((link, i) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="w-full text-left text-base font-medium text-text-secondary hover:text-teal-primary transition-colors py-3.5 border-b border-border/40 last:border-b-0 flex items-center justify-between group"
                >
                  {link.label}
                  <span className="text-text-muted group-hover:text-teal-primary transition-colors text-lg leading-none">›</span>
                </button>
              ))}
            </nav>
            <div className="px-6 pb-6 flex flex-col gap-3">
              <Button variant="secondary" size="md" className="w-full" onClick={() => { setMobileOpen(false); onOpenDemo(); }}>
                Войти
              </Button>
              <Button variant="primary" size="md" className="w-full" onClick={() => { setMobileOpen(false); onOpenDownload(); }}>
                Попробовать бесплатно
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
