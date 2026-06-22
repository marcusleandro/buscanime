import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

const container = document.getElementById("root")!
const root = createRoot(container)

root.render(
  <StrictMode>
    <ThemeProvider storageKey="theme-buscanime">
      <App />
    </ThemeProvider>
  </StrictMode>
)
