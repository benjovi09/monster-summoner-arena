import React from 'react';
import { useDrag } from 'react-dnd';

export default function (props) {
  const [collectedProps, drag] = useDrag({
    item: { id, type },
  });
  return <div ref={drag}>...</div>;
}//PartySelectorMonsterCard
 //BattleMonsterCard
 //MonsterStatusCard