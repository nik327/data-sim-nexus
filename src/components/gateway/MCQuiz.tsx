import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { questionsBySector, categoryLabels } from "./GatewayData";
import { useSector } from "@/context/SectorContext";

interface MCQuizProps {
  onPass: () => void;
}

/** @deprecated Use ProficiencyTest instead. Kept for backward compatibility. */
export default function MCQuiz({ onPass }: MCQuizProps) {
  const { sector } = useSector();
  const questions = questionsBySector[sector].slice(0, 4);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (idx: number) => {
    if (submitted) return;
    const next = [...answers];
    next[currentQ] = idx;
    setAnswers(next);
  };

  const submit = () => {
    setSubmitted(true);
    const score = answers.filter((a, i) => a === questions[i].correct).length;
    if (score >= 3) setTimeout(onPass, 1500);
  };

  const score = submitted ? answers.filter((a, i) => a === questions[i].correct).length : null;

  return (
    <motion.div key="mc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="bg-card rounded-3xl p-6 mb-6 shadow-lg shadow-primary/3">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono text-muted-foreground">
            {categoryLabels[questions[currentQ].category]} // Q{currentQ + 1}/{questions.length}
          </span>
        </div>
        <p className="text-foreground font-medium mb-6">{questions[currentQ].question}</p>
        <div className="space-y-3">
          {questions[currentQ].options.map((opt, idx) => {
            const selected = answers[currentQ] === idx;
            const isCorrect = submitted && idx === questions[currentQ].correct;
            const isWrong = submitted && selected && idx !== questions[currentQ].correct;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left px-4 py-3 rounded-2xl text-sm transition-all duration-200 font-mono ${
                  isCorrect ? "bg-primary/10 text-primary shadow-sm"
                    : isWrong ? "bg-destructive/10 text-destructive shadow-sm"
                    : selected ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                }`}
              >
                <span className="mr-3 text-xs opacity-50">{String.fromCharCode(65 + idx)}.</span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {questions.map((_, i) => (
            <button key={i} onClick={() => setCurrentQ(i)} className={`w-8 h-8 rounded-xl text-xs font-mono transition-all duration-200 ${
              currentQ === i ? "bg-primary text-primary-foreground shadow-sm"
                : answers[i] !== null ? "bg-secondary text-foreground"
                : "bg-card text-muted-foreground shadow-sm"
            }`}>{i + 1}</button>
          ))}
        </div>
        {!submitted ? (
          <button onClick={submit} disabled={answers.some(a => a === null)} className="px-5 py-2.5 bg-primary text-primary-foreground rounded-2xl font-semibold text-sm disabled:opacity-40 hover:opacity-90 transition">
            Submit Answers
          </button>
        ) : (
          <div className="flex items-center gap-2">
            {score !== null && score >= 3 ? (
              <span className="text-sm text-primary font-mono flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" strokeWidth={1.5} /> {score}/{questions.length} — Passed
              </span>
            ) : (
              <span className="text-sm text-destructive font-mono flex items-center gap-1">
                <XCircle className="h-4 w-4" strokeWidth={1.5} /> {score}/{questions.length} — Score 3+ to advance
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
