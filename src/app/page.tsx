"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import Pricing from "../components/sections/Pricing";
import HowItWorks from "../components/sections/HowItWorks";
import Cases from "../components/sections/Cases";
import Faq from "../components/sections/Faq";
import CtaBanner from "../components/sections/CtaBanner";
import Modal from "../components/ui/Modal";
import DemoForm from "../components/forms/DemoForm";
import DownloadForm from "../components/forms/DownloadForm";

const BackgroundScene = dynamic(
  () => import("../components/three/BackgroundScene"),
  { ssr: false }
);

export default function Home() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-teal-primary focus:text-bg-primary focus:rounded-lg"
      >
        Перейти к содержимому
      </a>

      <div className="hidden md:block">
        <BackgroundScene />
      </div>

      <Header
        onOpenDemo={() => setDemoOpen(true)}
        onOpenDownload={() => setDownloadOpen(true)}
      />

      <main id="main-content">
        <Hero
          onOpenDownload={() => setDownloadOpen(true)}
          onOpenDemo={() => setDemoOpen(true)}
        />

        {/* ── Все блоки после героя — ракета на фоне ── */}
        <div
          className="relative fon-wrapper"
          style={{
            backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/fon.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        >
          {/* затемняющий оверлей */}
          <div className="absolute inset-0 bg-bg-primary/94 pointer-events-none" />
          {/* плавный переход от Hero — убирает полоску на стыке */}
          <div className="absolute top-0 left-0 right-0 h-8 z-[1] bg-gradient-to-b from-bg-primary to-transparent pointer-events-none" />

          <div className="relative z-10">
            <Features />
            <Pricing
              onOpenDownload={() => setDownloadOpen(true)}
              onOpenDemo={() => setDemoOpen(true)}
            />
            <HowItWorks />
            <Cases />
            <Faq />
            <CtaBanner
              onOpenDownload={() => setDownloadOpen(true)}
              onOpenDemo={() => setDemoOpen(true)}
            />
          </div>
        </div>
      </main>

      <Footer />

      <Modal
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
        title="Запросить демо"
      >
        <DemoForm />
      </Modal>

      <Modal
        isOpen={downloadOpen}
        onClose={() => setDownloadOpen(false)}
        title="Скачать Community"
      >
        <DownloadForm />
      </Modal>
    </>
  );
}
