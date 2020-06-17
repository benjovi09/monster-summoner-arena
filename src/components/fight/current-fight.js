import React from 'react';

import { Jumbotron } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Container, Col, Row } from 'react-bootstrap';
import FightCard from './party-card';

export default function (props) {
  const parties = useSelector((state) => state.arenaReducer).fightQueue[0]?.parties;

  return (
    <Jumbotron>
      <Container>
        <Row>
          {parties?.map((party) => (
            <Col>
              <FightCard party={party}></FightCard>
            </Col>
          ))}
        </Row>
      </Container>
    </Jumbotron>
  );
}
