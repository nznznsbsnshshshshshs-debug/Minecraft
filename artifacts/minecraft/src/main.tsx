import { createRoot } from "react-dom/client";
import App from "./App";
import { PerformanceProvider } from "./lib/performance";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <PerformanceProvider>
    <App />
  </PerformanceProvider>
);
