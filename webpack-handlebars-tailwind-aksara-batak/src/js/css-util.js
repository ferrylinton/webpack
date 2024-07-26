const tinycolor = require("tinycolor2");
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

function toTailwindColors(colorObj) {
    let result = {};
    let theme = colorObj[':root'];

    Object.entries(theme).forEach(cssVar => {
        if (cssVar[1].hex) {
            shades.forEach(shade => {
                result[`${cssVar[0]}-${shade}`] = `rgb(var(--${cssVar[0]}-${shade}) / <alpha-value>)`;
            })
        } else {
            result[cssVar[0]] = `rgb(var(--${cssVar[0]}) / <alpha-value>)`
        }
    })

    return result;
}

function toCssVars(colorObj) {
    let result = ''
    Object.entries(colorObj).forEach(theme => {
        result += `${theme[0]}{\n`;
        Object.entries(theme[1]).forEach(cssVar => {
            if (cssVar[1].hex) {
                const shades = generateFadeColor(cssVar[0], cssVar[1].hex, theme[0]);
                Object.entries(shades).forEach(cssVar => {
                    result += `\t--${cssVar[0]} : ${cssVar[1].rgb}; \n`;
                    result += `\t--${cssVar[0]}-hex : ${cssVar[1].hex}; \n`;
                })

            } else {
                result += `\t--${cssVar[0]} : ${toRgbVariable(cssVar[1])}; \n`;
                result += `\t--${cssVar[0]}-hex : ${cssVar[1]}; \n`;
            }
        })
        result += '}\n';
    })

    return result;
}

function toRgbVariable(color) {
    let colorObj = tinycolor(color);
    return colorObj.toRgbString().replace('rgb(', '').replace(')', '').replaceAll(',', '')
}

function generateFadeColor(prefix, color, theme) {
    let result = {};
    let hslObj = tinycolor(color).toHsl();

    shades.forEach(shade => {
        let l = (theme === '.dark') ? (shade / 1000) : ((1000 - shade) / 1000);
        let colorObj = tinycolor({ ...hslObj, l });
        result[`${prefix}-${shade}`] = {
            hex: colorObj.toHexString(),
            rgb: colorObj.toRgbString().replace('rgb(', '').replace(')', '').replaceAll(',', ''),
            isDark: shade > 400
        }
    })

    return result;
};

module.exports = {
    toCssVars,
    toTailwindColors,
    generateFadeColor,
    toRgbVariable
}