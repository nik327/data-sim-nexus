import type { Sector } from "@/context/SectorContext";

export type Category = "sql-theory" | "sql-syntax" | "excel" | "powerbi";

export interface Question {
  id: number;
  category: Category;
  question: string;
  options: string[];
  correct: number;
}

export const categoryLabels: Record<Category, string> = {
  "sql-theory": "SQL: Theoretical",
  "sql-syntax": "SQL: Syntax",
  "excel": "Excel",
  "powerbi": "Power BI",
};

export const categoryOrder: Category[] = ["sql-theory", "sql-syntax", "excel", "powerbi"];

export const passingThreshold = 0.8; // 80% per category

// ─── Schema mappings per sector ───
const schemas: Record<Sector, {
  table1: string; table2: string; table3: string;
  col1: string; col2: string; col3: string; col4: string;
  entity: string; metric: string; dateCol: string;
  providerEntity: string; scoreCol: string;
}> = {
  eco: {
    table1: "Providers", table2: "Shipments", table3: "Emissions",
    col1: "ProviderID", col2: "Carbon_Score", col3: "ShipDate", col4: "Region",
    entity: "provider", metric: "carbon intensity", dateCol: "ShipDate",
    providerEntity: "logistics provider", scoreCol: "Carbon_Score",
  },
  finance: {
    table1: "Assets", table2: "Transactions", table3: "Portfolios",
    col1: "AssetID", col2: "Return_Rate", col3: "TradeDate", col4: "Sector",
    entity: "asset", metric: "return rate", dateCol: "TradeDate",
    providerEntity: "trading asset", scoreCol: "Return_Rate",
  },
  medical: {
    table1: "Departments", table2: "Admissions", table3: "Vitals",
    col1: "DeptID", col2: "Recovery_Days", col3: "AdmitDate", col4: "Floor",
    entity: "department", metric: "recovery time", dateCol: "AdmitDate",
    providerEntity: "department", scoreCol: "Recovery_Days",
  },
};

function buildQuestions(sector: Sector): Question[] {
  const s = schemas[sector];

  // ─── SQL THEORY (10) ───
  const sqlTheory: Question[] = [
    {
      id: 1, category: "sql-theory",
      question: "What is the key difference between a LEFT JOIN and a FULL OUTER JOIN?",
      options: [
        "LEFT JOIN returns all rows from both tables; FULL OUTER JOIN returns only matching rows",
        "LEFT JOIN returns all rows from the left table and matching from the right; FULL OUTER JOIN returns all rows from both tables",
        "They are functionally identical but FULL OUTER JOIN is faster",
        "LEFT JOIN cannot handle NULL values while FULL OUTER JOIN can",
      ],
      correct: 1,
    },
    {
      id: 2, category: "sql-theory",
      question: `Why is using SELECT * considered bad practice in a production ${s.entity} database?`,
      options: [
        "It causes syntax errors in most database engines",
        "It returns data in random order every time",
        "It retrieves unnecessary columns, increasing I/O, memory usage, and breaking code when schemas change",
        "It only works with temporary tables",
      ],
      correct: 2,
    },
    {
      id: 3, category: "sql-theory",
      question: "What is the specific execution order of WHERE vs HAVING in a SQL query?",
      options: [
        "HAVING executes before WHERE",
        "WHERE and HAVING execute simultaneously",
        "WHERE filters rows before grouping; HAVING filters groups after aggregation",
        "WHERE filters groups; HAVING filters individual rows",
      ],
      correct: 2,
    },
    {
      id: 4, category: "sql-theory",
      question: `How does a B-Tree index speed up queries on the ${s.table2} table?`,
      options: [
        "It stores the entire table in memory for instant access",
        "It organizes data in a sorted tree structure allowing logarithmic-time lookups instead of full table scans",
        "It compresses the data to reduce file size",
        "It creates a copy of the table with fewer columns",
      ],
      correct: 1,
    },
    {
      id: 5, category: "sql-theory",
      question: "What is the difference between a PRIMARY KEY and a UNIQUE constraint?",
      options: [
        "PRIMARY KEY allows NULLs; UNIQUE does not",
        "There is no difference; they are aliases",
        "PRIMARY KEY enforces uniqueness and NOT NULL, and a table can only have one; UNIQUE allows one NULL and a table can have multiple",
        "UNIQUE is faster than PRIMARY KEY for lookups",
      ],
      correct: 2,
    },
    {
      id: 6, category: "sql-theory",
      question: "What does the 'Atomicity' property in ACID stand for?",
      options: [
        "Queries must execute in the smallest possible time",
        "A transaction is treated as a single indivisible unit — it either fully completes or fully rolls back",
        "Data must be stored in atomic (single-value) cells",
        "Multiple users can access the same record atomically",
      ],
      correct: 1,
    },
    {
      id: 7, category: "sql-theory",
      question: `How does COUNT(*) differ from COUNT(${s.col2}) when querying the ${s.table2} table?`,
      options: [
        "COUNT(*) is slower because it reads all columns",
        "COUNT(*) counts all rows including NULLs; COUNT(column) counts only non-NULL values in that column",
        "COUNT(column) counts all rows; COUNT(*) only counts non-NULL rows",
        "They always return the same result",
      ],
      correct: 1,
    },
    {
      id: 8, category: "sql-theory",
      question: "What is the primary goal of 3rd Normal Form (3NF)?",
      options: [
        "To ensure every table has exactly three columns",
        "To eliminate all redundancy by using only foreign keys",
        "To remove transitive dependencies — non-key columns must depend only on the primary key, not on other non-key columns",
        "To ensure each table has at least three indexes",
      ],
      correct: 2,
    },
    {
      id: 9, category: "sql-theory",
      question: "When would you use a Correlated Subquery over a standard (non-correlated) subquery?",
      options: [
        "When you need faster performance on large datasets",
        "When the subquery needs to reference values from the outer query for each row being evaluated",
        "When you need to return multiple columns",
        "Correlated subqueries are deprecated and should never be used",
      ],
      correct: 1,
    },
    {
      id: 10, category: "sql-theory",
      question: `What are the security benefits of using a VIEW on the ${s.table2} table?`,
      options: [
        "VIEWs encrypt the underlying data automatically",
        "VIEWs allow you to expose only specific columns/rows to users without granting direct table access, enforcing data abstraction",
        "VIEWs prevent SQL injection attacks",
        "VIEWs automatically back up the table data",
      ],
      correct: 1,
    },
  ];

  // ─── SQL SYNTAX (10) ───
  const sqlSyntax: Question[] = [
    {
      id: 11, category: "sql-syntax",
      question: `Write a query to find the 2nd highest value in the ${s.col2} column of the ${s.table2} table. Which approach is correct?`,
      options: [
        `SELECT MAX(${s.col2}) FROM ${s.table2} WHERE ${s.col2} < (SELECT MAX(${s.col2}) FROM ${s.table2})`,
        `SELECT ${s.col2} FROM ${s.table2} ORDER BY ${s.col2} LIMIT 2`,
        `SELECT MIN(${s.col2}) FROM ${s.table2}`,
        `SELECT TOP 2 ${s.col2} FROM ${s.table2}`,
      ],
      correct: 0,
    },
    {
      id: 12, category: "sql-syntax",
      question: `Which query correctly uses COALESCE to replace NULL values in ${s.col2} with a default of 0?`,
      options: [
        `SELECT ISNULL(${s.col2}) FROM ${s.table2}`,
        `SELECT COALESCE(${s.col2}, 0) AS ${s.col2} FROM ${s.table2}`,
        `SELECT NVL(${s.col2}) FROM ${s.table2}`,
        `SELECT REPLACE(${s.col2}, NULL, 0) FROM ${s.table2}`,
      ],
      correct: 1,
    },
    {
      id: 13, category: "sql-syntax",
      question: `Which CTE correctly calculates a running total of ${s.col2} per ${s.col4}?`,
      options: [
        `WITH RunningTotals AS (SELECT ${s.col4}, ${s.col2}, SUM(${s.col2}) OVER (PARTITION BY ${s.col4} ORDER BY ${s.col3}) AS RunningTotal FROM ${s.table2}) SELECT * FROM RunningTotals`,
        `SELECT ${s.col4}, CUMSUM(${s.col2}) FROM ${s.table2} GROUP BY ${s.col4}`,
        `WITH RT AS (SELECT SUM(${s.col2}) FROM ${s.table2}) SELECT * FROM RT`,
        `SELECT RUNNING_TOTAL(${s.col2}) OVER ${s.col4} FROM ${s.table2}`,
      ],
      correct: 0,
    },
    {
      id: 14, category: "sql-syntax",
      question: `Which query uses ROW_NUMBER() to identify duplicate records in the ${s.table1} table?`,
      options: [
        `SELECT *, COUNT(*) FROM ${s.table1} GROUP BY Name HAVING COUNT(*) > 1`,
        `WITH Ranked AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY Name ORDER BY ${s.col1}) AS rn FROM ${s.table1}) SELECT * FROM Ranked WHERE rn > 1`,
        `SELECT DISTINCT * FROM ${s.table1} WHERE DUPLICATE = TRUE`,
        `SELECT * FROM ${s.table1} WHERE ${s.col1} IN (SELECT ${s.col1} FROM ${s.table1} LIMIT 2)`,
      ],
      correct: 1,
    },
    {
      id: 15, category: "sql-syntax",
      question: `Which CASE WHEN correctly categorizes ${s.col2} into 'High', 'Medium', and 'Low'?`,
      options: [
        `SELECT CASE WHEN ${s.col2} > 80 THEN 'High' WHEN ${s.col2} > 40 THEN 'Medium' ELSE 'Low' END AS Category FROM ${s.table2}`,
        `SELECT IF(${s.col2} > 80, 'High', 'Low') FROM ${s.table2}`,
        `SELECT SWITCH(${s.col2}, 80, 'High', 40, 'Medium', 'Low') FROM ${s.table2}`,
        `SELECT DECODE(${s.col2}, 'High', 'Medium', 'Low') FROM ${s.table2}`,
      ],
      correct: 0,
    },
    {
      id: 16, category: "sql-syntax",
      question: `Which JOIN correctly links ${s.table2} to ${s.table1} for records in 2025?`,
      options: [
        `SELECT * FROM ${s.table2} t JOIN ${s.table1} p ON t.${s.col1} = p.${s.col1} WHERE YEAR(t.${s.col3}) = 2025`,
        `SELECT * FROM ${s.table2} CROSS JOIN ${s.table1} WHERE YEAR = 2025`,
        `SELECT * FROM ${s.table2}, ${s.table1} WHERE ${s.col3} LIKE '2025'`,
        `SELECT * FROM ${s.table2} NATURAL JOIN ${s.table1}`,
      ],
      correct: 0,
    },
    {
      id: 17, category: "sql-syntax",
      question: `Which LIKE pattern finds all names in ${s.table1} starting with 'Agri' and ending in 'Co'?`,
      options: [
        `SELECT * FROM ${s.table1} WHERE Name LIKE 'Agri%Co'`,
        `SELECT * FROM ${s.table1} WHERE Name = 'Agri*Co'`,
        `SELECT * FROM ${s.table1} WHERE Name REGEXP 'Agri.*Co'`,
        `SELECT * FROM ${s.table1} WHERE Name IN ('Agri', 'Co')`,
      ],
      correct: 0,
    },
    {
      id: 18, category: "sql-syntax",
      question: `Which query uses DATEDIFF to find ${s.table2} records that span more than 5 days?`,
      options: [
        `SELECT * FROM ${s.table2} WHERE DATEDIFF(day, StartDate, EndDate) > 5`,
        `SELECT * FROM ${s.table2} WHERE EndDate - StartDate = 5`,
        `SELECT * FROM ${s.table2} WHERE TIMEDIFF(StartDate, EndDate) > 5`,
        `SELECT * FROM ${s.table2} WHERE DATEPART(day, EndDate) > 5`,
      ],
      correct: 0,
    },
    {
      id: 19, category: "sql-syntax",
      question: `Which GROUP BY query returns only groups with more than 10 entries from ${s.table2}?`,
      options: [
        `SELECT ${s.col4}, COUNT(*) FROM ${s.table2} GROUP BY ${s.col4} HAVING COUNT(*) > 10`,
        `SELECT ${s.col4}, COUNT(*) FROM ${s.table2} WHERE COUNT(*) > 10 GROUP BY ${s.col4}`,
        `SELECT ${s.col4} FROM ${s.table2} GROUP BY ${s.col4} LIMIT 10`,
        `SELECT TOP 10 ${s.col4} FROM ${s.table2} GROUP BY ${s.col4}`,
      ],
      correct: 0,
    },
    {
      id: 20, category: "sql-syntax",
      question: `Which UPDATE correctly sets Status to 'Completed' for records in ${s.table2} where the Deadline has passed?`,
      options: [
        `UPDATE ${s.table2} SET Status = 'Completed' WHERE Deadline < GETDATE()`,
        `ALTER ${s.table2} SET Status = 'Completed' WHERE Deadline < NOW()`,
        `MODIFY ${s.table2} Status = 'Completed' WHERE Deadline IS PAST`,
        `INSERT INTO ${s.table2} (Status) VALUES ('Completed') WHERE Deadline < TODAY`,
      ],
      correct: 0,
    },
  ];

  // ─── EXCEL (15) ───
  const excel: Question[] = [
    {
      id: 21, category: "excel",
      question: "Which is more robust for horizontal data additions: VLOOKUP or XLOOKUP?",
      options: [
        "VLOOKUP, because it has been in Excel longer",
        "XLOOKUP, because it doesn't rely on column index numbers and can search in any direction",
        "They are equally robust for horizontal changes",
        "Neither — INDEX/MATCH is required for horizontal data",
      ],
      correct: 1,
    },
    {
      id: 22, category: "excel",
      question: 'How do you create a "Dynamic Named Range" using the OFFSET function?',
      options: [
        "=OFFSET(Sheet1!$A$1, 0, 0, COUNTA(Sheet1!$A:$A), 1) — dynamically resizes based on data count",
        "=RANGE(A1:A100, DYNAMIC)",
        "=NAMED.RANGE(A1, AUTO)",
        "You cannot create dynamic ranges in Excel",
      ],
      correct: 0,
    },
    {
      id: 23, category: "excel",
      question: 'In Power Query, what is "Unpivoting Columns" used for?',
      options: [
        "Deleting columns that contain no data",
        "Transposing rows into columns",
        "Transforming wide-format data (many columns) into tall-format data (rows) for analysis",
        "Sorting columns in alphabetical order",
      ],
      correct: 2,
    },
    {
      id: 24, category: "excel",
      question: "What is the difference between absolute ($A$1) and relative (A1) cell references?",
      options: [
        "Absolute references change when copied; relative references stay fixed",
        "Absolute references stay fixed when copied; relative references adjust based on the new cell position",
        "There is no practical difference",
        "Absolute references only work in VBA macros",
      ],
      correct: 1,
    },
    {
      id: 25, category: "excel",
      question: 'How do you identify duplicate rows using "Conditional Formatting"?',
      options: [
        "Home → Conditional Formatting → Highlight Cells Rules → Duplicate Values",
        "Data → Remove Duplicates → Highlight",
        "Insert → Pivot Table → Show Duplicates",
        "Review → Track Changes → Duplicates",
      ],
      correct: 0,
    },
    {
      id: 26, category: "excel",
      question: "What does the #SPILL! error signify in modern Excel?",
      options: [
        "The formula contains a circular reference",
        "The spill range is blocked by existing data in one or more cells where the result needs to expand",
        "The formula exceeds the maximum character limit",
        "The worksheet is protected and formulas cannot execute",
      ],
      correct: 1,
    },
    {
      id: 27, category: "excel",
      question: "How do you nest an IF statement within an IFERROR?",
      options: [
        "=IFERROR(IF(A1>100, \"High\", \"Low\"), \"Error\") — IFERROR wraps the IF to catch any calculation errors",
        "=IF(IFERROR(A1), \"High\", \"Low\")",
        "=IFERROR(\"Error\", IF(A1>100, \"High\"))",
        "Nesting IF inside IFERROR is not supported",
      ],
      correct: 0,
    },
    {
      id: 28, category: "excel",
      question: "Which tool is better for merging two separate data tables: VLOOKUP or Power Query Merge?",
      options: [
        "VLOOKUP, because it's simpler",
        "Power Query Merge, because it handles multiple join types, preserves data types, and is repeatable with refresh",
        "They are identical in capability",
        "Neither — you must use VBA for table merges",
      ],
      correct: 1,
    },
    {
      id: 29, category: "excel",
      question: "How do you protect only specific cells in a sheet while leaving others editable?",
      options: [
        "Unlock the editable cells (Format Cells → Protection → uncheck Locked), then protect the sheet",
        "Use Data Validation to prevent edits",
        "Hide the cells you want to protect",
        "You cannot selectively protect cells — it's all or nothing",
      ],
      correct: 0,
    },
    {
      id: 30, category: "excel",
      question: "What is the purpose of the GETPIVOTDATA function?",
      options: [
        "It creates a new Pivot Table from scratch",
        "It extracts specific aggregated data from an existing Pivot Table, ensuring the reference is stable even if the layout changes",
        "It refreshes all Pivot Tables in a workbook",
        "It converts a Pivot Table back to raw data",
      ],
      correct: 1,
    },
    {
      id: 31, category: "excel",
      question: "How do you convert a text string '20250312' into a proper date format?",
      options: [
        "=DATEVALUE(TEXT(A1, \"YYYY-MM-DD\"))",
        "=DATE(LEFT(A1,4), MID(A1,5,2), RIGHT(A1,2))",
        "=FORMAT(A1, \"Date\")",
        "=CONVERT(A1, \"date\")",
      ],
      correct: 1,
    },
    {
      id: 32, category: "excel",
      question: `Which SUMIFS formula correctly sums ${s.col2} values based on two criteria?`,
      options: [
        `=SUMIFS(${s.col2}Range, ${s.col4}Range, "East", YearRange, 2025)`,
        `=SUM(${s.col2}Range, IF(${s.col4}="East", IF(Year=2025)))`,
        `=SUMPRODUCT(${s.col2}Range * (${s.col4}Range="East"))`,
        `=DSUM(${s.col2}Range, "East", 2025)`,
      ],
      correct: 0,
    },
    {
      id: 33, category: "excel",
      question: "How do you remove leading and trailing spaces from a cell value?",
      options: [
        "=CLEAN(A1)",
        "=TRIM(A1)",
        "=SUBSTITUTE(A1, \" \", \"\")",
        "=STRIP(A1)",
      ],
      correct: 1,
    },
    {
      id: 34, category: "excel",
      question: 'What is the keyboard shortcut to "Flash Fill" a column in Excel?',
      options: [
        "Ctrl + E",
        "Ctrl + Shift + F",
        "Alt + F5",
        "Ctrl + D",
      ],
      correct: 0,
    },
    {
      id: 35, category: "excel",
      question: "How do you create a dependent (cascading) dropdown list in Excel?",
      options: [
        "Use Data Validation with an INDIRECT formula pointing to a named range that matches the parent dropdown's selection",
        "Use a VLOOKUP inside the Data Validation source",
        "Create a macro that runs onChange",
        "Dependent dropdowns are not possible without VBA",
      ],
      correct: 0,
    },
  ];

  // ─── POWER BI (10) ───
  const powerbi: Question[] = [
    {
      id: 36, category: "powerbi",
      question: "What is the difference between SUM and SUMX in DAX?",
      options: [
        "SUM aggregates a single column; SUMX iterates row-by-row over a table, evaluating an expression for each row before summing",
        "SUMX is faster than SUM in all cases",
        "SUM works on measures; SUMX works on dimensions",
        "There is no practical difference",
      ],
      correct: 0,
    },
    {
      id: 37, category: "powerbi",
      question: "Why is a Star Schema preferred over a Snowflake Schema in Power BI?",
      options: [
        "Star Schema uses less storage space",
        "Star Schema is simpler, reduces the number of joins, and enables the Vertipaq engine to compress and query data more efficiently",
        "Snowflake Schema cannot be imported into Power BI",
        "Star Schema supports more data types",
      ],
      correct: 1,
    },
    {
      id: 38, category: "powerbi",
      question: 'What is the difference between "Visual Level" and "Page Level" filters in Power BI?',
      options: [
        "Visual Level filters apply to a single visual; Page Level filters apply to all visuals on the current page",
        "Page Level filters only work with slicers",
        "Visual Level filters are applied in DAX; Page Level filters are applied in Power Query",
        "There is no difference — they are interchangeable",
      ],
      correct: 0,
    },
    {
      id: 39, category: "powerbi",
      question: `Which DAX measure correctly calculates Year-to-Date ${s.metric}?`,
      options: [
        `YTD_Total = TOTALYTD(SUM(${s.table2}[${s.col2}]), Dates[Date])`,
        `YTD_Total = SUMX(DATESYTD(Dates[Date]), ${s.table2}[${s.col2}])`,
        `YTD_Total = CALCULATE(SUM(${s.table2}[${s.col2}]), YEAR(TODAY()))`,
        `YTD_Total = SUMYTD(${s.table2}[${s.col2}])`,
      ],
      correct: 0,
    },
    {
      id: 40, category: "powerbi",
      question: 'When would you safely use a "Many-to-Many" relationship in Power BI?',
      options: [
        "Always — it's the default relationship type",
        "Only when a bridge table exists and cross-filter direction is carefully set to avoid ambiguity",
        "Never — Many-to-Many relationships cause errors",
        "Only with DirectQuery connections",
      ],
      correct: 1,
    },
    {
      id: 41, category: "powerbi",
      question: "What is the key difference between Import Mode and DirectQuery in Power BI?",
      options: [
        "Import loads data into memory for fast queries; DirectQuery sends queries to the source in real-time, offering live data but slower performance",
        "DirectQuery is always faster than Import",
        "Import Mode cannot handle more than 1 million rows",
        "DirectQuery stores a local cache; Import Mode does not",
      ],
      correct: 0,
    },
    {
      id: 42, category: "powerbi",
      question: "What does the CALCULATE function do to the filter context in DAX?",
      options: [
        "It removes all existing filters",
        "It modifies the filter context by adding, removing, or replacing filters before evaluating the expression",
        "It converts a measure into a calculated column",
        "It forces row context into a formula",
      ],
      correct: 1,
    },
    {
      id: 43, category: "powerbi",
      question: "When is a Decomposition Tree more useful than a standard Bar Chart?",
      options: [
        "When you need to drill down through multiple hierarchical dimensions to understand root causes of a metric",
        "When you have fewer than 5 data points",
        "When you need to show trends over time",
        "Decomposition Trees are deprecated in modern Power BI",
      ],
      correct: 0,
    },
    {
      id: 44, category: "powerbi",
      question: 'What is "Query Folding" in Power Query and why does it matter?',
      options: [
        "It compresses query results into smaller files",
        "It pushes transformation steps back to the data source as native queries, dramatically improving performance by reducing data transferred",
        "It combines multiple queries into one automatically",
        "It folds duplicate rows into single entries",
      ],
      correct: 1,
    },
    {
      id: 45, category: "powerbi",
      question: 'What is a "Gateway" used for in the Power BI Service?',
      options: [
        "A Gateway acts as a bridge between the Power BI cloud service and on-premises data sources, enabling scheduled refreshes of local data",
        "It's a security firewall for Power BI dashboards",
        "It converts Power BI reports into PDF format",
        "It allows multiple users to edit a report simultaneously",
      ],
      correct: 0,
    },
  ];

  return [...sqlTheory, ...sqlSyntax, ...excel, ...powerbi];
}

export const questionsBySector: Record<Sector, Question[]> = {
  eco: buildQuestions("eco"),
  finance: buildQuestions("finance"),
  medical: buildQuestions("medical"),
};

// Legacy exports for backward compatibility
export const mcQuestions = questionsBySector.eco.filter(q => q.category === "sql-theory").slice(0, 4);
export const mcQuestionsBySector: Record<Sector, Question[]> = {
  eco: questionsBySector.eco,
  finance: questionsBySector.finance,
  medical: questionsBySector.medical,
};

// ─── SQL Sandbox (kept for reference but no longer main gate) ───
export interface SQLChallenge {
  scenario: string;
  tables: { name: string; columns: string[] }[];
  task: string;
  keywords: { keyword: string; label: string; check?: (s: string) => boolean }[];
  validate: (s: string) => boolean;
}

const ecoSQL: SQLChallenge = {
  scenario: "The Sustainability Director needs providers with Carbon Intensity above the fleet average for 2025.",
  tables: [
    { name: "Providers", columns: ["ProviderID", "Name", "Region"] },
    { name: "Shipments", columns: ["ShipmentID", "ProviderID", "ShipDate", "Carbon_Score"] },
  ],
  task: "Return provider Name and Average_Score where average Carbon_Score exceeds the fleet average.",
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
    return n.includes("select") && n.includes("join") && n.includes("avg") && n.includes("group by") && n.includes("having");
  },
};

export const sqlChallengeBySector: Record<Sector, SQLChallenge> = {
  eco: ecoSQL,
  finance: ecoSQL,
  medical: ecoSQL,
};
export const sqlChallenge = ecoSQL;
export const SQL_KEYWORDS = ecoSQL.keywords;
