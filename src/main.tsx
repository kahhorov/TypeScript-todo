import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import DataContext from "./context/DataContext.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <DataContext>
    <ToastContainer position="top-right" />
    <App />
  </DataContext>,
);
