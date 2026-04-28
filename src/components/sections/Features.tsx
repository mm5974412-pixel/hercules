"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { features } from "../../content/features";
import DynamicIcon from "../ui/DynamicIcon";
import ScrollReveal from "../ui/ScrollReveal";

export default function Features() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="features" className="py-24 md:py-36">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-manrope)] tracking-[-0.02em]">
              Что умеет Геркулес
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              Восемь модулей, которые закрывают все этапы безопасной разработки
            </p>
          </div>
        </ScrollReveal>

        {(() => {
          const remainder = features.length % 3;
          const mainCount = remainder === 0 ? features.length : features.length - remainder;
          const mainFeatures = features.slice(0, mainCount);
          const lastFeatures = features.slice(mainCount);
          const lastGridCols =
            lastFeatures.length === 1 ? "grid-cols-1" :
            lastFeatures.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

          const renderCard = (feature: typeof features[0], i: number) => {
            const isExpanded = expandedId === feature.id;
            return (
              <ScrollReveal key={feature.id} delay={i * 0.1}>
                <motion.div
                  layout
                  onClick={() => toggle(feature.id)}
                  className={`relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 h-full ${
                    isExpanded
                      ? "bg-bg-tertiary border-teal-primary/30 shadow-[0_0_40px_rgba(20,184,166,0.1)]"
                      : "bg-bg-secondary border-border hover:border-teal-primary/20 hover:bg-bg-tertiary hover:shadow-[0_0_30px_rgba(20,184,166,0.05)] hover:-translate-y-1.5"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isExpanded
                          ? "bg-teal-primary/20 text-teal-light"
                          : "bg-teal-primary/10 text-teal-primary"
                      }`}
                    >
                      <DynamicIcon name={feature.icon} size={24} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-text-primary leading-snug">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                        {feature.summary}
                      </p>
                    </div>
                  </div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 pt-5 border-t border-border space-y-4">
                          <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-warning">
                              Проблема
                            </span>
                            <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                              {feature.problem}
                            </p>
                          </div>
                          <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-success">
                              Решение
                            </span>
                            <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                              {feature.solution}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </ScrollReveal>
            );
          };

          return (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mainFeatures.map((feature, i) => renderCard(feature, i))}
              </div>
              {lastFeatures.length > 0 && (
                <div className={`grid ${lastGridCols} gap-6 mt-6`}>
                  {lastFeatures.map((feature, i) => renderCard(feature, mainCount + i))}
                </div>
              )}
            </>
          );
        })()}
      </div>
    </section>
  );
}
