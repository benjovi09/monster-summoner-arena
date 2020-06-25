import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Jumbotron } from 'react-bootstrap';
import { Container, Col, Row } from 'react-bootstrap';
import FightCard from './party-card';

export default function () {
  const fight = useSelector((state) => state.arenaReducer).fightQueue[0];

  if (!fight) {
    return <div>lolnofight</div>;
  }

  return (
    <Jumbotron>
      <Container>
        <Row>
          {fight.parties?.map((party) => (
            <Col>
              <FightCard party={party}></FightCard>
            </Col>
          ))}
        </Row>
      </Container>
    </Jumbotron>
  );
}
