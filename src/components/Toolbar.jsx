import PropTypes from 'prop-types'

import React, { Component } from 'react'
import { Button, Space } from 'antd'
import {
    SettingOutlined,
    InfoCircleOutlined,
    LaptopOutlined,
    MobileOutlined
} from '@ant-design/icons'

export default class Toolbar extends Component {
    onChangeSettings = (value, state) => {
        const { changeSettings } = this.props

        switch (value) {
            case 'infoModalVisible':
                changeSettings({ infoModalVisible: state })
                break
            case 'keyboard':
                changeSettings({ keyboard: !state })
                break
            case 'settingsModalVisible':
                changeSettings({ settingsModalVisible: state })
                break
            default:
                break
        }
    }

    render() {
        const { settings } = this.props

        return (
            <Space wrap>
                <Button
                    onClick={() => {
                        this.onChangeSettings('infoModalVisible', true)
                    }}
                    size="small"
                >
                    <InfoCircleOutlined />
                </Button>
                <Button
                    onClick={() => {
                        this.onChangeSettings('settingsModalVisible', true)
                    }}
                    size="small"
                >
                    <SettingOutlined />
                </Button>
                <Button
                    onClick={() => {
                        this.onChangeSettings('keyboard', settings.keyboard)
                    }}
                    size="small"
                >
                    {settings.keyboard === false ? <MobileOutlined /> : <LaptopOutlined />}
                </Button>
            </Space>
        )
    }
}

Toolbar.propTypes = {
    settings: PropTypes.object,
    changeSettings: PropTypes.func
}
