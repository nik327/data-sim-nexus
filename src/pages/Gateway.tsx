import { Navigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

export default function Gateway() {
  const { role } = useUser();

  if (role === "junior-analyst") {
    return <Navigate to="/hub" replace />;
  }
  return <Navigate to="/assessment-briefing" replace />;
}
