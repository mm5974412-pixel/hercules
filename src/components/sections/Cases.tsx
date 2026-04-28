"use client";

import { cases } from "../../content/cases";
import DynamicIcon from "../ui/DynamicIcon";
import AnimatedCounter from "../ui/AnimatedCounter";
import ScrollReveal from "../ui/ScrollReveal";
import { Quote } from "lucide-react";

export default function Cases() {
  return (
    <section id="cases" className="py-24 md:py-36 bg-bg-secondary/50">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-manrope)] tracking-[-0.02em]">
              Кому уже помог Геркулес
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              Реальные истории команд, которые перестали бояться релизов
            </p>
          </div>
        </ScrollReveal>

        {/* мобиль: горизонтальный скролл */}
        <div className="lg:hidden flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6 scrollbar-none">
          {cases.map((caseItem) => (
            <div
              key={caseItem.id}
              className="flex-none w-[82vw] max-w-sm flex flex-col p-6 rounded-2xl bg-bg-secondary border border-border snap-start"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-primary/10 border border-teal-primary/20 flex items-center justify-center text-teal-primary">
                  <DynamicIcon name={caseItem.icon} size={20} />
                </div>
                <div>
                  <span className="text-sm font-semibold text-text-primary">{caseItem.industry}</span>
                  <p className="text-xs text-text-muted">{caseItem.teamSize}</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">{caseItem.problem}</p>
              <div className="grid grid-cols-2 gap-3 mb-5 pb-5 border-b border-border">
                {caseItem.stats.map((stat) => (
                  <div key={stat.label} className="text-center p-3 rounded-xl bg-bg-tertiary/50">
                    <div className="text-xl font-extrabold font-[family-name:var(--font-manrope)] text-teal-primary">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-xs text-text-muted mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex-1 flex flex-col justify-end">
                <Quote size={14} className="text-teal-primary/30 mb-2" />
                <p className="text-sm text-text-secondary italic leading-relaxed">«{caseItem.quote}»</p>
                <p className="mt-2 text-xs text-text-muted">— {caseItem.author}, {caseItem.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* десктоп grid */}
        <div className="hidden lg:grid grid-cols-3 gap-6 lg:gap-8">
          {cases.map((caseItem, i) => (
            <ScrollReveal key={caseItem.id} delay={i * 0.15}>
              <div className="h-full flex flex-col p-8 rounded-2xl bg-bg-secondary border border-border hover:border-teal-primary/20 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(20,184,166,0.05)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-primary/10 border border-teal-primary/20 flex items-center justify-center text-teal-primary">
                    <DynamicIcon name={caseItem.icon} size={20} />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-text-primary">
                      {caseItem.industry}
                    </span>
                    <p className="text-xs text-text-muted">{caseItem.teamSize}</p>
                  </div>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  {caseItem.problem}
                </p>

                <div className="grid grid-cols-1 gap-4 mb-6 pb-6 border-b border-border">
                  {caseItem.stats.map((stat) => (
                    <div key={stat.label} className="text-center p-3 rounded-xl bg-bg-tertiary/50">
                      <div className="text-2xl font-extrabold font-[family-name:var(--font-manrope)] text-teal-primary">
                        <AnimatedCounter
                          target={stat.value}
                          suffix={stat.suffix}
                        />
                      </div>
                      <p className="text-xs text-text-muted mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex-1 flex flex-col justify-end">
                  <div className="relative">
                    <Quote size={16} className="text-teal-primary/30 mb-2" />
                    <p className="text-sm text-text-secondary italic leading-relaxed">
                      «{caseItem.quote}»
                    </p>
                    <p className="mt-3 text-xs text-text-muted">
                      — {caseItem.author}, {caseItem.role}
                    </p>
                  </div>
                </div>

                <button className="mt-6 text-sm text-teal-primary hover:text-teal-light transition-colors font-medium text-left">
                  Читать кейс целиком →
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
