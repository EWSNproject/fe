import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core"; 
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider withGlobalStyles withNormalizeCSS> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MantineProvider>
);
