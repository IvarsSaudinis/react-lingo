import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "../ui/drawer";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export class History extends Component {

    renderHistory = () => {
        const {history} = this.props
        if (history.length === 0) {
            return <Alert variant="warning">
                <AlertDescription>Nav minēti vārdi</AlertDescription>
            </Alert>
        }

        return [...history].reverse().map((item, index) => {
            const variant = item.type === 'success' ? 'success' : item.type === 'error' ? 'destructive' : 'warning'
            return (
                <Alert
                    key={index}
                    variant={variant}
                    className="mb-2"
                >
                    <AlertTitle>{item.name}</AlertTitle>
                    <AlertDescription>
                        <div dangerouslySetInnerHTML={{
                            __html:  item.definition +  "<br/><i>Punkti: " + item?.points + "</i>"
                        }}></div>
                    </AlertDescription>
                </Alert>
            )
        })
    }

    render() {
        const {onClose, open} = this.props
        const history = this.renderHistory()
        return (
            <Drawer open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Vēsture</DrawerTitle>
                    </DrawerHeader>
                    <div className="px-4 overflow-y-auto max-h-[60vh]">
                        <Button size="sm" variant="outline"
                                onClick={this.props.clearGameHistory}
                        >
                            Notīrīt vēsturi
                        </Button>
                        <Separator className="my-4" />
                        {history}
                    </div>
                </DrawerContent>
            </Drawer>)
    }
}

History.propTypes = {
    history: PropTypes.array,
    onClose: PropTypes.func,
    open: PropTypes.bool
};
