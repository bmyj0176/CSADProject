import React, { createContext, useState, useContext, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    // Initialize theme from localStorage
    useEffect(() => {
        const storedTheme = localStorage.getItem("darktheme_bool");
        if (storedTheme) {
            setIsDarkTheme(JSON.parse(storedTheme));
        } else {
            localStorage.setItem("darktheme_bool", JSON.stringify(true));
        }
    }, []);

    // Apply the theme whenever isDarkTheme changes
    useEffect(() => {
        const themeLink = document.getElementById("lightdarkmode");
        const targetElement = document.getElementById("theme-target");

        if (isDarkTheme) {
            // Apply dark mode
            themeLink.href = "../stylesheets/darkmode.css";
            targetElement.classList.remove("dark");
            targetElement.classList.add("light");
        } else {
            // Apply light mode
            themeLink.href = "../stylesheets/lightmode.css";
            targetElement.classList.remove("light");
            targetElement.classList.add("dark");
        }
    }, [isDarkTheme]);

    const changeTheme = (theme) => {
        setIsDarkTheme(theme);
        localStorage.setItem("darktheme_bool", JSON.stringify(theme));
    };

    return (
        <ThemeContext.Provider value={{ isDarkTheme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const ToggleThemeButton = () => {
    const { isDarkTheme, changeTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        changeTheme(!isDarkTheme);
    };

    return (
        <div className="tooltip">
            <button 
            title="Toggle Theme"
            id="theme-target"
            className={isDarkTheme ? "dark" : "light"} 
            onClick={toggleTheme}/>
            <span className="tooltip-text">Toggle Theme</span>
        </div>
    );
};

export default ToggleThemeButton;
