import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import PartyStatusProgressBar from './party-status-progress-bar';

export default function () {
  const state = useSelector((state) => state.arenaReducer);
  const fightQueue = state.fightQueue;

  return (
    <ListGroup>
      {fightQueue.map((fight) => {
        return (
          <ListGroupItem key={fight.id}>
            {`Fight Name?`}
            <ListGroup>
              {fight.parties.map((party) => {
                return (
                  <ListGroupItem>
                    {party.name}
                    <PartyStatusProgressBar monsterIds={party.composition.map((position) => [position.monsterId])} />
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}
