import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Modal, Button, Divider, Switch} from 'antd'

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
            <Modal
                title={title}
                style={{top: 20}}
                open={open}
                footer={[
                    <Button key="ok" type="primary" onClick={closeModal}>
                        {'Labi'}
                    </Button>
                ]}
                onCancel={closeModal}
            >
                <p>Balstīta uz pasaulē populāru spēli - Lingo.</p>
                <p>
                    Veidota kā atvērtā koda lietotne mācību nolūkos (tāpēc ir
                    vēl ko uzlabot/labot). Pašā pamatā react un ant.design UI,
                    hostēta bez maksas uz Vercel platformas. Kaut kur kodu var
                    atrast GitHub.
                </p>
                <Divider orientation="left">Noteikumi </Divider>
                <ul>
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
                <Divider orientation="left">Spēles vārdnīca </Divider>
                <ul style={{listStyle: "none"}}>
                    <li><Switch disabled defaultChecked size={"small"} /> Spēlē iekļauti salīdzinoši vienkārši vārdi ({wordsLevel.easy})</li>
                    <li><Switch checked={level.middle} onChange={this.changeMiddle} size={"small"} /> Spēlē iekļauti zināmi vārdi ({wordsLevel.middle}), bet retāk lietoti</li>
                    <li><Switch checked={level.hard}  onChange={this.changeHard}  size={"small"} /> Spēlē būs arī mazāk zināmi vārdi ({wordsLevel.hard})</li>
                </ul>
            </Modal>
        )
    }
}

AboutModal.propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    closeModal: PropTypes.func
};
