import React from 'react';

export function FormatMoney(money) {
  const copper = money % 100;
  const silver = ((money - copper) / 100) % 100;
  const gold = ((money - silver * 100 - copper) / 10000) % 100;
  return (
    <ul>
      <li>money: {money}</li>
      <li>Gold: {gold}</li>
      <li>Silver: {silver}</li>
      <li>Copper: {copper}</li>
    </ul>
  );
}

export function GenerateMonsterFromTemplate(template) {
  template.id = GenerateUUID();
  return template;
}

export function GenerateUUID() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16),
  );
}
