import { CalculateMaxDamageForMonster } from '../utils';
import { Monster } from './typedef/monster';
import { Fight } from './typedef/fight';
import { Condition } from './enums/condition';

/**
 * 
 * @param {*} dispatch 
 * @param {Monster[]} monsters 
 * @param {Fight} fight 
 */
export function NextRound(dispatch, monsters, fight) {
  const participants = fight.parties.reduce((acc, party) => party.composition.map((position) => position.monster), []);
  GetInitiative(participants).forEach((monster) => {
    NextTurn(dispatch, fight, monster);
    ResolveFightIfOver(dispatch, fight);
  });
}

/**
 * 
 * @param {Monster[]} monsters 
 */
function GetInitiative(monsters) {
  return monsters
    .map((monster) => {
      return {
        ...monster,
        roll: monster.attributes.dexterity * Math.random(), // * 2 if stance is aggressive, / 2 if defensive;
      };
    })
    .sort((a, b) => a.roll - b.roll);
}

/**
 * @param {*} dispatch
 * @param {Monster} attacker 
 * @param {Monster} defender 
 */
function TestAttack(dispatch, attacker, defender) {
  const attackRoll = attacker.attributes.dexterity * Math.random();
  const defendRoll = defender.attributes.dexterity * Math.random();

  if (attackRoll > defendRoll) {
    dispatch({
      type: 'MONSTER_TAKE_DAMAGE',
      data: {
        id: defender.id,
        damage: +(attacker.attributes.strength / defender.attributes.constitution) * Math.random(),
      },
    });
  }

  if (defender.status.conditions.includes(Condition.UNCONSCIOUS)) {
    //const deathRoll = 
    //if(deathRoll < 20){
    dispatch({
      type: 'MONSTER_DEATH',
      dat3a: {
        id: defender.id,
        killedById: attacker.id
      }
    });
  }
}

/**
 * 
 * @param {import('./typedef/fight').Fight} fight 
 * @param {Monster} monster 
 */
function NextTurn(dispatch, fight, monster) {
  if (monster.status.damage >= CalculateMaxDamageForMonster(monster)) {
    return;
  }
  const enemyIds = fight.parties
    .find((party) => !party.composition.map((position) => position.monsterId).includes(monster.id))
    .composition.map((position) => position.monsterId);
  const activeEnemies = monsters.filter((m) => enemyIds.includes(m.id) && !m.status.includes('UNCONSCIOUS'));
  if (activeEnemies.length > 0) {
    TestAttack(dispatch, monster, activeEnemies[0]);
  }
}

function ResolveFightIfOver(dispatch, fight) {
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
