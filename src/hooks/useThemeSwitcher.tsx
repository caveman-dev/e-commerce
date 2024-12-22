import { useEffect } from 'react';
import useGlobalStore from '../store/store';

const themes = {
    // light: new URL('primereact/resources/themes/lara-light-teal/theme.css', import.meta.url),
    // dark: new URL('primereact/resources/themes/lara-dark-teal/theme.css', import.meta.url),
    light: new URL('primereact/resources/themes/lara-light-blue/theme.css', import.meta.url),
    dark: new URL('primereact/resources/themes/lara-dark-blue/theme.css', import.meta.url),
};

const useThemeSwitcher = () => {
    const { theme, toggleTheme } = useGlobalStore();

    useEffect(() => {
        const previousThemeLink = document.querySelector('link[data-theme]');
        if (previousThemeLink) {
            previousThemeLink.remove();
        }

        const loadTheme = async () => {
            // @ts-ignore
            const themeUrl = themes[theme];
            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            // @ts-ignore
            linkElement.href = themeUrl;
            linkElement.setAttribute('data-theme', theme);
            document.head.appendChild(linkElement);
        };

        loadTheme();
    }, [theme]);

    return { theme, toggleTheme };
};

export default useThemeSwitcher;
