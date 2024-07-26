const { generateFadeColor } = require('../js/css-util');

document.addEventListener("DOMContentLoaded", function () {
    if (document.readyState === "interactive" || document.readyState === "complete") {

        const primaryVariables = document.getElementById('primary-variables');

        if (primaryVariables) {
            const primaryObj = generateFadeColor("primary", "#cccccc");

            primaryVariables.innerHTML = '';
            Object.entries(primaryObj).forEach(obj => {
                console.log(`--${obj[0]} : ${obj[1].hex}`);

                let div = document.createElement('div');
                div.classList.add("block", "w-28", "border", "leading-10", "text-sm", "text-center");
                div.style.backgroundColor = obj[1].hex;
                div.style.color = obj[1].isDark ? '#ffffff' : '#000000';
                div.style.borderColor = obj[1].isDark ? '#ffffff' : '#000000';
                div.innerHTML = obj[1].hex;
                primaryVariables.append(div);
            })
        }
    }
});