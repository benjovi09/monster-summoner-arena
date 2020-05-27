import React from 'react';
import { useSelector } from 'react-redux';
import { MonsterEquipmentModal } from './monster-equipment-modal';
import { Button, ButtonGroup, Card } from 'react-bootstrap';

export default function () {
  const [modalShow, setModalShow] = React.useState(false);
  const player = useSelector((state) => state.playerReducer);

  return (
    <div>
      <MonsterEquipmentModal show={modalShow} onHide={() => setModalShow(false)} />
      <section className="monster-parties">
        {player.monsterParties.map((party) => {
          return (
            <Card>
              <Card.Body>
                <Card.Title>{party.name}</Card.Title>
                <ButtonGroup>
                  {party.monsters.map((monster) => (
                    <Button variant="primary" onClick={() => setModalShow(true)}>
                      {monster.name}
                    </Button>
                  ))}
                </ButtonGroup>
              </Card.Body>
            </Card>
          );
        })}
      </section>
      <section className="remaining-monster-list">{}</section>
    </div>
  );
}
