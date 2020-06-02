import React from 'react';
import { useSelector } from 'react-redux';
import { MonsterEquipmentModal } from './monster-equipment-modal';
import { Button, ButtonGroup, Card } from 'react-bootstrap';

export default function () {
  const [modalShow, setModalShow] = React.useState(false);
  const player = useSelector((state) => state.playerReducer);

  const enemy = {
    name: 'goblin',
    stance: 'normal',
    damage: 0,
    attributes: {
      body: {
        strength: 1.5,
        agility: 2,
        toughness: 1,
        endurance: 1,
        recuperation: 0.5,
      },
      soul: {
        //tbd for magic
        //now i understand toady no magic
      },
    },
  };

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
              <Card.Footer>
              </Card.Footer>
            </Card>
          );
        })}
      </section>
      <section className="remaining-monster-list">{}</section>
    </div>
  );
}
