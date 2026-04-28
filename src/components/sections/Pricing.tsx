"use client";

import { Check } from "lucide-react";
import { pricingTiers } from "../../content/pricing";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import ScrollReveal from "../ui/ScrollReveal";

interface PricingProps {
  onOpenDownload: () => void;
  onOpenDemo: () => void;
}

export default function Pricing({ onOpenDownload, onOpenDemo }: PricingProps) {
  const handleAction = (action: string) => {
    if (action === "download") onOpenDownload();
    else onOpenDemo();
  };

  return (
    <section id="pricing" className="py-24 md:py-36 bg-bg-secondary/50">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-manrope)] tracking-[-0.02em]">
              Подберите свой Геркулес
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              Решения для разработчиков, команд и предприятий
            </p>
          </div>
        </ScrollReveal>

        {/* мобильный горизонтальный скролл */}
        <div className="lg:hidden flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6 scrollbar-none">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex-none w-[82vw] max-w-sm flex flex-col p-7 rounded-2xl border snap-start transition-all duration-300 ${
                tier.highlighted
                  ? "bg-bg-tertiary border-teal-primary/40 shadow-[0_0_40px_rgba(20,184,166,0.12)]"
                  : "bg-bg-secondary border-border"
              }`}
            >
              <div className="mb-5">
                {tier.badge && (
                  <div className="mb-3">
                    <Badge variant={tier.highlighted ? "highlight" : "default"}>
                      {tier.badge}
                    </Badge>
                  </div>
                )}
                <h3 className="text-xl font-bold font-[family-name:var(--font-manrope)] text-text-primary">{tier.name}</h3>
                <p className="mt-1 text-sm text-text-secondary">{tier.subtitle}</p>
              </div>
              <div className="mb-5">
                <span className="text-3xl font-extrabold font-[family-name:var(--font-manrope)] text-text-primary">{tier.price}</span>
                <p className="text-sm text-text-muted mt-1">{tier.priceNote}</p>
              </div>
              <p className="text-sm text-text-secondary italic mb-5 pb-5 border-b border-border leading-relaxed">{tier.pain}</p>
              <ul className="space-y-3 mb-6 flex-1">
                {tier.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <Check size={16} className="text-success mt-0.5 shrink-0" />
                    <span className="text-sm text-text-secondary">{feat}</span>
                  </li>
                ))}
              </ul>
              <Button variant={tier.highlighted ? "primary" : "secondary"} size="md" className="w-full" onClick={() => handleAction(tier.ctaAction)}>
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* десктоп grid */}
        <div className="hidden lg:grid grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier, i) => (
            <ScrollReveal key={tier.id} delay={i * 0.15}>
              <div
                className={`relative h-full flex flex-col p-8 rounded-2xl border transition-all duration-300 ${
                  tier.highlighted
                    ? "bg-bg-tertiary border-teal-primary/40 shadow-[0_0_60px_rgba(20,184,166,0.1)]"
                    : "bg-bg-secondary border-border hover:border-teal-primary/20"
                }`}
              >
                <div className="mb-6">
                  {tier.badge && (
                    <div className="mb-3">
                      <Badge variant={tier.highlighted ? "highlight" : "default"}>
                        {tier.badge}
                      </Badge>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold font-[family-name:var(--font-manrope)] text-text-primary">
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary">{tier.subtitle}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold font-[family-name:var(--font-manrope)] text-text-primary">
                      {tier.price}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted mt-1">{tier.priceNote}</p>
                </div>

                <p className="text-sm text-text-secondary italic mb-6 pb-6 border-b border-border leading-relaxed">
                  {tier.pain}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <Check size={18} className="text-success mt-0.5 shrink-0" />
                      <span className="text-sm text-text-secondary">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.highlighted ? "primary" : "secondary"}
                  size="lg"
                  className="w-full"
                  onClick={() => handleAction(tier.ctaAction)}
                >
                  {tier.cta}
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
