/** @type {import('tailwindcss').Config} */
// import { platformSelect } from "nativewind/theme";

module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        text: "#ECEDEE",
        background: "#070024",
        tint: "#7F98FF",
        icon: "#9BA1A6",
      },
      fontFamily: {
        outfit: ["Outfit_400Regular", "sans-serif"],
        "outfit-bold": ["Outfit_700Bold", "sans-serif"],
        "outfit-light": ["Outfit_300Light", "sans-serif"],
        righteous: ["Righteous_400Regular", "serif"],
      },
    },
  },
  plugins: [],
};
