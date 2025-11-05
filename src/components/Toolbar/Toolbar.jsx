import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button } from "../ui/button";
import { Info, Laptop, Smartphone, List, Frown } from "lucide-react";

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
        const {settings, giveUp, gameStatus } = this.props

        return (
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                        e.currentTarget.blur()
                        this.onChangeSettings('infoModalVisible', true)
                    }}
                >
                    <Info className="h-4 w-4"/>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                        e.currentTarget.blur()
                        giveUp()
                    }}>
                    <Frown className={`h-4 w-4 ${gameStatus === true ? 'animate-spin' : ''}`}/>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                        e.currentTarget.blur()
                        this.onChangeSettings('keyboard', settings.keyboard)
                    }}
                >
                    {settings.keyboard === false ? <Smartphone className="h-4 w-4"/> : <Laptop className="h-4 w-4"/>}
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                        e.currentTarget.blur()
                        this.onChangeSettings('historyVisible', true)
                    }}
                >
                    <List className="h-4 w-4" />
                </Button>
            </div>
        )
    }
}

Toolbar.propTypes = {
    settings: PropTypes.object,
    changeSettings: PropTypes.func,
    giveUp: PropTypes.func
};
