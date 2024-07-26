document.addEventListener("DOMContentLoaded", function () {
    if (document.readyState === "interactive" || document.readyState === "complete") {
        console.log('index.............');
        common.initTheme();
        common.initMenu();
    }
});