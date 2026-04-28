"use client";

import { motion, AnimatePresence } from "framer-motion";

interface CodeLine {
  num: number;
  text: string;
  status?: "danger" | "safe" | "neutral" | "comment";
}

interface CodeState {
  title: string;
  lines: CodeLine[];
}

const codeStates: CodeState[] = [
  {
    title: "app.py — до анализа",
    lines: [
      { num: 1, text: "from flask import Flask, request", status: "neutral" },
      { num: 2, text: "import sqlite3", status: "neutral" },
      { num: 3, text: "", status: "neutral" },
      { num: 4, text: "app = Flask(__name__)", status: "neutral" },
      { num: 5, text: "", status: "neutral" },
      { num: 6, text: "@app.route('/user')", status: "neutral" },
      { num: 7, text: "def get_user():", status: "neutral" },
      { num: 8, text: '    uid = request.args.get("id")', status: "neutral" },
      { num: 9, text: '    query = f"SELECT * FROM users WHERE id={uid}"', status: "neutral" },
      { num: 10, text: "    db = sqlite3.connect('app.db')", status: "neutral" },
      { num: 11, text: "    result = db.execute(query)", status: "neutral" },
      { num: 12, text: "    return str(result.fetchone())", status: "neutral" },
    ],
  },
  {
    title: "app.py — Hercules: анализ запущен",
    lines: [
      { num: 1, text: "from flask import Flask, request", status: "neutral" },
      { num: 2, text: "import sqlite3", status: "neutral" },
      { num: 3, text: "", status: "neutral" },
      { num: 4, text: "app = Flask(__name__)", status: "neutral" },
      { num: 5, text: "", status: "neutral" },
      { num: 6, text: "@app.route('/user')", status: "neutral" },
      { num: 7, text: "def get_user():", status: "neutral" },
      { num: 8, text: '    uid = request.args.get("id")', status: "neutral" },
      { num: 9, text: '    query = f"SELECT * FROM users WHERE id={uid}"', status: "danger" },
      { num: 10, text: "    # ⚠ CWE-89: SQL Injection — user input in query", status: "comment" },
      { num: 11, text: "    db = sqlite3.connect('app.db')", status: "neutral" },
      { num: 12, text: "    result = db.execute(query)", status: "danger" },
      { num: 13, text: "    return str(result.fetchone())", status: "neutral" },
    ],
  },
  {
    title: "report.json — отчёт",
    lines: [
      { num: 1, text: "{", status: "neutral" },
      { num: 2, text: '  "scan": "SAST",', status: "neutral" },
      { num: 3, text: '  "file": "app.py",', status: "neutral" },
      { num: 4, text: '  "findings": [{', status: "neutral" },
      { num: 5, text: '    "severity": "CRITICAL",', status: "danger" },
      { num: 6, text: '    "cwe": "CWE-89",', status: "danger" },
      { num: 7, text: '    "title": "SQL Injection",', status: "danger" },
      { num: 8, text: '    "line": 9,', status: "neutral" },
      { num: 9, text: '    "fix": "Use parameterized query"', status: "safe" },
      { num: 10, text: "  }],", status: "neutral" },
      { num: 11, text: '  "total": 1, "critical": 1', status: "neutral" },
      { num: 12, text: "}", status: "neutral" },
    ],
  },
  {
    title: "app.py — исправлено ✓",
    lines: [
      { num: 1, text: "from flask import Flask, request", status: "neutral" },
      { num: 2, text: "import sqlite3", status: "neutral" },
      { num: 3, text: "", status: "neutral" },
      { num: 4, text: "app = Flask(__name__)", status: "neutral" },
      { num: 5, text: "", status: "neutral" },
      { num: 6, text: "@app.route('/user')", status: "neutral" },
      { num: 7, text: "def get_user():", status: "neutral" },
      { num: 8, text: '    uid = request.args.get("id")', status: "neutral" },
      { num: 9, text: '    query = "SELECT * FROM users WHERE id=?"', status: "safe" },
      { num: 10, text: "    # ✓ Parameterized query — safe", status: "comment" },
      { num: 11, text: "    db = sqlite3.connect('app.db')", status: "neutral" },
      { num: 12, text: "    result = db.execute(query, (uid,))", status: "safe" },
      { num: 13, text: "    return str(result.fetchone())", status: "neutral" },
    ],
  },
  {
    title: "ci.yml — повторный анализ",
    lines: [
      { num: 1, text: "name: Hercules CI Check", status: "neutral" },
      { num: 2, text: "on: [push]", status: "neutral" },
      { num: 3, text: "jobs:", status: "neutral" },
      { num: 4, text: "  security-scan:", status: "neutral" },
      { num: 5, text: "    runs-on: ubuntu-latest", status: "neutral" },
      { num: 6, text: "    steps:", status: "neutral" },
      { num: 7, text: "      - uses: actions/checkout@v4", status: "neutral" },
      { num: 8, text: "      - run: hercules scan --sast .", status: "safe" },
      { num: 9, text: "      - run: hercules scan --sca .", status: "safe" },
      { num: 10, text: "    # Result: 0 findings ✓", status: "comment" },
      { num: 11, text: "    # Status: PASSED", status: "safe" },
    ],
  },
];

const statusColors: Record<string, string> = {
  danger: "bg-red-500/10 border-l-2 border-red-500/60",
  safe: "bg-emerald-500/10 border-l-2 border-emerald-500/60",
  comment: "text-text-muted italic",
  neutral: "",
};

const textColors: Record<string, string> = {
  danger: "text-red-400",
  safe: "text-emerald-400",
  comment: "text-text-muted",
  neutral: "text-text-secondary",
};

interface CodeHighlightProps {
  activeStep: number;
}

export default function CodeHighlight({ activeStep }: CodeHighlightProps) {
  const clampedStep = Math.max(0, Math.min(activeStep, codeStates.length - 1));
  const state = codeStates[clampedStep];

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-[#0d1117] border border-border/60 shadow-2xl shadow-black/30">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-border/40">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={state.title}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="ml-3 text-xs text-text-muted font-[family-name:var(--font-jetbrains-mono)]"
          >
            {state.title}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="p-4 overflow-x-auto min-h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={clampedStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {state.lines.map((line, i) => (
              <motion.div
                key={`${clampedStep}-${line.num}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03, duration: 0.25 }}
                className={`flex items-start gap-3 px-2 py-0.5 rounded-sm ${statusColors[line.status || "neutral"]}`}
              >
                <span className="text-xs text-text-muted/50 font-[family-name:var(--font-jetbrains-mono)] w-6 text-right shrink-0 select-none">
                  {line.text ? line.num : ""}
                </span>
                <span
                  className={`text-xs font-[family-name:var(--font-jetbrains-mono)] whitespace-pre ${textColors[line.status || "neutral"]}`}
                >
                  {line.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-t border-border/40">
        <div className="flex items-center gap-3">
          {codeStates.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                i === clampedStep ? "bg-teal-primary" : "bg-text-muted/30"
              }`}
            />
          ))}
        </div>
        <span className="text-[10px] text-text-muted/50 font-[family-name:var(--font-jetbrains-mono)]">
          hercules v2.1.0
        </span>
      </div>
    </div>
  );
}
