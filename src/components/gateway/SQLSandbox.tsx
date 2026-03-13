import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, CheckCircle2, XCircle, Play, Database } from "lucide-react";
import { sqlChallengeBySector } from "./GatewayData";
import { useSector } from "@/context/SectorContext";

interface SQLSandboxProps {
  onPass: () => void;
}

export default function SQLSandbox({ onPass }: SQLSandboxProps) {
  const { sector } = useSector();
  const challenge = sqlChallengeBySector[sector];
  const [sqlInput, setSqlInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumberRef = useRef<HTMLDivElement>(null);

  const lineCount = Math.max(sqlInput.split("\n").length, 8);

  const handleScroll = () => {
    if (textareaRef.current && lineNumberRef.current) {
      lineNumberRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const keywordStatus = useMemo(() => {
    const normalized = sqlInput.toLowerCase().replace(/\s+/g, " ").trim();
    return challenge.keywords.map((kw) => ({
      ...kw,
      found: kw.check
        ? kw.check(normalized)
        : normalized.includes(kw.keyword.toLowerCase()),
    }));
  }, [sqlInput, challenge]);

  const validate = () => {
    setChecked(true);
    const pass = challenge.validate(sqlInput);
    setCorrect(pass);
    if (pass) {
      setTimeout(onPass, 1800);
    }
  };

  return (
    <motion.div key="sql" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="bg-card rounded-3xl overflow-hidden shadow-lg shadow-primary/3">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30 glass-nav">
          <Terminal className="h-4 w-4 text-primary" strokeWidth={1.5} />
          <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
            Technical Sandbox
          </span>
          <span className="text-[10px] font-mono text-muted-foreground ml-auto">
            Q&C SQL Engine v3.1
          </span>
        </div>

        <div className="p-6">
          <div className="mb-5 p-4 rounded-2xl bg-secondary/30">
            <div className="flex items-center gap-2 mb-3">
              <Database className="h-3.5 w-3.5 text-primary" strokeWidth={1.5} />
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                Schema Diagram
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {challenge.tables.map((table) => (
                <div key={table.name} className="p-3 rounded-xl bg-background/60">
                  <div className="text-xs font-mono font-semibold text-primary mb-2">{table.name}</div>
                  {table.columns.map((col, i) => (
                    <div key={col} className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground py-0.5">
                      {i === 0 && <span className="text-accent text-[9px]">PK</span>}
                      {i !== 0 && <span className="w-4" />}
                      <span>{col}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4 p-3 rounded-2xl bg-accent/5 border-l-2 border-l-accent">
            <p className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">Mission Brief</p>
            <p className="text-sm text-foreground leading-relaxed">{challenge.scenario}</p>
          </div>

          <p className="text-foreground font-medium mb-4 text-sm">{challenge.task}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {keywordStatus.map((kw) => (
              <span
                key={kw.label}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-xl text-[10px] font-mono transition-all duration-300 ${
                  kw.found
                    ? "bg-primary/10 text-primary"
                    : "bg-secondary/30 text-muted-foreground"
                }`}
              >
                {kw.found ? (
                  <CheckCircle2 className="h-2.5 w-2.5" strokeWidth={1.5} />
                ) : (
                  <span className="h-2.5 w-2.5 rounded-full border border-muted-foreground/40 inline-block" />
                )}
                {kw.label}
              </span>
            ))}
          </div>

          <div className="relative rounded-2xl overflow-hidden bg-background shadow-inner">
            <div className="flex">
              <div
                ref={lineNumberRef}
                className="select-none py-4 pl-3 pr-2 text-right border-r border-border/30 bg-secondary/20 overflow-hidden"
                style={{ minWidth: 44 }}
              >
                {Array.from({ length: lineCount }, (_, i) => (
                  <div key={i} className="text-[11px] font-mono text-muted-foreground/50 leading-[1.65rem]">
                    {i + 1}
                  </div>
                ))}
              </div>

              <textarea
                ref={textareaRef}
                value={sqlInput}
                onChange={(e) => { setSqlInput(e.target.value); setChecked(false); }}
                onScroll={handleScroll}
                rows={8}
                spellCheck={false}
                placeholder="-- Write your SQL query here..."
                className="flex-1 bg-transparent p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none resize-none leading-[1.65rem]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            {checked ? (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-sm font-mono flex items-center gap-1.5 ${correct ? "text-primary" : "text-destructive"}`}
              >
                {correct ? <CheckCircle2 className="h-4 w-4" strokeWidth={1.5} /> : <XCircle className="h-4 w-4" strokeWidth={1.5} />}
                {correct
                  ? "✓ Query validated — Promoting to Junior Analyst..."
                  : "✗ Syntax check failed. Ensure GROUP BY, HAVING, and a Subquery are present."}
              </motion.span>
            ) : (
              <div />
            )}
            <button
              onClick={validate}
              disabled={!sqlInput.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-2xl font-semibold text-sm disabled:opacity-40 glow-sage transition-all hover:opacity-90"
            >
              <Play className="h-3.5 w-3.5" strokeWidth={1.5} />
              Validate Syntax
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
