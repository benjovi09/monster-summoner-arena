import { Goblin, Kobold } from "../../monster-templates";

export const defaultMarkets = {
  priceFactor: -0.5,
  monsters: {
    availableMonsterTemplates: [Goblin, Kobold],
  },
  weapons: {
    availableWeapons: [
      {
        name: "short sword",
        weight: 2,
        sharpness: 0.78,
        piercing: 0.4,
      },
    ],
  },
};

export default function (state = defaultMarkets, action) {
  switch (action.type) {
    case "purchase":
      return state;
    default:
      return state;
  }
}
