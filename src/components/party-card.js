import React from 'react';
import { Card } from 'react-bootstrap';
import PartyContainer from './party-container';

export default function (props) {
  return (
    <Card style={{ width: '25rem' }}>
      <Card.Body>
        <Card.Title>{props.party.name}</Card.Title>
        <PartyContainer composition={props.party.composition}></PartyContainer>
      </Card.Body>
    </Card>
  );
}
