import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import MonsterFightCard from './monster-fight-card';

export default function (props) {
  /*
  const rowCount = parties?.reduce((max, current) => Math.max(max.composition.length, current.composition.length));
  const partyCards = parties.map((party) => {});
  console.log(rowCount);
 */
  let battlefield = [];
  const biggestY = props.composition
    .map((position) => position.yPosition)
    .reduce((max, cur) => Math.max(max, cur), -Infinity);

  const biggestX = props.composition
    .map((position) => position.xPosition)
    .reduce((max, cur) => Math.max(max, cur), -Infinity);

  for (let i = 0; i <= biggestX; i++) {
    battlefield.push([]);
  }
  for (let i = 0; i <= biggestY; i++) {
    battlefield[i] = [];
  }

  props.composition.forEach((position) => {
    battlefield[position.xPosition][position.yPosition] = position;
  });

  return (
    <Container>
      {battlefield.map((row) => (
        <Row>
          {row.map((col) => (
            <Col xs={4}>
              <MonsterFightCard monsterId={col.monsterId} key={col.monsterId}></MonsterFightCard>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
}
