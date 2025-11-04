import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog'
import { Button } from '../../ui/button'
import { Separator } from '../../ui/separator'
import { Switch } from '../../ui/switch'

import {data} from '../../../assets/vocabulary'

export class AboutModal extends Component {

    state = {
          wordsLevel: {
            'easy': 0,
            'middle': 0,
            'hard': 0
        }
    }
    constructor(props) {
        super(props)

        const {wordsLevel} = this.state

        data.vocabulary.forEach(item => {
            if(item.level===1) wordsLevel.easy = wordsLevel.easy + 1
            if(item.level===2) wordsLevel.middle= wordsLevel.middle + 1
            if(item.level===3) wordsLevel.hard = wordsLevel.hard + 1
        })

        this.state = {
            wordsLevel: {...wordsLevel}
        }
    }

    changeMiddle = (checked) => {
        const { changeLevel } = this.props
        changeLevel(checked, 'middle')
    }
    changeHard= (checked) => {
        const { changeLevel } = this.props
        changeLevel(checked, 'hard')
    }

    render() {
        const {wordsLevel} = this.state
        const {title, open, closeModal, level } = this.props
        return (
            <Dialog open={open} onOpenChange={(isOpen) => !isOpen && closeModal()}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p>Balstīta uz pasaulē populāru spēli - Lingo.</p>
                        <p>
                            Veidota kā atvērtā koda lietotne mācību nolūkos (tāpēc ir
                            vēl ko uzlabot/labot). Pašā pamatā react un shadcn/ui,
                            hostēta bez maksas uz Vercel platformas. Kaut kur kodu var
                            atrast GitHub.
                        </p>
                        <div>
                            <h4 className="text-sm font-semibold mb-2">Noteikumi</h4>
                            <Separator className="mb-3" />
                            <ul className="space-y-2 list-disc pl-5">
                                <li>Jāatmin vārds latviešu valodā</li>
                                <li>
                                    Jo ātrāk atmin nejauši izvēlētu vārdu, jo vairāk punkti
                                    tiek piešķirti
                                </li>
                                <li>
                                    Ja vārdu neatmin ar 5 mēģinājumiem, iekrātie
                                    punkti tiek zaudēti
                                </li>
                                <li>
                                    Ir iespējams noskaidrot minamā vārda skaidrojumu, bet
                                    tad par šo vārdu punktus vairs nav iespējams iegūt
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold mb-2">Spēles vārdnīca</h4>
                            <Separator className="mb-3" />
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2">
                                    <Switch disabled defaultChecked />
                                    <span className="text-sm">Spēlē iekļauti salīdzinoši vienkārši vārdi ({wordsLevel.easy})</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Switch checked={level.middle} onCheckedChange={this.changeMiddle} />
                                    <span className="text-sm">Spēlē iekļauti zināmi vārdi ({wordsLevel.middle}), bet retāk lietoti</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Switch checked={level.hard} onCheckedChange={this.changeHard} />
                                    <span className="text-sm">Spēlē būs arī mazāk zināmi vārdi ({wordsLevel.hard})</span>
                                </li>
                            </ul>
                        </div>
                    </div>
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

AboutModal.propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    closeModal: PropTypes.func
};
