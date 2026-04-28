"use client";

import { motion } from "framer-motion";

const CODE_SNIPPETS = [
  { code: `def scan_repo():\n  vulns = check_nvd()\n  return report(vulns)` },
  { code: `const audit = async () => {\n  await sast.run()\n  return findings\n}` },
  { code: `SELECT * FROM vulns\nWHERE severity='HIGH'\nAND status='open'` },
  { code: `if (token.expired) {\n  throw new AuthError(403)\n}` },
  { code: `result = analyzer\n  .scan(repo)\n  .filter(HIGH)` },
  { code: `npm audit --json\n| jq '.vulnerabilities'` },
  { code: `helmet.csp({ directives:\n  { defaultSrc: ["'self'"] }\n})` },
];

const FLOAT_POSITIONS: { left?: string; right?: string; top: string; delay: number; floatY: number; duration: number; opacity: number }[] = [
  { right: "3%",  top: "8%",  delay: 0,   floatY: 12, duration: 9,  opacity: 0.65 },
  { right: "22%", top: "18%", delay: 1.5, floatY: 10, duration: 11, opacity: 0.55 },
  { right: "5%",  top: "42%", delay: 2.8, floatY: 8,  duration: 10, opacity: 0.6  },
  { right: "26%", top: "58%", delay: 0.7, floatY: 14, duration: 8,  opacity: 0.5  },
  { right: "10%", top: "72%", delay: 2.0, floatY: 10, duration: 12, opacity: 0.55 },
  { right: "28%", top: "35%", delay: 1.2, floatY: 9,  duration: 10, opacity: 0.45 },
  { right: "15%", top: "82%", delay: 3.4, floatY: 11, duration: 9,  opacity: 0.5  },
];

export default function FloatingCode() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
      {CODE_SNIPPETS.map((item, i) => {
        const pos = FLOAT_POSITIONS[i];
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ right: pos.right, left: pos.left, top: pos.top }}
            initial={{ opacity: 0 }}
            animate={{ opacity: pos.opacity }}
            transition={{ duration: 1.5, delay: pos.delay }}
          >
            <motion.div
              animate={{ y: [0, -pos.floatY, 0] }}
              transition={{
                duration: pos.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: pos.delay,
              }}
              className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] leading-relaxed text-teal-primary bg-bg-secondary/40 backdrop-blur-sm border border-teal-primary/20 rounded-lg px-3 py-2.5 max-w-[210px]"
            >
              <pre className="whitespace-pre">{item.code}</pre>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
