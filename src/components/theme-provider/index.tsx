import { FC, ReactNode, useState, createContext } from "react";

interface IThemeContextType {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContextType>({
  theme: "dark",
  toggleTheme: () => null,
});

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const storedTheme = localStorage.getItem("theme");
  const currentTheme = storedTheme ? (storedTheme as "dark" | "light") : "dark";

  const [theme, setTheme] = useState(currentTheme);

  const toggleTheme = () => {
    setTheme((state) => {
      const newTheme = state === "light" ? "dark" : "light";

      localStorage.setItem("theme", newTheme);

      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className={`main ${theme}`}>{children}</main>
    </ThemeContext.Provider>
  );
};
