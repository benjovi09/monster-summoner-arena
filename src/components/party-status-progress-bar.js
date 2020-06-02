import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { CalculateMaxDamageForMonster } from '../utils/index.js';

export default function (props) {
  const monsters = useSelector((state) => state.monstersReducer);
  let key = 1;
  return (
    <ProgressBar>
      {props.monsterIds.map((monsterId) => {
        const monster = monsters.find((monster) => monster.id == monsterId);
        const maxMonsterDamage = CalculateMaxDamageForMonster(monster);
        const now = Math.min(monster.damage, maxMonsterDamage);
        return <ProgressBar animated='true' striped='true' now={now} max={maxMonsterDamage} key={key++} />;
      })}
    </ProgressBar>
  );
}
