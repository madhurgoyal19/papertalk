import React, { createContext, useState } from "react";

const ThemeContext = createContext("light");

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

const ThemeContextProvider = (props: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState<string>("light");

  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
