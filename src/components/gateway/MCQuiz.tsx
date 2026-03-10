import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { mcQuestions } from "./GatewayData";

interface MCQuizProps {
  onPass: () => void;
}

export default function MCQuiz({ onPass }: MCQuizProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(mcQuestions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (idx: number) => {
    if (submitted) return;
    const next = [...answers];
    next[currentQ] = idx;
    setAnswers(next);
  };

  const submit = () => {
    setSubmitted(true);
    const score = answers.filter((a, i) => a === mcQuestions[i].correct).length;
    if (score >= 3) {
      setTimeout(onPass, 1500);
    }
  };

  const score = submitted ? answers.filter((a, i) => a === mcQuestions[i].correct).length : null;

  return (
    <motion.div key="mc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono text-muted-foreground">
            Section {mcQuestions[currentQ].section}: {mcQuestions[currentQ].category} // Q{currentQ + 1}/{mcQuestions.length}
          </span>
        </div>
        <p className="text-foreground font-medium mb-6">{mcQuestions[currentQ].question}</p>
        <div className="space-y-3">
          {mcQuestions[currentQ].options.map((opt, idx) => {
            const selected = answers[currentQ] === idx;
            const isCorrect = submitted && idx === mcQuestions[currentQ].correct;
            const isWrong = submitted && selected && idx !== mcQuestions[currentQ].correct;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left px-4 py-3 rounded-md border text-sm transition-all font-mono ${
                  isCorrect
                    ? "border-accent bg-accent/10 text-accent"
                    : isWrong
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : selected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
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
          {mcQuestions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQ(i)}
              className={`w-8 h-8 rounded text-xs font-mono ${
                currentQ === i
                  ? "bg-primary text-primary-foreground"
                  : answers[i] !== null
                  ? "bg-secondary text-foreground"
                  : "bg-card border border-border text-muted-foreground"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {!submitted ? (
          <button
            onClick={submit}
            disabled={answers.some((a) => a === null)}
            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-md font-semibold text-sm disabled:opacity-40"
          >
            Submit Answers
          </button>
        ) : (
          <div className="flex items-center gap-2">
            {score !== null && score >= 3 ? (
              <span className="text-sm text-accent font-mono flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> {score}/{mcQuestions.length} — Advancing to SQL
              </span>
            ) : (
              <span className="text-sm text-destructive font-mono flex items-center gap-1">
                <XCircle className="h-4 w-4" /> {score}/{mcQuestions.length} — Score 3+ to advance
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
