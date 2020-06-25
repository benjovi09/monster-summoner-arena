import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GenerateRandomFight } from '../utils/arena';
import { NextRound } from '../utils/fight';

export default function () {
  const ticker = useSelector((state) => state.tickerReducer);
  const arena = useSelector((state) => state.arenaReducer);
  const monsters = useSelector((state) => state.monstersReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    var timerID = setInterval(() => tick(), 2500);
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    const newTick = new Date();
    const elapsedTick = newTick - ticker.tick;

    if (arena.fightQueue.length < 3) {
      dispatch({ type: 'addFightQueue', data: { fight: GenerateRandomFight(dispatch) } });
    }

    if (arena.fightQueue.length > 0) {
      NextRound(dispatch, monsters, arena.fightQueue[0]);
    }
  }

  return null;
}
