import PropTypes from 'prop-types'

import React, { Component } from 'react'
import { Modal, Button, Switch } from 'antd'

export default class ModalSettings extends Component {
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
ModalSettings.propTypes = {
    title: PropTypes.string,
    changeSettings: PropTypes.func,
    open: PropTypes.bool,
    closeModal: PropTypes.func,
    settings: PropTypes.object
}
