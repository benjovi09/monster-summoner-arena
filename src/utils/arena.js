import { FightTypes } from '../enums';
import { GenerateUUID } from './index';
import { GenerateRandomPartiesForFightType } from './generate-monster';

export function GenerateRandomFight(dispatch) {
  const fightTypes = Object.keys(FightTypes);
  const fightType = FightTypes[fightTypes[(fightTypes.length * Math.random()) << 0]];
  return {
    id: GenerateUUID(),
    type: fightType,
    parties: GenerateRandomPartiesForFightType(dispatch, fightType),
  };
}
