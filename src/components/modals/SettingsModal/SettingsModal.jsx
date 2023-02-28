import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button, Switch } from 'antd'

export class SettingsModal extends Component {

  onChange = (state) => {
    const { changeSettings } = this.props
    changeSettings({ keyboard: state })
  }

  render() {
    const { title, open, closeModal, settings } = this.props
    return (
        <Modal
            title={title}
            style={{ top: 20 }}
            open={open}
            footer={[
              <Button key="ok" type="primary" onClick={closeModal}>
                {'Labi'}
              </Button>
            ]}
            onCancel={closeModal}
        >
          <p>
            <Switch
                defaultChecked={settings.keyboard}
                onChange={this.onChange}
            />
             Rādīt virtuālo klaviatūru
          </p>
        </Modal>
    )
  }
}

SettingsModal.propTypes = {
  title: PropTypes.string,
  changeSettings: PropTypes.func,
  open: PropTypes.bool,
  closeModal: PropTypes.func,
  settings: PropTypes.object
};
