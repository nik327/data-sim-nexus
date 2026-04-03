import type { Sector } from "@/context/SectorContext";

export interface CrisisScenario {
  title: string;
  message: string;
  sensorLabel: string;
  table: string;
  column: string;
  outlierCondition: string;
  avgCondition: string;
  correctPatterns: string[];
  hint: string;
  sampleData: { sensor: string; value: number }[];
}

const ecoScenario: CrisisScenario = {
  title: "Eco-Logistics Sensor Array 07",
  message: "CRITICAL ALERT: Anomalous Data detected in Eco-Logistics Sensor Array 07. Automated systems failing.",
  sensorLabel: "Sensor_ID",
  table: "Sensor_Readings",
  column: "Temperature",
  outlierCondition: "< 5",
  avgCondition: "> 30",
  correctPatterns: [
    "subquery", "having", "avg(", "avg (", "< 5", "temperature",
  ],
  hint: "Find the Sensor_ID where Temperature < 5 while the overall average Temperature > 30. Use a subquery or HAVING clause.",
  sampleData: [
    { sensor: "S-001", value: 34 },
    { sensor: "S-002", value: 31 },
    { sensor: "S-003", value: 2 },
    { sensor: "S-004", value: 33 },
    { sensor: "S-005", value: 35 },
    { sensor: "S-006", value: 29 },
    { sensor: "S-007", value: 32 },
    { sensor: "S-008", value: 36 },
  ],
};

const financeScenario: CrisisScenario = {
  title: "Transaction Gateway Node 12",
  message: "CRITICAL ALERT: Anomalous Data detected in Transaction Gateway Node 12. Fraud detection systems offline.",
  sensorLabel: "Node_ID",
  table: "Transaction_Nodes",
  column: "Latency_ms",
  outlierCondition: "> 5000",
  avgCondition: "< 200",
  correctPatterns: [
    "subquery", "having", "avg(", "avg (", "> 5000", "latency",
  ],
  hint: "Find the Node_ID where Latency_ms > 5000 while the overall average Latency_ms < 200. Use a subquery or HAVING clause.",
  sampleData: [
    { sensor: "N-001", value: 120 },
    { sensor: "N-002", value: 185 },
    { sensor: "N-003", value: 5432 },
    { sensor: "N-004", value: 95 },
    { sensor: "N-005", value: 140 },
    { sensor: "N-006", value: 210 },
    { sensor: "N-007", value: 160 },
    { sensor: "N-008", value: 110 },
  ],
};

const medicalScenario: CrisisScenario = {
  title: "ICU Telemetry Bank 03",
  message: "CRITICAL ALERT: Anomalous Data detected in ICU Telemetry Bank 03. Patient monitoring degraded.",
  sensorLabel: "Device_ID",
  table: "Telemetry_Readings",
  column: "Heart_Rate",
  outlierCondition: "> 200",
  avgCondition: "< 80",
  correctPatterns: [
    "subquery", "having", "avg(", "avg (", "> 200", "heart_rate",
  ],
  hint: "Find the Device_ID where Heart_Rate > 200 while the overall average Heart_Rate < 80. Use a subquery or HAVING clause.",
  sampleData: [
    { sensor: "D-001", value: 72 },
    { sensor: "D-002", value: 68 },
    { sensor: "D-003", value: 245 },
    { sensor: "D-004", value: 75 },
    { sensor: "D-005", value: 80 },
    { sensor: "D-006", value: 71 },
    { sensor: "D-007", value: 77 },
    { sensor: "D-008", value: 65 },
  ],
};

export const crisisBySector: Record<Sector, CrisisScenario> = {
  eco: ecoScenario,
  finance: financeScenario,
  medical: medicalScenario,
};

export function validateCrisisQuery(query: string, scenario: CrisisScenario): boolean {
  const lower = query.toLowerCase().replace(/\s+/g, " ");
  const hasStructure = scenario.correctPatterns.filter(p => lower.includes(p.toLowerCase())).length >= 3;
  const hasSelect = lower.includes("select");
  return hasSelect && hasStructure;
}

// Generate fake live log entries
const ecoLogs = [
  "▸ [07:14:02] Sensor S-003 — Temperature: 2°C ⚠",
  "▸ [07:14:03] Sensor S-001 — Temperature: 34°C ✓",
  "▸ [07:14:04] Sensor S-007 — Temperature: 32°C ✓",
  "▸ [07:14:05] Sensor S-003 — Temperature: 1°C ⚠ ANOMALY",
  "▸ [07:14:06] Sensor S-005 — Temperature: 35°C ✓",
  "▸ [07:14:07] System: Automated correction FAILED on S-003",
  "▸ [07:14:08] Sensor S-004 — Temperature: 33°C ✓",
  "▸ [07:14:09] Sensor S-003 — Temperature: 3°C ⚠ CRITICAL",
];

const financeLogs = [
  "▸ [09:22:01] Node N-003 — Latency: 5432ms ⚠",
  "▸ [09:22:02] Node N-001 — Latency: 120ms ✓",
  "▸ [09:22:03] Node N-005 — Latency: 140ms ✓",
  "▸ [09:22:04] Node N-003 — Latency: 5891ms ⚠ ANOMALY",
  "▸ [09:22:05] Node N-004 — Latency: 95ms ✓",
  "▸ [09:22:06] System: Fraud detection bypass on N-003",
  "▸ [09:22:07] Node N-006 — Latency: 210ms ✓",
  "▸ [09:22:08] Node N-003 — Latency: 6102ms ⚠ CRITICAL",
];

const medicalLogs = [
  "▸ [03:45:01] Device D-003 — HR: 245 bpm ⚠",
  "▸ [03:45:02] Device D-001 — HR: 72 bpm ✓",
  "▸ [03:45:03] Device D-005 — HR: 80 bpm ✓",
  "▸ [03:45:04] Device D-003 — HR: 252 bpm ⚠ ANOMALY",
  "▸ [03:45:05] Device D-004 — HR: 75 bpm ✓",
  "▸ [03:45:06] System: Alert escalation on D-003",
  "▸ [03:45:07] Device D-007 — HR: 77 bpm ✓",
  "▸ [03:45:08] Device D-003 — HR: 261 bpm ⚠ CRITICAL",
];

export const liveLogsBySector: Record<Sector, string[]> = {
  eco: ecoLogs,
  finance: financeLogs,
  medical: medicalLogs,
};
