import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CountryModal extends React.Component {
  constructor(props) {
    super(props);


    this.toggle = this.toggle.bind(this);
  }

  toggle= () => {
      this.props.onStateChange(false);
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modalToggled} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.countryToggled}</ModalHeader>
        </Modal>
      </div>
    );
  }
}

export default CountryModal;
