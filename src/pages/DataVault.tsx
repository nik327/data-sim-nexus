import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { FolderOpen, FileText, FileJson, FileSpreadsheet, Download, Lock } from "lucide-react";

const files = [
  { name: "Logistics_Latency.csv", type: "CSV", size: "2.4 MB", icon: FileText, category: "Logistics" },
  { name: "Carbon_Emissions.json", type: "JSON", size: "1.8 MB", icon: FileJson, category: "Climate" },
  { name: "Agricultural_Yield_Variance.xlsx", type: "XLSX", size: "4.1 MB", icon: FileSpreadsheet, category: "Agriculture" },
  { name: "Fleet_Routing_Metrics.csv", type: "CSV", size: "3.2 MB", icon: FileText, category: "Logistics" },
  { name: "Supplier_Compliance_Audit.json", type: "JSON", size: "890 KB", icon: FileJson, category: "Compliance" },
  { name: "Regional_Climate_Indices.xlsx", type: "XLSX", size: "5.6 MB", icon: FileSpreadsheet, category: "Climate" },
];

const categories = [...new Set(files.map((f) => f.category))];

export default function DataVault() {
  const { role } = useUser();
  const navigate = useNavigate();

  if (role === "visitor") {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="text-center">
          <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Restricted Access</h2>
          <p className="text-muted-foreground mb-6">Complete the Gateway to access firm datasets.</p>
          <button onClick={() => navigate("/gateway")} className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold">
            Go to Gateway
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <FolderOpen className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Data Vault</h1>
          <span className="ml-auto text-xs font-mono text-muted-foreground uppercase tracking-wider">
            firm repository
          </span>
        </div>

        {categories.map((cat) => (
          <div key={cat} className="mb-8">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {cat}
            </h2>
            <div className="space-y-2">
              {files
                .filter((f) => f.category === cat)
                .map((file, i) => (
                  <motion.div
                    key={file.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors group"
                  >
                    <file.icon className="h-5 w-5 text-primary shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-mono text-foreground truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.type} • {file.size}</p>
                    </div>
                    <button className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition opacity-0 group-hover:opacity-100">
                      <Download className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
