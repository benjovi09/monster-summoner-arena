import { CalculateMaxDamageForMonster } from '../../utils';

export const defaultMonsters = [];

export default function (state = defaultMonsters, action) {
  switch (action.type) {
    case 'addMonster':
      return [...state, action.data.monster];
    case 'MONSTER_TAKE_DAMAGE':
      return state.map((monster) => {
        if (monster.id == action.data.id) {
          if (monster.damage >= CalculateMaxDamageForMonster(monster)) {
            return {
              ...monster,
              damage: monster.damage + action.data.damage,
              status: [...monster.status, 'UNCONSCIOUS'],
            };
          } else return { ...monster, damage: monster.damage + action.data.damage };
        } else return monster;
      });
    case 'MONSTER_DEATH':
      return state.map((monster) => {
        if(monster.id === action.data.id){
          // return some value of some currency to owner
        }
        else if (monster.id === action.data.killedById){
          // give monster some sort of bonus
          // K/D tracking
        }
      });
    default:
      return state;
  }
}
