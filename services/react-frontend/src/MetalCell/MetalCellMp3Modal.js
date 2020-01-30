import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styled from 'styled-components'
import MetalCellDT from './MetalCellDT'

const Styles = styled.div`
  a, .button {
    padding: 50px;
  }
`;

const MetalCellMp3player = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  // const MetalCellItemsMP3=MetalCellDT.MetalCellItem.map.mp3
  // const MetalCellItems = this.props.MetalCellItems.map(MetalCellItem.mp3 => {


  // )}
  
  return (
      <Styles>
        <Button color="primary" onClick={toggle}>Mp3</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            <audio controls>
              <source src="https://chtbl.com/track/39249/aphid.fireside.fm/d/1437767933/fb28b2bb-19a2-4a23-abe6-2f6359e54b9d/50b1fcfe-f1f2-4fc5-8552-71b312c80d16.mp3"></source>
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

export default MetalCellMp3player;
