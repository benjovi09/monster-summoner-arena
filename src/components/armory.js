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

  function TestFight(playerParty, enemyParty) {
    GetInitiative(playerParty.monsters.concat(enemyParty.monsters)).forEach((monster) => {
      ExecuteTurn(monster);
    });
  }

  function GetInitiative(monsters) {
    const unorderedInit = monsters.map((m) => {
      return {
        ...m,
        roll: m.attributes.body.agility * Math.random(), // * 2 if stance is aggressive, / 2 if defensive;
      };
    });

    return unorderedInit.sort(SortInitiativeRolls);
  }

  function SortInitiativeRolls(a, b) {
    return a.roll - b.roll;
  }

  function ExecuteTurn(monster){
    
  }
  function TestAttack(attacker, defender) {
    const attackRoll = attacker.attributes.body.agility * Math.random();
    const defendRoll = defender.attributes.body.agility * Math.random();
    if (attackRoll > defendRoll) {
      defender.damage = +(attacker.attributes.body.strength / defender.attributes.body.toughness) * Math.random();
      console.log(defender.damage);
    } else {
      console.log(`Attacker ${attacker.name} missed defender ${defender.name}!`);
    }
  }

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
                <Button onClick={() => TestFight(party, { name: 'enemies', monsters: [enemy] })}>Test Fight</Button>
              </Card.Footer>
            </Card>
          );
        })}
      </section>
      <section className="remaining-monster-list">{}</section>
    </div>
  );
}
