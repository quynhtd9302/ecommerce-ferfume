import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";
type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === "light" || stored === "dark") {
            return stored;
        }
    } catch {
        // localStorage unavailable (private mode, disabled cookies, etc.)
    }

    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const useDarkMode = (): { theme: Theme; toggleTheme: () => void } => {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        try {
            window.localStorage.setItem(STORAGE_KEY, theme);
        } catch {
            // localStorage unavailable
        }
    }, [theme]);

    const toggleTheme = useCallback((): void => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    }, []);

    return { theme, toggleTheme };
};
