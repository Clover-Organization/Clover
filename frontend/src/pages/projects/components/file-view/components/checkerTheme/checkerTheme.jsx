export const checkerTheme = (theme) => {
    const bgTheme = localStorage.getItem("vite-ui-theme");

    if (theme === "system") {
        console.log(bgTheme === "dark" ? "vs-dark" : "vs");
        return bgTheme === "dark" ? "vs-dark" : "vs";
    } else {
        return theme;
    }
}