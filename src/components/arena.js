import React from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup, Card } from 'react-bootstrap';

export default function () {
  const player = useSelector((state) => state.playerReducer);
  const enemy = {
    name: 'goblin',
    stance: 'normal',
    attributes: {
      body: {
        strength: 1.5,
        agility: 2,
        toughness: 1,
        endurance: 1,
        recuperation: 0.5,
      },
      soul: {
        //tbd for magic
        //now i understand toady no magic
      },
    },
  };

  function Fight(playerMonsters, enemies) {
    console.log('lol');
    const initiative = GetInitiative(playerMonsters.concat(enemies));
    initiative.forEach((monster) => {
      if (playerMonsters.includes(monster)) {
        console.log(`monster ${monster.name} ready to attack enemy`);
      } else {
        console.log(`monster ${monster.name} ready to attack playerMonster`);
      }
    });
  }

  function GetInitiative(monsters) {
    const rolls = monsters.map((m) => [m.name, m.attributes.body.agility * Math.random()]); // * 2 if stance is aggressive, / 2 if defensive;
    return rolls.sort(SortInitiativeRolls);
  }

  function SortInitiativeRolls(roll1, roll2) {
    return roll1 - roll2;
  }

  return (
    <div>
      <ul>
        {player.monsters.map((monster) => (
          <li>
            {monster.name}
            <Button onClick={() => Fight([monster], [enemy])}>Fight!!</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
