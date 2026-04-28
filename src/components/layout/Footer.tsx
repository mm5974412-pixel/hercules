"use client";
import { useState } from "react";
import { Shield, ChevronDown } from "lucide-react";

const footerLinks = {
  product: {
    title: "Продукт",
    links: [
      { label: "Возможности", href: "#features" },
      { label: "Тарифы", href: "#pricing" },
      { label: "Как работает", href: "#how-it-works" },
      { label: "Дорожная карта", href: "#" },
    ],
  },
  resources: {
    title: "Ресурсы",
    links: [
      { label: "Документация", href: "#" },
      { label: "Блог", href: "#" },
      { label: "Telegram-чат", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
  company: {
    title: "Компания",
    links: [
      { label: "О нас", href: "#" },
      { label: "Контакты", href: "#" },
      { label: "Карьера", href: "#" },
    ],
  },
  legal: {
    title: "Юр. документы",
    links: [
      { label: "Политика конфиденциальности", href: "#" },
      { label: "Оферта", href: "#" },
      { label: "Согласие на обработку ПДн", href: "#" },
    ],
  },
};

function FooterAccordion({ group }: { group: { title: string; links: { label: string; href: string }[] } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border md:border-none">
      <button
        className="w-full flex items-center justify-between py-4 md:py-0 md:cursor-default text-sm font-semibold text-text-primary uppercase tracking-wider md:mb-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {group.title}
        <ChevronDown
          size={16}
          className={`md:hidden text-text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <ul className={`space-y-3 overflow-hidden transition-all duration-300 md:block ${open ? "max-h-48 pb-4" : "max-h-0 md:max-h-none"}`}>
        {group.links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="text-sm text-text-muted hover:text-teal-primary transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-12 md:py-16">

        {/* Лого + соцсети */}
        <div className="flex items-center justify-between mb-8 md:mb-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-primary/10 border border-teal-primary/30 flex items-center justify-center">
              <Shield size={18} className="text-teal-primary" />
            </div>
            <span className="text-lg font-bold font-[family-name:var(--font-manrope)] text-text-primary">
              Геркулес
            </span>
          </div>
          <div className="flex gap-2 md:hidden">
            {["TG", "GH", "VK"].map((social) => (
              <a
                key={social}
                href="#"
                className="w-9 h-9 rounded-lg bg-bg-tertiary border border-border flex items-center justify-center text-text-muted hover:text-teal-primary hover:border-teal-primary/30 transition-all text-xs font-medium"
                aria-label={social}
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        {/* Мобиль: accordion / Десктоп: grid */}
        <div className="md:grid md:grid-cols-5 md:gap-12 md:mt-12">
          {/* Описание (только десктоп) */}
          <div className="hidden md:block md:col-span-1">
            <p className="text-sm text-text-muted mb-4 leading-relaxed">
              Российская DevSecOps-платформа. Безопасность кода на автопилоте.
            </p>
            <div className="flex gap-3">
              {["Telegram", "GitHub", "VK"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-bg-tertiary border border-border flex items-center justify-center text-text-muted hover:text-teal-primary hover:border-teal-primary/30 transition-all text-xs font-medium"
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 md:grid md:grid-cols-4 md:gap-8">
            {Object.values(footerLinks).map((group) => (
              <FooterAccordion key={group.title} group={group} />
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-text-muted">© 2026 Геркулес. Все права защищены.</p>
          <div className="flex items-center gap-3 text-xs font-[family-name:var(--font-jetbrains-mono)] text-text-muted">
            <span>152-ФЗ</span>
            <span className="text-border">•</span>
            <span>ГОСТ</span>
            <span className="text-border">•</span>
            <span>OWASP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
