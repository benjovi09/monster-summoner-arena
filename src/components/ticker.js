import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GenerateUUID, GenerateMonsterFromTemplate } from '../utils';
import { FightTypes } from '../enums';
import { Goblin, Kobold } from '../monster-templates';

export default function () {
  const ticker = useSelector((state) => state.tickerReducer);
  const arena = useSelector((state) => state.arenaReducer);

  const dispatch = useDispatch();

  function GenerateParty(monsters) {
    let x = 0,
      y = 0;

    return {
      name: 'rando',
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
          GenerateParty([GenerateMonsterFromTemplate(Goblin)]),
          GenerateParty([GenerateMonsterFromTemplate(Kobold)]),
        ];
      case FightTypes.DOUBLES:
        return [
          GenerateParty([GenerateMonsterFromTemplate(Goblin), GenerateMonsterFromTemplate(Goblin)]),
          GenerateParty([GenerateMonsterFromTemplate(Kobold), GenerateMonsterFromTemplate(Goblin)]),
        ];
      case FightTypes.TRIOS:
        return [
          GenerateParty([
            GenerateMonsterFromTemplate(Kobold),
            GenerateMonsterFromTemplate(Kobold),
            GenerateMonsterFromTemplate(Goblin),
          ]),
          GenerateParty([
            GenerateMonsterFromTemplate(Kobold),
            GenerateMonsterFromTemplate(Kobold),
            GenerateMonsterFromTemplate(Kobold),
          ]),
        ];
      case FightTypes.QUADS:
        return [
          GenerateParty([
            GenerateMonsterFromTemplate(Kobold),
            GenerateMonsterFromTemplate(Kobold),
            GenerateMonsterFromTemplate(Kobold),
            GenerateMonsterFromTemplate(Goblin),
          ]),
          GenerateParty([
            GenerateMonsterFromTemplate(Kobold),
            GenerateMonsterFromTemplate(Kobold),
            GenerateMonsterFromTemplate(Kobold),
            GenerateMonsterFromTemplate(Kobold),
          ]),
        ];
      case FightTypes.FFA:
        return [
          GenerateParty([GenerateMonsterFromTemplate(Goblin)]),
          GenerateParty([GenerateMonsterFromTemplate(Kobold)]),
          GenerateParty([GenerateMonsterFromTemplate(Kobold)]),
          GenerateParty([GenerateMonsterFromTemplate(Kobold)]),
        ];
      case FightTypes.BRAWL:
        return [
          GenerateParty([GenerateMonsterFromTemplate(Goblin)]),
          GenerateParty([GenerateMonsterFromTemplate(Kobold)]),
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
