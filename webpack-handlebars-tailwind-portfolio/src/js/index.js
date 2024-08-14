const { ImageSlider } = require('../js/image-slider');
const { ToggleTheme } = require('../js/toggle-theme');
const { SlidingIndicatorMenu } = require('../js/sliding-indicator-menu');

document.addEventListener("DOMContentLoaded", function () {
    if (document.readyState === "interactive" || document.readyState === "complete") {
        SlidingIndicatorMenu.init();
        ToggleTheme.init();
        ImageSlider.init('.project-slider');
    }
});