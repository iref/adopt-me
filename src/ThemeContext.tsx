import { createContext } from "react";

const ThemeContext = createContext<[string, (theme: string) => void]>([
  "orange",
  () => {}
]);

export default ThemeContext;
