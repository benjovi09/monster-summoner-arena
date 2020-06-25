import React from 'react';
import { Card, Container, Col, Row } from 'react-bootstrap';
import FightQueue from './fight-queue.js';
import CurrentFight from './current-fight.js';

export default function () {
  return (
    <Container>
      <Row>
        <CurrentFight></CurrentFight>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Img variant="top" data-src="holder.js/100px125" />
            <Card.Body>
              <Card.Title>Arena</Card.Title>
              <Card.Text>Some arena text here.</Card.Text>
              <FightQueue></FightQueue>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
