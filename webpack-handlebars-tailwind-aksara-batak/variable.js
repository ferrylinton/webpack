const fs = require('fs');
const path = require('path');
const watch = require('node-watch');
const { toCssVars } = require('./src/js/css-util');
const isDev = process.env.NODE_ENV === 'development' ? true : false;

initCssVariables();

function initCssVariables() {
    const variableJson =  JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "variable.json"), 'utf-8'));
    const file = path.resolve(process.cwd(), "src", "css", "variable.css");

    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
    }

    fs.writeFileSync(file, toCssVars(variableJson), {
        encoding: "utf8",
        flag: "a+"
    });

}

if(isDev){
    watch(path.resolve(process.cwd(), "variable.json"), function () {
        try {
            initCssVariables();
        } catch (error) {
            console.log(error);
        }
    });
}
