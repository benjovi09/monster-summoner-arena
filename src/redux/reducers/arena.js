import { FightTypes } from '../../enums';

const defaultArena = {
  fightQueue: [
    {
      id: 1,
      type: FightTypes.SINGLES,
    },
  ],
};

export default function (state = defaultArena, action) {
  switch (action.type) {
    case 'addFightQueue':
      return { ...state, fightQueue: [...state.fightQueue, action.data.fight] };
    default:
      return state;
  }
}
