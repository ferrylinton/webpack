const fs = require('fs');
const path = require('path');
const plugin = require('tailwindcss/plugin')
const { toTailwindColors } = require('./src/js/css-util');
const variableJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "variable.json"), 'utf-8'));

function addZindex() {
  let result = {};
  let zindex = 990

  for (let i = 0; i < 20; i++) {
      let value = zindex - (i*10);
      result[`.z-${value}`] = {
          'z-index': value
      }
  }

  return result;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: ["./src/**/*.{html,js,hbs}"],
  theme: {
    extend: {
      colors: {
        ...toTailwindColors(variableJson)
      }
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ...addZindex()
      })
    })
  ],
}

