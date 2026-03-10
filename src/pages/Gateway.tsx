import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, Terminal, Zap, ArrowRight, GraduationCap, Shield } from "lucide-react";

interface Question {
  id: number;
  section: string;
  category: string;
  question: string;
  options: string[];
  correct: number;
}

const mcQuestions: Question[] = [
  {
    id: 1,
    section: "A",
    category: "Advanced Excel",
    question:
      'You have a 50,000-row dataset. Which function is most efficient for retrieving "Carbon Tax" rates based on "Country Code" while minimizing calculation lag?',
    options: ["VLOOKUP", "INDEX(MATCH) or XLOOKUP", "HLOOKUP"],
    correct: 1,
  },
  {
    id: 2,
    section: "A",
    category: "Advanced Excel",
    question:
      'Which tool would you use to ensure a "Shipment Date" column only accepts dates within the current fiscal year?',
    options: ["Conditional Formatting", "Power Query", "Data Validation"],
    correct: 2,
  },
  {
    id: 3,
    section: "B",
    category: "Power BI",
    question:
      'You need to compare "Current Month Emissions" vs. "Last Month Emissions." Which DAX function is required?',
    options: ["SUMX", "CALCULATE with DATEADD or PREVIOUSMONTH", "RELATED"],
    correct: 1,
  },
  {
    id: 4,
    section: "B",
    category: "Power BI",
    question:
      'If a user clicks a "Region" slicer, but you want one specific "Total Global Average" card to stay the same, what setting must you change?',
    options: ["Edit Interactions", "Sync Slicers", "Visual-level Filters"],
    correct: 0,
  },
];

const sqlChallenge = {
  scenario:
    'The Sustainability Director needs to know which logistics providers have a Carbon Intensity Score higher than the company average for the year 2025.',
  tables: [
    "Providers (ProviderID, Name, Region)",
    "Shipments (ShipmentID, ProviderID, ShipDate, Carbon_Score)",
  ],
  task: "Write a query that returns the Name of the provider and their Average_Score, but only for providers whose average Carbon_Score is greater than the overall fleet average.",
};

export default function Gateway() {
  const { role, promote } = useUser();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"choose" | "mc" | "sql" | "success">("choose");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(mcQuestions.length).fill(null));
  const [sqlInput, setSqlInput] = useState("");
  const [mcSubmitted, setMcSubmitted] = useState(false);
  const [sqlChecked, setSqlChecked] = useState(false);
  const [sqlCorrect, setSqlCorrect] = useState(false);

  if (role === "junior-analyst") {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="text-center">
          <CheckCircle2 className="h-16 w-16 text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Access Granted</h2>
          <p className="text-muted-foreground mb-6">You've already cleared the Gateway.</p>
          <button onClick={() => navigate("/hub")} className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold">
            Go to Work Hub
          </button>
        </div>
      </div>
    );
  }

  const handleMCSelect = (optionIdx: number) => {
    if (mcSubmitted) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = optionIdx;
    setAnswers(newAnswers);
  };

  const submitMC = () => {
    setMcSubmitted(true);
    const score = answers.filter((a, i) => a === mcQuestions[i].correct).length;
    if (score >= 3) {
      setTimeout(() => setPhase("sql"), 1500);
    }
  };

  const checkSQL = () => {
    setSqlChecked(true);
    const normalized = sqlInput.toLowerCase().replace(/\s+/g, " ").trim();
    const pass =
      normalized.includes("select") &&
      (normalized.includes("join") || normalized.includes("from providers")) &&
      normalized.includes("carbon_score") &&
      normalized.includes("avg") &&
      normalized.includes("group by") &&
      normalized.includes("having") &&
      normalized.includes(">");
    setSqlCorrect(pass);
    if (pass) {
      setTimeout(() => {
        promote("junior-analyst");
        setPhase("success");
      }, 1500);
    }
  };

  const mcScore = mcSubmitted ? answers.filter((a, i) => a === mcQuestions[i].correct).length : null;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Zap className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Proficiency Gateway</h1>
          <span className="ml-auto text-xs font-mono text-muted-foreground uppercase tracking-wider">
            fast-track vetting
          </span>
        </div>

        {/* Progress */}
        {phase !== "choose" && (
          <div className="flex gap-2 mb-8">
            {["Multiple Choice", "SQL Sandbox"].map((label, i) => (
              <div key={label} className="flex-1">
                <div className={`h-1 rounded-full ${
                  (phase === "mc" && i === 0) || (phase === "sql" && i <= 1) || phase === "success"
                    ? "bg-primary"
                    : "bg-border"
                }`} />
                <span className="text-[10px] font-mono text-muted-foreground mt-1 block">{label}</span>
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {phase === "choose" && (
            <motion.div key="choose" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="text-center mb-10">
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Choose your path into Query & Co. Prove your skills now or build them through guided training.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {/* Fast-Track Option */}
                <button
                  onClick={() => setPhase("mc")}
                  className="group p-8 rounded-lg bg-card border border-border hover:border-primary/60 transition-all text-left"
                >
                  <Shield className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-foreground mb-2">Fast-Track Test</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Already skilled in Excel, SQL & Power BI? Pass the proficiency test to unlock Junior Analyst access immediately.
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-primary">
                    Start Test <ArrowRight className="h-3 w-3" />
                  </span>
                </button>

                {/* Training Journey Option */}
                <button
                  onClick={() => {
                    promote("trainee");
                    navigate("/academy");
                  }}
                  className="group p-8 rounded-lg bg-card border border-border hover:border-accent/60 transition-all text-left"
                >
                  <GraduationCap className="h-10 w-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-foreground mb-2">Training Journey</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Start with guided modules on SQL, Excel & Power BI. Build your skills step-by-step with real climate logistics data.
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-accent">
                    Begin Training <ArrowRight className="h-3 w-3" />
                  </span>
                </button>
              </div>
            </motion.div>
          )}

          {phase === "mc" && (
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
                    const isCorrect = mcSubmitted && idx === mcQuestions[currentQ].correct;
                    const isWrong = mcSubmitted && selected && idx !== mcQuestions[currentQ].correct;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleMCSelect(idx)}
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

                {!mcSubmitted ? (
                  <button
                    onClick={submitMC}
                    disabled={answers.some((a) => a === null)}
                    className="px-5 py-2.5 bg-primary text-primary-foreground rounded-md font-semibold text-sm disabled:opacity-40"
                  >
                    Submit Answers
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    {mcScore !== null && mcScore >= 3 ? (
                      <span className="text-sm text-accent font-mono flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" /> {mcScore}/{mcQuestions.length} — Advancing to SQL
                      </span>
                    ) : (
                      <span className="text-sm text-destructive font-mono flex items-center gap-1">
                        <XCircle className="h-4 w-4" /> {mcScore}/{mcQuestions.length} — Score 3+ to advance
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {phase === "sql" && (
            <motion.div key="sql" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="h-4 w-4 text-primary" />
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    SQL Sandbox
                  </span>
                </div>

                <div className="mb-4 p-3 bg-secondary/50 rounded border border-border">
                  <p className="text-xs font-mono text-muted-foreground mb-1">Schema:</p>
                  {sqlChallenge.tables.map((t) => (
                    <code key={t} className="text-xs text-primary block">{t}</code>
                  ))}
                </div>

                <div className="mb-4 p-3 bg-secondary/30 rounded border border-border">
                  <p className="text-xs font-mono text-muted-foreground mb-1">Scenario:</p>
                  <p className="text-sm text-foreground">{sqlChallenge.scenario}</p>
                </div>

                <p className="text-foreground font-medium mb-4">{sqlChallenge.task}</p>

                <textarea
                  value={sqlInput}
                  onChange={(e) => { setSqlInput(e.target.value); setSqlChecked(false); }}
                  rows={5}
                  placeholder="-- Write your SQL query here"
                  className="w-full bg-navy-deep border border-border rounded-md p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  style={{ backgroundColor: "hsl(222 47% 6%)" }}
                />

                <div className="flex items-center justify-between mt-4">
                  {sqlChecked && (
                    <span className={`text-sm font-mono flex items-center gap-1 ${sqlCorrect ? "text-accent" : "text-destructive"}`}>
                      {sqlCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                      {sqlCorrect ? "Query validated — Promoting..." : "Query incorrect. Check your subquery logic."}
                    </span>
                  )}
                  {!sqlChecked && <div />}
                  <button
                    onClick={checkSQL}
                    disabled={!sqlInput.trim()}
                    className="px-5 py-2.5 bg-primary text-primary-foreground rounded-md font-semibold text-sm disabled:opacity-40"
                  >
                    Execute Query
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {phase === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <CheckCircle2 className="h-20 w-20 text-accent mx-auto mb-6" />
              </motion.div>
              <h2 className="text-3xl font-black text-foreground mb-2">PROMOTED</h2>
              <p className="text-lg text-accent font-mono mb-2">Junior Analyst</p>
              <p className="text-muted-foreground mb-8">You've cleared the Proficiency Gateway. Welcome to Q&C.</p>
              <button
                onClick={() => navigate("/hub")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary-foreground rounded-md font-semibold glow-emerald"
              >
                Enter Work Hub <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
