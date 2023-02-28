import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button, Modal} from "antd";

export class GameOverModal extends Component {
  render() {
    const { title, open, closeModal, chosenName, definition } = this.props
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
          <p>
            Minamais vārds bija: <strong>{chosenName}</strong>
          </p>
          <p>{definition}</p>
        </Modal>
    )
  }
}

GameOverModal.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  chosenName: PropTypes.array,
  definition: PropTypes.string,
  closeModal: PropTypes.func
};
