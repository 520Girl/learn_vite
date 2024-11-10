/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./node_modules/flyonui/dist/js/*.js",
        "./*.{html,js}",
        "./index.html",
    ], // Require only if you want to use FlyonUI JS component
    theme: {
        extend: {},
    },
    plugins: [
        require("flyonui"),
        require("flyonui/plugin") // Require only if you want to use FlyonUI JS component
    ],
    flyonui: {
        themes: [
            "light", // Default font family
            "dark", // Default font family
            "gourmet", // fontFamily: 'Rubik'
            "corporate", // fontFamily: 'Public Sans'
            "luxury", // fontFamily: 'Archivo'
            "soft" // fontFamily: 'Montserrat'
        ]
    }
}