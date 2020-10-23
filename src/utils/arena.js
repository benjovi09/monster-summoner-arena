import { FightType } from './enums/fight-type';
import { GenerateUUID } from './index';
import { GenerateRandomPartiesForFightType } from './generate-monster';

export function GenerateRandomFight(dispatch) {
  const fightTypes = Object.keys(FightType);
  const fightType = FightType[fightTypes[(fightTypes.length * Math.random()) << 0]];
  return {
    id: GenerateUUID(),
    type: fightType,
    parties: GenerateRandomPartiesForFightType(dispatch, fightType),
  };
}
