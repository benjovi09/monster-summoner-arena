import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export function MonsterEquipmentModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Equipment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>eq</h4>
        <p>idk lol</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
