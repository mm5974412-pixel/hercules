"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqItems } from "../../content/faq";
import ScrollReveal from "../ui/ScrollReveal";

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 md:py-36">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-manrope)] tracking-[-0.02em]">
              Частые вопросы
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              Если ответа здесь нет — напишите нам в{" "}
              <a href="#" className="text-teal-primary hover:text-teal-light transition-colors">
                Telegram
              </a>
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, i) => {
            const isOpen = openId === item.id;
            return (
              <ScrollReveal key={item.id} delay={i * 0.05}>
                <div className="border-b border-border">
                  <button
                    onClick={() => toggle(item.id)}
                    className="w-full flex items-center justify-between py-6 text-left group"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${item.id}`}
                  >
                    <span className="text-base font-medium text-text-primary group-hover:text-teal-primary transition-colors pr-8">
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 text-text-muted group-hover:text-teal-primary transition-colors"
                    >
                      <Plus size={20} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id={`faq-${item.id}`}
                        role="region"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-text-secondary leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
