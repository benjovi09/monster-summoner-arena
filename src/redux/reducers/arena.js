import { FightTypes } from '../../enums';

const defaultArena = {
  fightQueue: [/*
    {
      id: 1,
      type: FightTypes.DOUBLES,
      parties: [
        {
          name: 'Neck Slicers',
          composition: [
            {
              monsterId: 1,
              xPosition: 0,
              yPosition: 0,
            },
            {
              monsterId: 2,
              xPosition: 0,
              yPosition: 1,
            },
          ],
        },
        {
          name: 'Throat Cutters',
          composition: [
            {
              monsterId: 3,
              xPosition: 0,
              yPosition: 0,
            },
            {
              monsterId: 4,
              xPosition: 0,
              yPosition: 1,
            },
          ],
        },
      ],
    },*/
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
