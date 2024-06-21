function ready(callback) {
    if (callback && typeof callback === 'function') {
        document.addEventListener("DOMContentLoaded", function () {
            if (document.readyState === "interactive" || document.readyState === "complete") {
                return callback();
            }
        });
    }
}

function toggleMenu(el) {
    console.log('toggleMenu.....')
}

function toggleTheme(el) {
    console.log('toggleTheme.....')
}