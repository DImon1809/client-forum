import { FC, ReactNode, createContext, useState } from "react";

export interface IThemeProvider {
  children: ReactNode;
}

export interface IThemeContext {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: "light",
  toggleTheme: () => null,
});

const ThemeProvider: FC<IThemeProvider> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<string>(
    localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    if (currentTheme === "light") {
      localStorage.setItem("theme", "black");

      setCurrentTheme("black");
    }

    if (currentTheme === "black") {
      localStorage.setItem("theme", "light");

      setCurrentTheme("light");
    }
  };
  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      <main className={currentTheme === "light" ? "main" : "main black"}>
        {children}
      </main>
      ;
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
