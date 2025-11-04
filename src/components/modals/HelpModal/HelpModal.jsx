import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog'
import { Button } from '../../ui/button'

export class HelpModal extends Component {
  render() {
    const { title, open, closeModal, definition } = this.props

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && closeModal()}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              {definition}
            </DialogDescription>
            <DialogFooter>
              <Button onClick={closeModal}>
                Labi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    )
  }
}

HelpModal.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  closeModal: PropTypes.func,
  definition: PropTypes.string
};
