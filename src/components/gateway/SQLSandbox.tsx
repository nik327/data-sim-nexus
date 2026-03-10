import { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, CheckCircle2, XCircle, Play, Database } from "lucide-react";
import { sqlChallenge, SQL_KEYWORDS } from "./GatewayData";

interface SQLSandboxProps {
  onPass: () => void;
}

export default function SQLSandbox({ onPass }: SQLSandboxProps) {
  const [sqlInput, setSqlInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumberRef = useRef<HTMLDivElement>(null);

  const lineCount = Math.max(sqlInput.split("\n").length, 8);

  // Sync scroll between textarea and line numbers
  const handleScroll = () => {
    if (textareaRef.current && lineNumberRef.current) {
      lineNumberRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Real-time keyword detection
  const keywordStatus = useMemo(() => {
    const normalized = sqlInput.toLowerCase().replace(/\s+/g, " ").trim();
    return SQL_KEYWORDS.map((kw) => ({
      ...kw,
      found: kw.check
        ? kw.check(normalized)
        : normalized.includes(kw.keyword.toLowerCase()),
    }));
  }, [sqlInput]);

  const validate = () => {
    setChecked(true);
    const normalized = sqlInput.toLowerCase().replace(/\s+/g, " ").trim();
    const pass =
      normalized.includes("select") &&
      (normalized.includes("join") || normalized.includes("from providers")) &&
      normalized.includes("carbon_score") &&
      normalized.includes("avg") &&
      normalized.includes("group by") &&
      normalized.includes("having") &&
      normalized.includes(">") &&
      (normalized.match(/select/g) || []).length >= 2; // Must have subquery
    setCorrect(pass);
    if (pass) {
      setTimeout(onPass, 1800);
    }
  };

  return (
    <motion.div key="sql" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
            Technical Sandbox
          </span>
          <span className="text-[10px] font-mono text-muted-foreground ml-auto">
            Q&C SQL Engine v3.1
          </span>
        </div>

        <div className="p-6">
          {/* Schema Diagram */}
          <div className="mb-5 p-4 rounded-lg border border-border bg-secondary/20">
            <div className="flex items-center gap-2 mb-3">
              <Database className="h-3.5 w-3.5 text-primary" />
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                Schema Diagram
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {sqlChallenge.tables.map((table) => (
                <div key={table.name} className="p-3 rounded border border-border bg-background/60">
                  <div className="text-xs font-mono font-semibold text-primary mb-2">{table.name}</div>
                  {table.columns.map((col, i) => (
                    <div key={col} className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground py-0.5">
                      {i === 0 && <span className="text-accent text-[9px]">PK</span>}
                      {col === "ProviderID" && table.name === "Shipments" && <span className="text-primary text-[9px]">FK</span>}
                      {i !== 0 && col !== "ProviderID" && <span className="w-4" />}
                      {col === "ProviderID" && table.name !== "Shipments" && null}
                      <span className={col === "Carbon_Score" ? "text-accent" : ""}>{col}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Scenario */}
          <div className="mb-4 p-3 rounded border border-border bg-accent/5 border-l-2 border-l-accent">
            <p className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">Mission Brief</p>
            <p className="text-sm text-foreground leading-relaxed">{sqlChallenge.scenario}</p>
          </div>

          <p className="text-foreground font-medium mb-4 text-sm">{sqlChallenge.task}</p>

          {/* Keyword Detection Chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {keywordStatus.map((kw) => (
              <span
                key={kw.label}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono border transition-all duration-300 ${
                  kw.found
                    ? "border-accent/50 bg-accent/10 text-accent"
                    : "border-border bg-secondary/30 text-muted-foreground"
                }`}
              >
                {kw.found ? (
                  <CheckCircle2 className="h-2.5 w-2.5" />
                ) : (
                  <span className="h-2.5 w-2.5 rounded-full border border-muted-foreground/40 inline-block" />
                )}
                {kw.label}
              </span>
            ))}
          </div>

          {/* Code Editor */}
          <div className="relative rounded-lg border border-border overflow-hidden bg-background">
            <div className="flex">
              {/* Line Numbers */}
              <div
                ref={lineNumberRef}
                className="select-none py-4 pl-3 pr-2 text-right border-r border-border bg-secondary/20 overflow-hidden"
                style={{ minWidth: 44 }}
              >
                {Array.from({ length: lineCount }, (_, i) => (
                  <div key={i} className="text-[11px] font-mono text-muted-foreground/50 leading-[1.65rem]">
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Textarea */}
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

          {/* Actions */}
          <div className="flex items-center justify-between mt-4">
            {checked ? (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-sm font-mono flex items-center gap-1.5 ${correct ? "text-accent" : "text-destructive"}`}
              >
                {correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
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
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-md font-semibold text-sm disabled:opacity-40 glow-blue transition-all hover:opacity-90"
            >
              <Play className="h-3.5 w-3.5" />
              Validate Syntax
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
