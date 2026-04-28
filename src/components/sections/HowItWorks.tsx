"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { steps } from "../../content/steps";
import DynamicIcon from "../ui/DynamicIcon";
import ScrollReveal from "../ui/ScrollReveal";
import CodeHighlight from "../ui/CodeHighlight";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [codeTop, setCodeTop] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  const updateCodePosition = useCallback((index: number) => {
    const stepEl = stepRefs.current[index];
    const containerEl = containerRef.current;
    const codeEl = codeRef.current;
    if (!stepEl || !containerEl) return;
    const containerRect = containerEl.getBoundingClientRect();
    const stepRect = stepEl.getBoundingClientRect();
    const stepMid = stepRect.top - containerRect.top + stepRect.height / 2;
    const codeHeight = codeEl ? codeEl.offsetHeight : 380;
    const offset = Math.max(0, stepMid - codeHeight / 2);
    setCodeTop(offset);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const viewportMid = window.innerHeight * 0.5;
      let closest = 0;
      let closestDist = Infinity;

      for (let i = 0; i < stepRefs.current.length; i++) {
        const el = stepRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const elMid = rect.top + rect.height / 2;
        const dist = Math.abs(elMid - viewportMid);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      }

      if (closest !== activeStep) {
        setActiveStep(closest);
      }
      updateCodePosition(closest);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeStep, updateCodePosition]);

  return (
    <section id="how-it-works" className="py-24 md:py-36">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-manrope)] tracking-[-0.02em]">
              От установки до первого отчёта — 5 минут
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              Никаких настроек серверов и сложных конфигов
            </p>
          </div>
        </ScrollReveal>

        <div ref={containerRef} className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="relative">

            <div className="space-y-8 md:space-y-10">
              {steps.map((step, i) => {
                const isActive = activeStep === i;
                return (
                  <ScrollReveal key={step.id} delay={i * 0.12}>
                    <div
                      ref={(el) => { stepRefs.current[i] = el; }}
                      className={`flex gap-4 md:gap-8 items-start transition-all duration-300 rounded-2xl p-3 md:p-4 -ml-3 md:-ml-4 ${
                        isActive
                          ? "bg-teal-primary/5 border border-teal-primary/15"
                          : "border border-transparent"
                      }`}
                    >
                      <div className="relative shrink-0">
                        <div
                          className={`w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center relative z-10 transition-colors duration-300 ${
                            isActive
                              ? "bg-teal-primary/20 border-2 border-teal-primary/50"
                              : "bg-teal-primary/10 border border-teal-primary/30"
                          }`}
                        >
                          <span className="text-base md:text-lg font-bold font-[family-name:var(--font-manrope)] text-teal-primary">
                            {step.id}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-bg-tertiary border border-border flex items-center justify-center text-teal-primary shrink-0">
                            <DynamicIcon name={step.icon} size={16} />
                          </div>
                          <h3
                            className={`text-base md:text-lg font-bold font-[family-name:var(--font-manrope)] transition-colors leading-snug ${
                              isActive ? "text-teal-primary" : "text-text-primary"
                            }`}
                          >
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div
              ref={codeRef}
              className="absolute left-0 right-0 transition-all duration-500 ease-out"
              style={{ top: `${codeTop}px` }}
            >
              <CodeHighlight activeStep={activeStep} />
            </div>
          </div>

          <div className="lg:hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-primary font-[family-name:var(--font-jetbrains-mono)]">live‑preview</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <CodeHighlight activeStep={activeStep} />
          </div>
        </div>
      </div>
    </section>
  );
}
