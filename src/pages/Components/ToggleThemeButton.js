import React, { createContext, useState, useContext, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    
    useEffect(() => {
        const storedTheme = localStorage.getItem("darktheme_bool");
        if (storedTheme) {
            setIsDarkTheme(JSON.parse(storedTheme));
        } else {
            localStorage.setItem("darktheme_bool", JSON.stringify(true));
        }
    }, []);

    
    useEffect(() => {
        const themeLink = document.getElementById("lightdarkmode");
        const targetElement = document.getElementById("theme-target");

        if (isDarkTheme) {
            
            themeLink.href = "../stylesheets/darkmode.css";
            targetElement.classList.remove("dark");
            targetElement.classList.add("light");
        } else {
            
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
            id="theme-target"
            className={isDarkTheme ? "dark" : "light"} 
            onClick={toggleTheme}/>
            <span className="tooltip-text">Toggle Theme</span>
        </div>
    );
};

export default ToggleThemeButton;
