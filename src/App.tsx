import { BrowserRouter } from "react-router-dom";
import { getApps } from "./utils/helper";
import type { ComponentType } from "react";

export default function App() {
  const CurrentApp = getApps() as ComponentType;
  return (
    <BrowserRouter>
      <CurrentApp />
    </BrowserRouter>
  );
}
