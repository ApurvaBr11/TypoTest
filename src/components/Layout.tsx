import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Slider from "./Slider";

type SetValue<T> = Dispatch<SetStateAction<T>>;

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [value, setValue] = useState(() => {
    let currentValue;

    try {
      currentValue = JSON.parse(localStorage.getItem(key) || String(initialValue));
    } catch (error) {
      currentValue = initialValue;
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

interface Props {
  children: JSX.Element;
}

const defaultMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

function Layout({ children }: Props) {
  const [theme, setTheme] = useLocalStorage("wpm-app-darkmode", defaultMode ? "dark" : "light");

  const handleThemeMode = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className=' bgr'>
      <div className="slider" style={{ flexBasis: '50%' }}>
        <Slider />
      </div>
      <main className="main" style={{ flexBasis: '50%' }}>
        <div className='container'>{children}</div>
      </main>
    </div>
  );
  
}

export default Layout;
