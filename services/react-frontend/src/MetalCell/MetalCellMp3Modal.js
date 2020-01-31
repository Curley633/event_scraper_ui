import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styled from 'styled-components'
import MetalCellItems from './MetalCellDT'

const Styles = styled.div`
  a, .button {
    padding: 50px;
  }
`;

const MetalCellMp3Modal = (props) => {
  
  const {
    MetalCellItems,
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  console.log(MetalCellItems)
  
  return (
    <Styles>
        <Button color="primary" onClick={toggle}>Mp3</Button>
      <Modal isOpen={modal} toggle={toggle} Props={this.MetalCellItems}>
        {/* <ModalHeader toggle={toggle}>Modal title</ModalHeader> */}
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            <audio controls>
                {/* <source src={MetalCellItems.mp3}>console.log({MetalCellItems.mp3})</source> */}
                Your browser does not support the audio element.
            </audio>
          </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Styles>
  );
}

export default MetalCellMp3Modal;
