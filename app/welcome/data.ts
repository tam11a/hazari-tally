export type Data = {
  id: number;
  image: any;
  title: string;
  text: string;
};

const data: Data[] = [
  {
    id: 1,
    image: require("@/assets/icons/ob-1.png"),
    title: "Cool Scoreboard",
    text: "Enjoy a sleek, interactive scoreboard designed to keep the fun going.",
  },
  {
    id: 2,
    image: require("@/assets/icons/ob-2.png"),
    title: "Instant Tally",
    text: "Add scores effortlessly and let Hazari Tally handle the calculations for every round.",
  },
  {
    id: 3,
    image: require("@/assets/icons/ob-3.png"),
    title: "Game History",
    text: "Save and revisit your games anytime. Never lose track of past scores!",
  },
  {
    id: 4,
    image: require("@/assets/icons/ob-4.png"),
    title: "Ready to Play?",
    text: "Create your first game now and experience hassle-free score tracking!",
  },
];

export default data;
