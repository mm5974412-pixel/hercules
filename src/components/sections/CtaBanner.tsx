"use client";

import Button from "../ui/Button";
import ScrollReveal from "../ui/ScrollReveal";

interface CtaBannerProps {
  onOpenDownload: () => void;
  onOpenDemo: () => void;
}

export default function CtaBanner({ onOpenDownload, onOpenDemo }: CtaBannerProps) {
  return (
    <section className="py-24 md:py-36">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-bg-secondary" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(20,184,166,0.15),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(20,184,166,0.1),transparent_60%)]" />
            <div className="absolute inset-0 border border-teal-primary/10 rounded-3xl" />

            <div className="relative z-10 py-12 md:py-24 px-6 sm:px-10 md:px-16 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-manrope)] tracking-[-0.02em]">
                Попробуйте Геркулес сегодня
              </h2>
              <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
                Community-версия — бесплатно навсегда. Демо Pro/Enterprise — за 30 минут с инженером.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button variant="primary" size="lg" className="w-full sm:w-auto" onClick={onOpenDownload}>
                  Скачать Community
                </Button>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto" onClick={onOpenDemo}>
                  Запросить демо
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
