import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button } from 'antd'
export class HelpModal extends Component {
  render() {
    const { title, open, closeModal, definition } = this.props

    return (
        <Modal
            title={title}
            style={{ top: 20 }}
            open={open}
            onOk={closeModal}
            onCancel={closeModal}
            cancelText={null}
            cancelButtonProps={false}
            footer={[
              <Button key="ok" type="primary" onClick={closeModal}>
                {'Labi'}
              </Button>
            ]}
        >
          <p>{definition}</p>
        </Modal>
    )
  }
}

HelpModal.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  closeModal: PropTypes.func,
  definition: PropTypes.string
};
