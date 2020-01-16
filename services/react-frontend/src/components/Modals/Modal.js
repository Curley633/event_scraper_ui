import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import Form from '../Forms/Form'

export default class ModalForm extends Component {
  constructor(props) {
      super(props)
          this.state = {
              modal: false
          }
      }
      

      toggle = () => {
          this.setState(prevState => ({
            modal: !prevState.modal
          }))
        }

      render() {
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>

        let button = ''
        let title = ''

      return (
          <div>
            {button}
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
              <ModalBody>
                <Form
                  toggle={this.toggle}
                  item={this.props.item} />
              </ModalBody>
            </Modal>
          </div>
      )
    }
}