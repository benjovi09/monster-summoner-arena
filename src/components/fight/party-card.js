import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row, Container } from 'react-bootstrap';
import PartyContainer from './party-container';

export default function (props) {

  PartyContainer(props.party.composition);

  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.party.name}</Card.Title>
        <PartyContainer composition={props.parties.composition}></PartyContainer>
        <ul>
          {props.party.composition.map((position) => {
            return (
              <ul>
                <li>{position.monsterId.substring(0, 5)}</li>
                <li>{position.xPosition}</li>
                <li>{position.yPosition}</li>
              </ul>
            );
          })}
        </ul>
      </Card.Body>
    </Card>
  );
}
