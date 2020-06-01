import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import PartyStatusProgressBar from './party-status-progress-bar.js';
import 'holderjs';

export default function () {
  const fightQueue = useSelector((state) => state.arenaReducer).fightQueue;

  let fightCount = 0;
  return (
    <Card style={{ width: '24rem' }}>
      <Card.Img variant="top" data-src="holder.js/300x125" />
      <Card.Body>
        <Card.Title>Arena</Card.Title>
        <Card.Text>Some arena text here.</Card.Text>

        <ListGroup>
          {fightQueue.map((fight) => {
            return (
              <ListGroupItem key={fight.id}>
                {`Fight ${fightCount++}`}
                <ListGroup>
                  {fight.parties.map((party) => {
                    return (
                      <ListGroupItem>
                        {party.name}
                        <PartyStatusProgressBar
                          monsterIds={party.composition.map((position) => [position.monsterId])}
                        />
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
