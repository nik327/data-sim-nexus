import { FileText, FileJson, FileSpreadsheet } from "lucide-react";
import type { Sector } from "@/context/SectorContext";

export interface VaultFile {
  name: string;
  type: string;
  size: string;
  icon: typeof FileText;
  category: string;
}

const ecoFiles: VaultFile[] = [
  { name: "Logistics_Latency.csv", type: "CSV", size: "2.4 MB", icon: FileText, category: "Logistics" },
  { name: "Carbon_Emissions.json", type: "JSON", size: "1.8 MB", icon: FileJson, category: "Climate" },
  { name: "Agricultural_Yield_Variance.xlsx", type: "XLSX", size: "4.1 MB", icon: FileSpreadsheet, category: "Agriculture" },
  { name: "Fleet_Routing_Metrics.csv", type: "CSV", size: "3.2 MB", icon: FileText, category: "Logistics" },
  { name: "Supplier_Compliance_Audit.json", type: "JSON", size: "890 KB", icon: FileJson, category: "Compliance" },
  { name: "Regional_Climate_Indices.xlsx", type: "XLSX", size: "5.6 MB", icon: FileSpreadsheet, category: "Climate" },
];

const financeFiles: VaultFile[] = [
  { name: "Q4_Equity_Trading.csv", type: "CSV", size: "8.1 MB", icon: FileText, category: "Trading" },
  { name: "High_Frequency_Transactions.json", type: "JSON", size: "12.3 MB", icon: FileJson, category: "Trading" },
  { name: "Portfolio_Risk_Metrics.xlsx", type: "XLSX", size: "3.7 MB", icon: FileSpreadsheet, category: "Risk" },
  { name: "Suspicious_Transaction_Flags.csv", type: "CSV", size: "1.9 MB", icon: FileText, category: "Compliance" },
  { name: "Bond_Yield_Curves.json", type: "JSON", size: "2.4 MB", icon: FileJson, category: "Fixed Income" },
  { name: "Derivative_Exposure_Report.xlsx", type: "XLSX", size: "6.2 MB", icon: FileSpreadsheet, category: "Risk" },
];

const medicalFiles: VaultFile[] = [
  { name: "Patient_Readmission_Rates.csv", type: "CSV", size: "4.8 MB", icon: FileText, category: "Patient Data" },
  { name: "Clinical_Trial_Efficacy.xlsx", type: "XLSX", size: "7.2 MB", icon: FileSpreadsheet, category: "Research" },
  { name: "ICU_Bed_Occupancy.json", type: "JSON", size: "1.5 MB", icon: FileJson, category: "Operations" },
  { name: "Drug_Interaction_Matrix.csv", type: "CSV", size: "3.1 MB", icon: FileText, category: "Pharmacy" },
  { name: "Demographics_HIPAA_Clean.json", type: "JSON", size: "2.9 MB", icon: FileJson, category: "Patient Data" },
  { name: "Surgical_Outcome_Tracking.xlsx", type: "XLSX", size: "5.4 MB", icon: FileSpreadsheet, category: "Research" },
];

export const vaultFilesBySector: Record<Sector, VaultFile[]> = {
  eco: ecoFiles,
  finance: financeFiles,
  medical: medicalFiles,
};

export interface HubTask {
  id: string;
  title: string;
  status: string;
  day: number;
}

const ecoTasks: HubTask[] = [
  { id: "D01", title: "Audit Carbon Logs", status: "in-progress", day: 1 },
  { id: "D02", title: "Validate Supplier Compliance Data", status: "todo", day: 2 },
  { id: "D03", title: "Build Latency Distribution Chart", status: "todo", day: 3 },
  { id: "D04", title: "Regression Analysis: Yield vs. Temperature", status: "todo", day: 4 },
  { id: "D05", title: "Executive Summary Memo", status: "todo", day: 5 },
];

const financeTasks: HubTask[] = [
  { id: "D01", title: "Audit Suspicious Transaction Patterns", status: "in-progress", day: 1 },
  { id: "D02", title: "Reconcile Q4 Equity Portfolio Returns", status: "todo", day: 2 },
  { id: "D03", title: "Build Risk Exposure Heatmap", status: "todo", day: 3 },
  { id: "D04", title: "Analyze Bond Yield Curve Inversions", status: "todo", day: 4 },
  { id: "D05", title: "Regulatory Compliance Report", status: "todo", day: 5 },
];

const medicalTasks: HubTask[] = [
  { id: "D01", title: "Clean Patient Demographic Data for HIPAA Compliance", status: "in-progress", day: 1 },
  { id: "D02", title: "Analyze 30-Day Readmission Trends", status: "todo", day: 2 },
  { id: "D03", title: "Build ICU Occupancy Dashboard", status: "todo", day: 3 },
  { id: "D04", title: "Clinical Trial Efficacy Comparison", status: "todo", day: 4 },
  { id: "D05", title: "Department Performance Summary", status: "todo", day: 5 },
];

export const hubTasksBySector: Record<Sector, HubTask[]> = {
  eco: ecoTasks,
  finance: financeTasks,
  medical: medicalTasks,
};

export const sectorLabels: Record<Sector, string> = {
  eco: "Eco-Logistics",
  finance: "Financial Services",
  medical: "Medical Analytics",
};
