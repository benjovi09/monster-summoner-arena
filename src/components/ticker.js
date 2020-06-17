import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GenerateUUID, GenerateMonsterFromTemplate, CalculateMaxDamageForMonster } from '../utils';
import { FightTypes } from '../enums';
import { Goblin, Kobold } from '../monster-templates';

let partyCount = 0;
export default function () {
  const ticker = useSelector((state) => state.tickerReducer);
  const arena = useSelector((state) => state.arenaReducer);
  const monsters = useSelector((state) => state.monstersReducer);

  const dispatch = useDispatch();

  function GenerateParty(monsters) {
    let x = 0,
      y = 0;

    return {
      id: GenerateUUID(),
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
    var timerID = setInterval(() => tick(), 2500);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function SortInitiativeRolls(a, b) {
    return a.roll - b.roll;
  }

  function GetInitiative(monsterIds) {
    return monsters
      .filter((monster) => monsterIds.includes(monster.id))
      .map((monster) => {
        return {
          ...monster,
          roll: monster.attributes.body.agility * Math.random(), // * 2 if stance is aggressive, / 2 if defensive;
        };
      })
      .sort(SortInitiativeRolls);
  }

  function NextRound(fight) {
    const participants = fight.parties.map((party) => party.composition.map((position) => position.monsterId)).flat();
    GetInitiative(participants).forEach((monster) => {
      NextTurn(fight, monster);
      ResolveFightIfOver(fight);
    });
  }

  function TestAttack(attacker, defender) {
    const attackRoll = attacker.attributes.body.agility * Math.random();
    const defendRoll = defender.attributes.body.agility * Math.random();
    if (attackRoll > defendRoll) {
      dispatch({
        type: 'MONSTER_TAKE_DAMAGE',
        data: {
          id: defender.id,
          damage: +(attacker.attributes.body.strength / defender.attributes.body.toughness) * Math.random(),
        },
      });
    } else {
    }
  }

  function NextTurn(fight, monster) {
    if (monster.damage >= CalculateMaxDamageForMonster(monster)) {
      return;
    }
    const enemyIds = fight.parties.find(
      (party) => !party.composition.map((position) => position.monsterId).includes(monster.id),
    ).composition.map(position => position.monsterId);
    const activeEnemies = monsters.filter(
      (m) => enemyIds.includes(m.id) && !m.status.includes('UNCONSCIOUS'),
    );
    if (activeEnemies.length > 0) {
      TestAttack(monster, activeEnemies[0]);
    }
  }

  function ResolveFightIfOver(fight) {
    const results = fight.parties.map((party) => {
      const monsterIds = party.composition.map((position) => {
        return position.monsterId;
      });

      if (
        monsters
          .filter((monster) => monsterIds.includes(monster.id))
          .every((monster) => monster.status.includes('UNCONSCIOUS'))
      ) {
        return { id: party.id, result: 'loss' };
      } else return { id: party.id, result: 'win' };
    });
    if (results.every((r) => r.result == 'loss')) {
      dispatch({
        type: 'FIGHT_RESULT',
        data: { fightId: fight.id, result: 'draw' },
      });
    } else if (results.every((r) => r.result == 'win')) return;
    else {
      dispatch({
        type: 'FIGHT_RESULT',
        data: { fightId: fight.id, winner: results.find((r) => r.result == 'win') },
      });
    }
  }

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

    if (arena.fightQueue.length > 0) {
      NextRound(arena.fightQueue[0]);
    }
  }
  return null;
}
