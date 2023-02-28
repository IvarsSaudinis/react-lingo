import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Space} from "antd";
import {InfoCircleOutlined, LaptopOutlined, MobileOutlined, SettingOutlined, MehOutlined} from "@ant-design/icons";

export class Toolbar extends Component {
    onChangeSettings = (value, state) => {
        const {changeSettings} = this.props

        switch (value) {
            case 'infoModalVisible':
                changeSettings({infoModalVisible: state})
                break
            case 'keyboard':
                changeSettings({keyboard: !state})
                break
            case 'settingsModalVisible':
                changeSettings({settingsModalVisible: state})
                break
            default:
                break
        }
    }

    render() {
        const {settings, giveUp} = this.props

        return (
            <Space wrap>
                <Button
                    onClick={() => {
                        this.onChangeSettings('infoModalVisible', true)
                    }}
                >
                    <InfoCircleOutlined/>
                </Button>
                <Button
                    onClick={() => {
                        this.onChangeSettings('settingsModalVisible', true)
                    }}
                >
                    <SettingOutlined/>
                </Button>
                <Button
                    onClick={() => {
                         giveUp()
                    }}>
                    { settings.gaveUp === true ? <MehOutlined spin /> : <MehOutlined/> }
                </Button>
                <Button
                    onClick={() => {
                        this.onChangeSettings('keyboard', settings.keyboard)
                    }}
                >
                    {settings.keyboard === false ? <MobileOutlined/> : <LaptopOutlined/>}
                </Button>
            </Space>
        )
    }
}

Toolbar.propTypes = {
    settings: PropTypes.object,
    changeSettings: PropTypes.func,
    giveUp: PropTypes.func
};
