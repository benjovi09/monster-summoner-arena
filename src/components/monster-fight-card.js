import React from 'react';
import { useSelector } from 'react-redux';
import { Card, ListGroup, ListGroupItem, ProgressBar, Container } from 'react-bootstrap';
import { CalculateMaxDamageForMonster } from '../utils/index.js';

export default function (props) {
  const monster = useSelector((state) => state.monstersReducer).find((monster) => monster.id == props.monsterId);
  const maxMonsterDamage = CalculateMaxDamageForMonster(monster);
  const now = Math.min(monster.damage, maxMonsterDamage);
  return (
    <Card>
      <Card.Img variant="top" src="holder.js/500x500" />
      {monster.name}
      <ListGroup>
        <ListGroupItem>
          <ProgressBar
            className="party-progress-bar-part"
            animated="true"
            striped="true"
            now={maxMonsterDamage - now}
            max={maxMonsterDamage}
            key={monster.id}
          />
        </ListGroupItem>
        <ListGroupItem>
          {`${Math.round(now*10)} / ${Math.round(maxMonsterDamage*10)}`}
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}
