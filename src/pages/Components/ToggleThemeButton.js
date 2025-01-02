import React, { useEffect } from 'react';

const ToggleThemeButton = () => {
    
    // on first load, update theme; default = true
    useEffect(() => {
        const storedTheme = localStorage.getItem("darktheme_bool");
        storedTheme ? 
        // already has a theme
        change_theme(JSON.parse(storedTheme)) : 
        // no theme
        
        change_theme(true)
    }, []);

    const toggle_theme = () => {
        change_theme(!JSON.parse(localStorage.getItem("darktheme_bool")))
    }

    const change_theme = (isDarkTheme) => {
        localStorage.setItem("darktheme_bool", JSON.stringify(isDarkTheme));
        const themeLink = document.getElementById("lightdarkmode");
        const targetElement = document.getElementById("theme-target");
        if (!isDarkTheme) {
            themeLink.href = "../stylesheets/lightmode.css";
            targetElement.classList.remove("light");
            targetElement.classList.add("dark");
        } else {
            themeLink.href = "../stylesheets/darkmode.css";
            targetElement.classList.remove("dark");
            targetElement.classList.add("light");
        }
    }

    return (
        <button id="theme-target" className="light" onClick={toggle_theme}/> 
    )
}

export default ToggleThemeButton