import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styled from 'styled-components'

const Styles = styled.div`
  a, .button {
    padding: 50px;
  }
`;

const MetalCellMp3Modal = ({
  className,
  mp3,
  title
}) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  
  return (
    <Styles>
        <Button color="primary" onClick={toggle}>Mp3</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Metal Cell Podcasts</ModalHeader>
          <ModalBody>
            <audio controls>
                <source src={mp3}></source>
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
