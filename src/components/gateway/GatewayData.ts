export interface Question {
  id: number;
  section: string;
  category: string;
  question: string;
  options: string[];
  correct: number;
}

export const mcQuestions: Question[] = [
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

export const sqlChallenge = {
  scenario:
    'The Sustainability Director needs to know which logistics providers have a Carbon Intensity Score higher than the company average for the year 2025.',
  tables: [
    { name: "Providers", columns: ["ProviderID", "Name", "Region"] },
    { name: "Shipments", columns: ["ShipmentID", "ProviderID", "ShipDate", "Carbon_Score"] },
  ],
  task: "Write a query that returns the Name of the provider and their Average_Score, but only for providers whose average Carbon_Score is greater than the overall fleet average.",
};

export const SQL_KEYWORDS = [
  { keyword: "SELECT", label: "SELECT" },
  { keyword: "JOIN", label: "JOIN" },
  { keyword: "GROUP BY", label: "GROUP BY" },
  { keyword: "HAVING", label: "HAVING" },
  { keyword: "AVG", label: "AVG()" },
  { keyword: "SELECT", label: "Subquery", check: (s: string) => (s.match(/select/gi) || []).length >= 2 },
];
