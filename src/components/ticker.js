import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GenerateUUID, GenerateMonsterFromTemplate } from '../utils';
import { FightTypes } from '../enums';
import { Goblin, Kobold } from '../monster-templates';


let partyCount=0;
export default function () {
  const ticker = useSelector((state) => state.tickerReducer);
  const arena = useSelector((state) => state.arenaReducer);

  const dispatch = useDispatch();

  function GenerateParty(monsters) {
    let x = 0,
      y = 0;

    return {
      name: `Party ${partyCount++}`,
      composition: monsters.map((monster) => {
        return {
          monsterId: monster.id,
          xPosition: x++,
          yPosition: y,
        };
      }),
    };
  }

  function GenerateRandomPartiesForFightType(fightType) {
    switch (fightType) {
      case FightTypes.SINGLES:
        return [
          GenerateParty([GenerateMonsterFromTemplate(dispatch, Goblin)]),
          GenerateParty([GenerateMonsterFromTemplate(dispatch, Kobold)]),
        ];
      case FightTypes.DOUBLES:
        return [
          GenerateParty([GenerateMonsterFromTemplate(dispatch, Goblin), GenerateMonsterFromTemplate(dispatch, Goblin)]),
          GenerateParty([GenerateMonsterFromTemplate(dispatch, Kobold), GenerateMonsterFromTemplate(dispatch, Goblin)]),
        ];
      case FightTypes.TRIOS:
        return [
          GenerateParty([
            GenerateMonsterFromTemplate(dispatch, Kobold),
            GenerateMonsterFromTemplate(dispatch, Kobold),
            GenerateMonsterFromTemplate(dispatch, Goblin),
          ]),
          GenerateParty([
            GenerateMonsterFromTemplate(dispatch, Kobold),
            GenerateMonsterFromTemplate(dispatch, Kobold),
            GenerateMonsterFromTemplate(dispatch, Kobold),
          ]),
        ];
      case FightTypes.QUADS:
        return [
          GenerateParty([
            GenerateMonsterFromTemplate(dispatch, Kobold),
            GenerateMonsterFromTemplate(dispatch, Kobold),
            GenerateMonsterFromTemplate(dispatch, Kobold),
            GenerateMonsterFromTemplate(dispatch, Goblin),
          ]),
          GenerateParty([
            GenerateMonsterFromTemplate(dispatch, Kobold),
            GenerateMonsterFromTemplate(dispatch, Kobold),
            GenerateMonsterFromTemplate(dispatch, Kobold),
            GenerateMonsterFromTemplate(dispatch, Kobold),
          ]),
        ];
      case FightTypes.FFA:
        return [
          GenerateParty([GenerateMonsterFromTemplate(dispatch, Goblin)]),
          GenerateParty([GenerateMonsterFromTemplate(dispatch, Kobold)]),
          GenerateParty([GenerateMonsterFromTemplate(dispatch, Kobold)]),
          GenerateParty([GenerateMonsterFromTemplate(dispatch, Kobold)]),
        ];
      case FightTypes.BRAWL:
        return [
          GenerateParty([GenerateMonsterFromTemplate(dispatch, Goblin)]),
          GenerateParty([GenerateMonsterFromTemplate(dispatch, Kobold)]),
        ];

      default:
        return null;
    }
  }

  function GenerateRandomFight() {
    const fightTypes = Object.keys(FightTypes);
    const fightType = FightTypes[fightTypes[(fightTypes.length * Math.random()) << 0]];
    return {
      id: GenerateUUID(),
      type: fightType,
      parties: GenerateRandomPartiesForFightType(fightType),
    };
  }

  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function NextTurn(fight) {
    //console.log(fight);
  }

  function tick() {
    const newTick = new Date();
    const elapsedTick = newTick - ticker.tick;

    arena.fightQueue.map(NextTurn);

    if (arena.fightQueue.length < 3) {
      dispatch({
        type: 'addFightQueue',
        data: {
          fight: GenerateRandomFight(),
        },
      });
    }
  }
  return null;
}
