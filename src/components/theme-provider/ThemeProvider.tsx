import { FC, ReactNode, createContext, useState } from "react";

export interface IThemeProvider {
  children: ReactNode;
}

export interface IThemeContext {
  theme: string;
  isEditProfile: boolean;
  toggleTheme: () => void;
  toggleGlobalWrapper: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: "light",
  isEditProfile: false,
  toggleTheme: () => null,
  toggleGlobalWrapper: () => null,
});

const ThemeProvider: FC<IThemeProvider> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<string>(
    localStorage.getItem("theme") || "light"
  );
  const [active, setActive] = useState<boolean>(false);
  const [isEditProfile, setIsEditProfile] = useState<boolean>(false);

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

  const toggleGlobalWrapper = () => {
    setActive(!active);
    setIsEditProfile(!isEditProfile);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        isEditProfile,
        toggleTheme,
        toggleGlobalWrapper,
      }}
    >
      <main className={currentTheme === "light" ? "main" : "main black"}>
        {children}
        <div
          className={active ? "global-wrapper active" : "global-wrapper"}
          onClick={toggleGlobalWrapper}
        ></div>
      </main>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
