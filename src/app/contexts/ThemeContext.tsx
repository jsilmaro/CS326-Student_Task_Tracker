import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ColorTheme = "forest" | "ocean" | "lavender" | "sunset";
type ThemeMode = "light" | "dark";

interface ThemeContextType {
  colorTheme: ColorTheme;
  themeMode: ThemeMode;
  setColorTheme: (theme: ColorTheme) => void;
  setThemeMode: (mode: ThemeMode) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeColors = {
  forest: {
    light: {
      background: "#FAF8F3",
      primary: "#2d5016",
      accent: "#c85a3a",
      secondary: "#e8dcc8",
      muted: "#f5f0e8",
    },
    dark: {
      background: "#1a1f16",
      primary: "#7ea65d",
      accent: "#e8a87c",
      secondary: "#3a4432",
      muted: "#2d3328",
    },
  },
  ocean: {
    light: {
      background: "#f5f9fb",
      primary: "#0c5a7a",
      accent: "#ff6b35",
      secondary: "#d4e8f0",
      muted: "#e8f4f8",
    },
    dark: {
      background: "#0f1a1f",
      primary: "#4a9fbf",
      accent: "#ff8c61",
      secondary: "#1f3540",
      muted: "#1a2a32",
    },
  },
  lavender: {
    light: {
      background: "#faf8fc",
      primary: "#6b4c9a",
      accent: "#e85d75",
      secondary: "#e8dff5",
      muted: "#f3eef8",
    },
    dark: {
      background: "#1a161f",
      primary: "#a584d4",
      accent: "#f18c9e",
      secondary: "#352b45",
      muted: "#2a2333",
    },
  },
  sunset: {
    light: {
      background: "#fcf9f5",
      primary: "#d97706",
      accent: "#dc2626",
      secondary: "#fed7aa",
      muted: "#fef3e2",
    },
    dark: {
      background: "#1f1810",
      primary: "#fbbf24",
      accent: "#f87171",
      secondary: "#44311f",
      muted: "#332510",
    },
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>("forest");
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme-preferences");
    if (saved) {
      const { colorTheme: savedColor, themeMode: savedMode } = JSON.parse(saved);
      setColorTheme(savedColor);
      setThemeMode(savedMode);
    }
  }, []);

  useEffect(() => {
    const colors = themeColors[colorTheme][themeMode];
    const root = document.documentElement;

    // Apply theme colors
    root.style.setProperty("--background", colors.background);
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--accent", colors.accent);
    root.style.setProperty("--secondary", colors.secondary);
    root.style.setProperty("--muted", colors.muted);

    // Update foreground colors based on mode
    if (themeMode === "dark") {
      root.style.setProperty("--foreground", "#f5f5f5");
      root.style.setProperty("--card", colors.background);
      root.style.setProperty("--popover", colors.background);
      root.style.setProperty("--primary-foreground", "#ffffff");
      root.style.setProperty("--accent-foreground", "#ffffff");
      root.style.setProperty("--secondary-foreground", "#f5f5f5");
      root.style.setProperty("--muted-foreground", "#a0a0a0");
      root.style.setProperty("--border", "rgba(255, 255, 255, 0.15)");
      root.style.setProperty("--input-background", colors.muted);
      root.style.setProperty("--sidebar", colors.background);
      root.style.setProperty("--sidebar-foreground", "#f5f5f5");
      root.style.setProperty("--sidebar-primary", colors.primary);
      root.style.setProperty("--sidebar-accent", colors.muted);
      root.style.setProperty("--sidebar-border", "rgba(255, 255, 255, 0.15)");
    } else {
      root.style.setProperty("--foreground", "#1a1512");
      root.style.setProperty("--card", "#ffffff");
      root.style.setProperty("--popover", "#ffffff");
      root.style.setProperty("--primary-foreground", "#ffffff");
      root.style.setProperty("--accent-foreground", "#ffffff");
      root.style.setProperty("--secondary-foreground", "#1a1512");
      root.style.setProperty("--muted-foreground", "#6b5d52");
      root.style.setProperty("--border", "rgba(45, 80, 22, 0.12)");
      root.style.setProperty("--input-background", "#ffffff");
      root.style.setProperty("--sidebar", "#ffffff");
      root.style.setProperty("--sidebar-foreground", "#1a1512");
      root.style.setProperty("--sidebar-primary", colors.primary);
      root.style.setProperty("--sidebar-accent", colors.muted);
      root.style.setProperty("--sidebar-border", "rgba(45, 80, 22, 0.12)");
    }

    localStorage.setItem(
      "theme-preferences",
      JSON.stringify({ colorTheme, themeMode })
    );
  }, [colorTheme, themeMode]);

  const resetTheme = () => {
    setColorTheme("forest");
    setThemeMode("light");
  };

  return (
    <ThemeContext.Provider
      value={{ colorTheme, themeMode, setColorTheme, setThemeMode, resetTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

export { themeColors };
export type { ColorTheme, ThemeMode };
