module.exports = function (api) {
    api.cache(true);
    console.log("aaaaaaaaaaaaaaa")
    return {
        plugins: [
            ["module-resolver", {
                "alias": {
                    "~": "./src"
                },
            }]
        ],
        presets: ["@babel/preset-react"],
    }
}
