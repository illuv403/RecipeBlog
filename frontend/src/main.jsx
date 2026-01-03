import { createRoot } from "react-dom/client";
import AppTheme from "./components/theme/AppTheme";
import Blog from "./Blog";
import "./config/i18n";
import { Suspense } from "react";

createRoot(document.getElementById("root")).render(
  <Suspense fallback=<div>Loading...</div>>
    <AppTheme disableCustomTheme={false}>
      <Blog />
    </AppTheme>
  </Suspense>,
);
