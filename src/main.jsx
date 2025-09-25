import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";   
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { StoreProvider } from "./hooks/useGlobalReducer";

function App() {
  return (
    <React.StrictMode>
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

