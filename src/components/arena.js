import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, ListGroup, ListGroupItem, ProgressBar } from 'react-bootstrap';
import PartyProgressBar from './party-progress-bar.js';
import 'holderjs';

export default function () {
  const fightQueue = useSelector((state) => state.arenaReducer).fightQueue;

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
                {fight.id}
                <ListGroup>
                  {fight.parties.map((party) => {
                    return (
                      <ListGroupItem>
                        {party.name}
                        <ProgressBar>
                          <PartyProgressBar monsterIds={party.composition.map(position => [position.monsterId])} />
                        </ProgressBar>
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
