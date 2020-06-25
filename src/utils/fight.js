import { CalculateMaxDamageForMonster } from '../utils';

export function NextRound(dispatch, monsters, fight) {
  const participants = fight.parties.map((party) => party.composition.map((position) => position.monsterId)).flat();
  GetInitiative(participants).forEach((monster) => {
    NextTurn(fight, monster);
    ResolveFightIfOver(fight);
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
    const enemyIds = fight.parties
      .find((party) => !party.composition.map((position) => position.monsterId).includes(monster.id))
      .composition.map((position) => position.monsterId);
    const activeEnemies = monsters.filter((m) => enemyIds.includes(m.id) && !m.status.includes('UNCONSCIOUS'));
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
        data: {
          fightId: fight.id,
          winner: results.find((r) => r.result == 'win'),
        },
      });
    }
  }
}
