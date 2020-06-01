import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GenerateUUID, GenerateMonsterFromTemplate } from '../utils';
import { FightTypes } from '../enums';
import { Goblin, Kobold } from '../monster-templates';

export default function () {
  const ticker = useSelector((state) => state.tickerReducer);
  const arena = useSelector((state) => state.arenaReducer);

  const dispatch = useDispatch();

  function GenerateRandomPartiesForFightType(fightType) {
    switch (fightType) {
      case FightTypes.SINGLES:
        return [GenerateMonsterFromTemplate(Goblin), GenerateMonsterFromTemplate(Kobold)];
      default:
        return null;
    }
  }

  function GenerateRandomFight() {
    const fightTypes = Object.keys(FightTypes);
    const fightType = FightTypes.SINGLES;//FightTypes[fightTypes[(fightTypes.length * Math.random()) << 0]];
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

  function tick() {
    const newTick = new Date();
    const elapsedTick = newTick - ticker.tick;

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
