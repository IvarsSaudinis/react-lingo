import PropTypes from 'prop-types'

import React, { Component } from 'react'
import { Modal, Button } from 'antd'
export default class ModalGameOver extends Component {
    render() {
        const { title, open, closeModal, choosenName, definition } = this.props

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
                    Minamais vārds bija: <strong>{choosenName}</strong>
                </p>
                <p>{definition}</p>
            </Modal>
        )
    }
}

ModalGameOver.propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    choosenName: PropTypes.array,
    definition: PropTypes.string,
    closeModal: PropTypes.func
}
