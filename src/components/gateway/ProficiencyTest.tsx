import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronRight, ChevronLeft, AlertTriangle } from "lucide-react";
import { useSector } from "@/context/SectorContext";
import { questionsBySector, categoryOrder, categoryLabels, passingThreshold, type Category } from "./GatewayData";
import ResultsBreakdown from "./ResultsBreakdown";

interface ProficiencyTestProps {
  onPass: () => void;
}

const TOTAL_TIME = 45 * 60; // 45 minutes in seconds

export default function ProficiencyTest({ onPass }: ProficiencyTestProps) {
  const { sector } = useSector();
  const questions = questionsBySector[sector];
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [currentCategory, setCurrentCategory] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Group questions by category
  const grouped = categoryOrder.map(cat => ({
    category: cat,
    label: categoryLabels[cat],
    questions: questions.filter(q => q.category === cat),
  }));

  // Timer
  useEffect(() => {
    if (submitted) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [submitted]);

  const handleSubmit = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSubmitted(true);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const handleSelect = (questionId: number, optionIdx: number) => {
    if (submitted) return;
    const qIdx = questions.findIndex(q => q.id === questionId);
    if (qIdx === -1) return;
    setAnswers(prev => {
      const next = [...prev];
      next[qIdx] = optionIdx;
      return next;
    });
  };

  // Calculate scores per category
  const getScores = () => {
    return categoryOrder.map(cat => {
      const catQuestions = questions.filter(q => q.category === cat);
      const correct = catQuestions.filter(q => {
        const idx = questions.findIndex(qq => qq.id === q.id);
        return answers[idx] === q.correct;
      }).length;
      return { category: cat, label: categoryLabels[cat], correct, total: catQuestions.length, passed: correct / catQuestions.length >= passingThreshold };
    });
  };

  // Overall progress
  const answeredCount = answers.filter(a => a !== null).length;
  const progressPct = (answeredCount / questions.length) * 100;

  // Current section questions
  const currentGroup = grouped[currentCategory];
  const currentQuestions = currentGroup.questions;

  // Section answered count
  const sectionAnswered = currentQuestions.filter(q => {
    const idx = questions.findIndex(qq => qq.id === q.id);
    return answers[idx] !== null;
  }).length;

  const isTimeLow = timeLeft < 300; // Under 5 minutes

  if (submitted) {
    const scores = getScores();
    const allPassed = scores.every(s => s.passed);
    return <ResultsBreakdown scores={scores} allPassed={allPassed} onContinue={allPassed ? onPass : undefined} />;
  }

  return (
    <motion.div key="proficiency" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Proficiency Assessment</h2>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">45 questions · 80% per section to pass</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-mono text-sm ${isTimeLow ? "bg-accent/20 text-accent animate-pulse" : "bg-card text-foreground"}`}>
          {isTimeLow && <AlertTriangle className="h-4 w-4 text-accent" strokeWidth={1.5} />}
          <Clock className="h-4 w-4 text-primary" strokeWidth={1.5} />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Global Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Overall Progress</span>
          <span className="text-[10px] font-mono text-muted-foreground">{answeredCount}/{questions.length}</span>
        </div>
        <div className="h-1.5 bg-border/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {grouped.map((g, i) => {
          const catAnswered = g.questions.filter(q => {
            const idx = questions.findIndex(qq => qq.id === q.id);
            return answers[idx] !== null;
          }).length;
          const isActive = i === currentCategory;
          return (
            <button
              key={g.category}
              onClick={() => setCurrentCategory(i)}
              className={`flex-shrink-0 px-4 py-2 rounded-2xl text-xs font-mono transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground hover:text-foreground hover:bg-card/80"
              }`}
            >
              {g.label}
              <span className="ml-2 opacity-60">{catAnswered}/{g.questions.length}</span>
            </button>
          );
        })}
      </div>

      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-primary">
          {currentGroup.label} — {sectionAnswered}/{currentQuestions.length} answered
        </span>
      </div>

      {/* Questions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentGroup.category}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin"
        >
          {currentQuestions.map((q, qIdx) => {
            const globalIdx = questions.findIndex(qq => qq.id === q.id);
            const selectedAnswer = answers[globalIdx];
            return (
              <div key={q.id} className="bg-card rounded-2xl p-5 shadow-sm border border-border/20">
                <p className="text-sm text-foreground font-medium mb-3">
                  <span className="text-primary font-mono mr-2 text-xs">Q{qIdx + 1}.</span>
                  {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleSelect(q.id, oIdx)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-xs transition-all duration-200 font-mono leading-relaxed ${
                        selectedAnswer === oIdx
                          ? "bg-primary/15 text-primary border border-primary/30 shadow-sm"
                          : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground border border-transparent"
                      }`}
                    >
                      <span className="mr-2 opacity-50">{String.fromCharCode(65 + oIdx)}.</span>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/20">
        <button
          onClick={() => setCurrentCategory(Math.max(0, currentCategory - 1))}
          disabled={currentCategory === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-mono text-muted-foreground hover:text-foreground disabled:opacity-30 transition-all"
        >
          <ChevronLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> Previous Section
        </button>

        {currentCategory < grouped.length - 1 ? (
          <button
            onClick={() => setCurrentCategory(currentCategory + 1)}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-primary text-primary-foreground rounded-2xl text-xs font-semibold hover:opacity-90 transition-all"
          >
            Next Section <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={answeredCount < questions.length}
            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-2xl text-xs font-semibold disabled:opacity-40 hover:opacity-90 transition-all"
          >
            Submit Assessment ({answeredCount}/{questions.length})
          </button>
        )}
      </div>
    </motion.div>
  );
}
