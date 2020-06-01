import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

export default function () {
  const fightQueue = useSelector((state) => state.arenaReducer).fightQueue;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" data-src="holder.js/1300x500" />
      <Card.Body>
        <Card.Title>Arena</Card.Title>
        <Card.Text>Some arena text here.</Card.Text>

        <ListGroup>
          {fightQueue.map((fight) => {
            return (
              <ListGroupItem key={fight.id}>
                <Button variant="primary">Sign-Up</Button>
                {fight.id}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
