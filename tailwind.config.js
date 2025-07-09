/** @type {import('tailwindcss').Config} */
import { platformSelect } from "nativewind/theme";

module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: platformSelect({
          ios: "Outfit_400Regular",
          android: "Outfit_400Regular",
          default: "sans-serif",
        }), // ["Outfit_400Regular", "sans-serif"],
        serif: platformSelect({
          ios: "Righteous_400Regular",
          android: "Righteous_400Regular",
          default: "serif",
        }), // ["Righteous_400Regular", "serif"],
        Righteous: platformSelect({
          ios: "Righteous_400Regular",
          android: "Righteous_400Regular",
          default: "serif",
        }),
      },
    },
  },
  plugins: [],
};
