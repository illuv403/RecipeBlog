import { createRoot } from "react-dom/client";
import AppTheme from "./components/theme/AppTheme";
import Blog from "./Blog";

createRoot(document.getElementById("root")).render(
  <AppTheme disableCustomTheme={false}>
    <Blog />
  </AppTheme>,
);
