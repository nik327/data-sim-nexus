import type { Sector } from "@/context/SectorContext";

export interface Question {
  id: number;
  section: string;
  category: string;
  question: string;
  options: string[];
  correct: number;
}

// ─── Eco Questions (existing) ───
const ecoQuestions: Question[] = [
  {
    id: 1, section: "A", category: "Advanced Excel",
    question: 'You have a 50,000-row dataset. Which function is most efficient for retrieving "Carbon Tax" rates based on "Country Code" while minimizing calculation lag?',
    options: ["VLOOKUP", "INDEX(MATCH) or XLOOKUP", "HLOOKUP"], correct: 1,
  },
  {
    id: 2, section: "A", category: "Advanced Excel",
    question: 'Which tool would you use to ensure a "Shipment Date" column only accepts dates within the current fiscal year?',
    options: ["Conditional Formatting", "Power Query", "Data Validation"], correct: 2,
  },
  {
    id: 3, section: "B", category: "Power BI",
    question: 'You need to compare "Current Month Emissions" vs. "Last Month Emissions." Which DAX function is required?',
    options: ["SUMX", "CALCULATE with DATEADD or PREVIOUSMONTH", "RELATED"], correct: 1,
  },
  {
    id: 4, section: "B", category: "Power BI",
    question: 'If a user clicks a "Region" slicer, but you want one specific "Total Global Average" card to stay the same, what setting must you change?',
    options: ["Edit Interactions", "Sync Slicers", "Visual-level Filters"], correct: 0,
  },
];

// ─── Finance Questions ───
const financeQuestions: Question[] = [
  {
    id: 1, section: "A", category: "Advanced Excel",
    question: 'You need to calculate the Compound Annual Growth Rate (CAGR) of a portfolio over 5 years. Which formula approach is most appropriate?',
    options: ["RATE function", "(End/Start)^(1/n)-1 formula", "XIRR function"], correct: 1,
  },
  {
    id: 2, section: "A", category: "Advanced Excel",
    question: 'A trader needs to flag any transaction over $500K automatically. Which Excel feature is most effective for real-time flagging?',
    options: ["Conditional Formatting with formula rule", "FILTER function", "Data Validation"], correct: 0,
  },
  {
    id: 3, section: "B", category: "Power BI",
    question: 'You need a running total of daily trading volume. Which DAX pattern should you use?',
    options: ["SUMX with EARLIER", "CALCULATE with DATESYTD", "RANKX"], correct: 1,
  },
  {
    id: 4, section: "B", category: "Power BI",
    question: 'To show YoY revenue change as a percentage in a card visual, what DAX measure pattern do you need?',
    options: ["DIVIDE with CALCULATE + SAMEPERIODLASTYEAR", "AVERAGEX with VALUES", "SWITCH with SELECTEDVALUE"], correct: 0,
  },
];

// ─── Medical Questions ───
const medicalQuestions: Question[] = [
  {
    id: 1, section: "A", category: "Advanced Excel",
    question: 'You need to calculate the 30-day readmission rate from a 100K-row patient discharge dataset. Which approach is most efficient?',
    options: ["Nested IF statements", "COUNTIFS with date arithmetic", "Manual pivot table"], correct: 1,
  },
  {
    id: 2, section: "A", category: "Advanced Excel",
    question: 'A clinical dataset has patient IDs that must follow a specific format (e.g., "PT-XXXX"). Which tool enforces this on data entry?',
    options: ["Conditional Formatting", "Data Validation with Custom formula", "Text to Columns"], correct: 1,
  },
  {
    id: 3, section: "B", category: "Power BI",
    question: 'You need to compare patient recovery times across departments while controlling for age groups. Which DAX approach works best?',
    options: ["AVERAGEX with FILTER context", "CALCULATE with ALLEXCEPT", "RANKX with SUMMARIZE"], correct: 1,
  },
  {
    id: 4, section: "B", category: "Power BI",
    question: 'A hospital dashboard must show bed occupancy rate updating every 15 minutes. What Power BI feature is essential?',
    options: ["DirectQuery mode", "Import with scheduled refresh", "Composite model"], correct: 0,
  },
];

export const mcQuestionsBySector: Record<Sector, Question[]> = {
  eco: ecoQuestions,
  finance: financeQuestions,
  medical: medicalQuestions,
};

// Keep backward compat
export const mcQuestions = ecoQuestions;

// ─── SQL Challenges by Sector ───
export interface SQLChallenge {
  scenario: string;
  tables: { name: string; columns: string[] }[];
  task: string;
  keywords: { keyword: string; label: string; check?: (s: string) => boolean }[];
  validate: (s: string) => boolean;
}

const ecoSQL: SQLChallenge = {
  scenario: "The Sustainability Director needs to know which logistics providers have a Carbon Intensity Score higher than the company average for the year 2025.",
  tables: [
    { name: "Providers", columns: ["ProviderID", "Name", "Region"] },
    { name: "Shipments", columns: ["ShipmentID", "ProviderID", "ShipDate", "Carbon_Score"] },
  ],
  task: "Write a query that returns the Name of the provider and their Average_Score, but only for providers whose average Carbon_Score is greater than the overall fleet average.",
  keywords: [
    { keyword: "SELECT", label: "SELECT" },
    { keyword: "JOIN", label: "JOIN" },
    { keyword: "GROUP BY", label: "GROUP BY" },
    { keyword: "HAVING", label: "HAVING" },
    { keyword: "AVG", label: "AVG()" },
    { keyword: "SELECT", label: "Subquery", check: (s) => (s.match(/select/gi) || []).length >= 2 },
  ],
  validate: (s) => {
    const n = s.toLowerCase().replace(/\s+/g, " ").trim();
    return n.includes("select") && (n.includes("join") || n.includes("from providers")) && n.includes("carbon_score") && n.includes("avg") && n.includes("group by") && n.includes("having") && n.includes(">") && (n.match(/select/g) || []).length >= 2;
  },
};

const financeSQL: SQLChallenge = {
  scenario: "The Risk Officer needs to identify the top 5 performing assets whose return rate exceeds the overall fleet average for Q4 2025.",
  tables: [
    { name: "Assets", columns: ["AssetID", "Ticker", "Sector"] },
    { name: "Trades", columns: ["TradeID", "AssetID", "TradeDate", "Return_Rate"] },
  ],
  task: "Write a query that returns the Ticker and Average Return_Rate for assets whose average Return_Rate is greater than the overall average. Limit to the top 5.",
  keywords: [
    { keyword: "SELECT", label: "SELECT" },
    { keyword: "JOIN", label: "JOIN" },
    { keyword: "GROUP BY", label: "GROUP BY" },
    { keyword: "HAVING", label: "HAVING" },
    { keyword: "AVG", label: "AVG()" },
    { keyword: "SELECT", label: "Subquery", check: (s) => (s.match(/select/gi) || []).length >= 2 },
  ],
  validate: (s) => {
    const n = s.toLowerCase().replace(/\s+/g, " ").trim();
    return n.includes("select") && (n.includes("join") || n.includes("from assets")) && n.includes("return_rate") && n.includes("avg") && n.includes("group by") && n.includes("having") && n.includes(">") && (n.match(/select/g) || []).length >= 2;
  },
};

const medicalSQL: SQLChallenge = {
  scenario: "The Chief Medical Officer needs average patient recovery time per department, but only for departments performing worse than the hospital average.",
  tables: [
    { name: "Departments", columns: ["DeptID", "DeptName", "Floor"] },
    { name: "Admissions", columns: ["AdmissionID", "DeptID", "AdmitDate", "Recovery_Days"] },
  ],
  task: "Write a query that returns the DeptName and Avg_Recovery for departments whose average Recovery_Days exceeds the overall hospital average.",
  keywords: [
    { keyword: "SELECT", label: "SELECT" },
    { keyword: "JOIN", label: "JOIN" },
    { keyword: "GROUP BY", label: "GROUP BY" },
    { keyword: "HAVING", label: "HAVING" },
    { keyword: "AVG", label: "AVG()" },
    { keyword: "SELECT", label: "Subquery", check: (s) => (s.match(/select/gi) || []).length >= 2 },
  ],
  validate: (s) => {
    const n = s.toLowerCase().replace(/\s+/g, " ").trim();
    return n.includes("select") && (n.includes("join") || n.includes("from departments")) && n.includes("recovery_days") && n.includes("avg") && n.includes("group by") && n.includes("having") && n.includes(">") && (n.match(/select/g) || []).length >= 2;
  },
};

export const sqlChallengeBySector: Record<Sector, SQLChallenge> = {
  eco: ecoSQL,
  finance: financeSQL,
  medical: medicalSQL,
};

// Legacy export
export const sqlChallenge = ecoSQL;
export const SQL_KEYWORDS = ecoSQL.keywords;
