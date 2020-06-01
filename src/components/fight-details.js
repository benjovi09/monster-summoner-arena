import React from 'react';

export default function(){

    return (
      <Table>
        <thead>
          <tr>
            {fight.parties.map((party) => (
              <th>{party.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {fight.parties.map((party) => {
              return party.composition.map((position) => {
                return <td>{position.monsterId}</td>;
              });
            })}
          </tr>
        </tbody>
      </Table>
    );
}