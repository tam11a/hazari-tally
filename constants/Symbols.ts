const CardSymbols = {
  spades: {
    emoji: "♠️",
    image: require("@/assets/symbols/spades.png"),
    // svg: require("@/assets/symbols/spades.svg"),
  },
  clubs: {
    emoji: "♣️",
    image: require("@/assets/symbols/clubs.png"),
    // svg: require("@/assets/symbols/clubs.svg"),
  },
  hearts: {
    emoji: "♥️",
    image: require("@/assets/symbols/hearts.png"),
    // svg: require("@/assets/symbols/hearts.svg"),
  },
  diamonds: {
    emoji: "♦️",
    image: require("@/assets/symbols/diamonds.png"),
    // svg: require("@/assets/symbols/diamonds.svg"),
  },
};

export const getCardImage = (symbol: keyof typeof CardSymbols) => {
  return CardSymbols[symbol]?.image || require("@/assets/symbols/hearts.png");
};

export default CardSymbols;
