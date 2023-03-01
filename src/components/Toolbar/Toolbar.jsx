import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Space} from "antd";
import {InfoCircleOutlined, LaptopOutlined, MobileOutlined, SettingOutlined, OrderedListOutlined, MehOutlined} from "@ant-design/icons";

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
            case 'historyVisible':
                changeSettings({historyVisible: state})
                break
            default:
                break
        }
    }

    render() {
        const {settings, giveUp} = this.props

        return (
            <Space>
                <Button
                    onClick={(e) => {
                        e.target.blur()
                        this.onChangeSettings('infoModalVisible', true)
                    }}
                >
                    <InfoCircleOutlined/>
                </Button>
{/*                <Button
                    onClick={(e) => {
                        e.target.blur()
                        this.onChangeSettings('settingsModalVisible', true)
                    }}
                >
                    <SettingOutlined/>
                </Button>*/}
                <Button
                    onClick={(e) => {
                        e.target.blur()
                        giveUp()
                    }}>
                    {settings.gaveUp === true ? <MehOutlined spin/> : <MehOutlined/>}
                </Button>
                <Button
                    onClick={(e) => {
                        e.target.blur()
                        this.onChangeSettings('keyboard', settings.keyboard)
                    }}
                >
                    {settings.keyboard === false ? <MobileOutlined/> : <LaptopOutlined/>}
                </Button>
                <Button
                    onClick={(e) => {
                        e.target.blur()
                        this.onChangeSettings('historyVisible', true)
                    }}
                >
                    <OrderedListOutlined />
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
