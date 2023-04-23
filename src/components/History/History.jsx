import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Drawer, Alert, Button, Divider} from "antd";

export class History extends Component {

    renderHistory = () => {
        const {history} = this.props
        if (history.length === 0) {
            return <Alert description={"Nav minēti vārdi"} type={'warning'}/>
        }

        return history.reverse().map((item, index) =>
            <Alert
                key={index}
                message={item.name}
                description={<div
                    dangerouslySetInnerHTML={{
                    __html:  item.definition +  "<br/><i>Punkti: " + item?.points + "</i>"
                }}></div>}
                type={item.type}
                style={{marginBottom: "5px"}}
            />
        )
    }

    render() {
        const {onClose, open} = this.props
        const history = this.renderHistory()
        return (
            <Drawer title="Vēsture" placement="right" onClose={onClose} open={open}>
                <Button size={"small"}
                        onClick={this.props.clearGameHistory}
                >
                    Notīrīt vēsturi
                </Button>
                <Divider plain />
                {history}
            </Drawer>)
    }
}

History.propTypes = {
    history: PropTypes.array,
    onClose: PropTypes.func,
    open: PropTypes.bool
};
