export const defaultMonsters = [];

export default function (state = defaultMonsters, action) {
  switch (action.type) {
    case 'addMonster':
      return [...state, action.data.monster];
    default:
      return state;
  }
}
