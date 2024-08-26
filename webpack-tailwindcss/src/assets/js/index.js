document.addEventListener("DOMContentLoaded", function () {
    if (document.readyState === "interactive" || document.readyState === "complete") {
        common.sayHello();
        clock.startTime();
    }
});