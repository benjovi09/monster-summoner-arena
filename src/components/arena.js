import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Container, Col, Row } from 'react-bootstrap';
import PartyStatusProgressBar from './party-status-progress-bar.js';
import FightDetails from './fight/fight-details.js';
import FightQueue from './fight/fight-queue.js';
import 'holderjs';

export default function () {
  return (
    <Container>
      <Row>
        <Col>
          <FightDetails></FightDetails>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card style={{ width: '24rem' }}>
            <Card.Img variant="top" data-src="holder.js/300x125" />
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
