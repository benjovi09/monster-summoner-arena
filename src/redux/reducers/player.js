import { Goblin, Kobold } from '../../monster-templates';
import { GenerateMonsterFromTemplate } from '../../utils';


export const defaultPlayer = {
  money: 25,
  summoningPower: 1,
  maxMonsterCountSize: 5,
  maxMonsterPartySize: 2,/*
  monsters: [
    defaultGoblin,
    defaultKobold1,
    defaultKobold2,
    defaultKobold3,
    defaultKobold4,
  ],
  monsterParties: [
    { name: 'party1', monsters: [defaultGoblin, defaultKobold1] },
    { name: 'party2', monsters: [defaultKobold2, defaultKobold3, defaultKobold4]},
  ],*/
};

export default function (state = defaultPlayer, action) {
  switch (action.type) {
    case 'purchase':
      switch (action.data.type) {
        case 'monster':
          if (
            state.money > action.data.price &&
            state.monsters.count < state.maxMonsterCountSize
          )
            return {
              ...state,
              money: state.money - action.data.price,
              monsters: [...state.monsters, action.data.monster],
            };
        case 'upgrade':
          throw 'player update action not implemented';
        default:
          return state;
      }
    default:
      return state;
  }
}
