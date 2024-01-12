/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary1: "#82C0CC", //light blue
        primary2: "#306AFF", //dark blue
        primary3: "#EDE7E3", //gray
        primary4: "#FFFFFF", //white
        primary5: "#489FB5", //blue-white
        ColorRed: "#FF0000",
      },
      fontSize: {
        size1: "35px",
        size2: "27px",
        size3: "19px",
        size4: "16px",
      },

      fontFamily: {
        roboto: ["Roboto", "sans"],
      },

      screens: {
        md: "768px",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
