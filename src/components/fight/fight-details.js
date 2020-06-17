import React from 'react';

import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function (props) {
  const arena = useSelector((state) => state.arenaReducer);

  return (
    <Table>
      <thead>
        <tr>
          {arena.fightQueue[0]?.parties.map((party) => (
            <th>{party.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {arena.fightQueue[0]?.parties.map((party) => {
            party.composition.map((monster) => <th>lol</th>);
          })}
        </tr>
      </tbody>
    </Table>
  );
}
