export const checkerTheme = (theme) => {
    const themeEditor = localStorage.getItem("theme");

    if (themeEditor === "system") {
        return theme === "dark" ? "vs-dark" : "vs";
    } else {
        return themeEditor;
    }
}