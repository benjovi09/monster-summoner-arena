import { GenerateUUID } from '.';
import { FightTypes } from '../enums';
import { Goblin, Kobold } from '../monster-templates';

export function GenerateParty(monsters) {
  let partyCount = 0;
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

export function GenerateRandomPartiesForFightType(dispatch, fightType) {
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

function GenerateMonsterFromTemplate(dispatch, template) {
  const monster = { ...template, id: GenerateUUID() };
  dispatch({
    type: 'addMonster',
    data: {
      monster: monster,
    },
  });
  return monster;
}
