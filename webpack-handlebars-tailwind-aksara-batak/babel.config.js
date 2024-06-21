module.exports = {
    presets: [
        ["@babel/preset-env", {
            "modules": "commonjs",
            "targets": {
                "esmodules": true,
                "node": true
            }
        },
        ],
    ],
    plugins: [
        ["@babel/plugin-transform-modules-commonjs", {
            "strictMode": false
        }]
    ]
};