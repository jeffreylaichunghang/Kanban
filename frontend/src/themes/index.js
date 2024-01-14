import { createContext } from "react";
import { theme } from "./themes";
import { desktopLayout as layout } from "./layout";

export const ThemeContext = createContext({ theme })
export const MediaQueryContext = createContext({ layout })
