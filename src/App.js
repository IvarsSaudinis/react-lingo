import React, { Component } from 'react'

import { Card } from 'antd'

import ModalAbout from './components/ModalAbout'
import ModalGameOver from './components/ModalGameOver'
import ModalHelp from './components/ModalHelp'
import Toolbar from './components/Toolbar'
import GameBoard from './components/GameBoard'

import { data } from './assets/vocabulary.js'
import { alphabet } from './assets/alphabet.js'

import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

import './App.css'
import ModalSettings from './components/ModalSettings'

class Lingo extends Component {
    state = {
        choosenName: [],
        wordList: [],
        name: [],
        lastCorrectWord: '',
        lastWrongWord: '',
        definition: '',
        counter: 0,
        isInfoModalOpened: true,
        isHelpOpened: false,
        wrongWord: false,
        isGameOverModalOpened: false,
        points: 0,
        wordCount: 0,
        usedHelp: false,
        winInfo: {
            visible: false
        },
        layoutName: 'default',
        settings: {
            keyboard: false,
            infoModalVisible: true,
            settingsModalVisible: false,
            helpModalVisible: false
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keydownHandler)
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault()
        })
        const item =
            data.vocabulary[Math.floor(Math.random() * data.vocabulary.length)]
        this.setState({
            choosenName: [...item.title.toUpperCase()],
            definition: item.definition
        })
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydownHandler)
        document.removeEventListener('contextmenu', () => {})
    }

    resetGame = () => {
        const item =
            data.vocabulary[Math.floor(Math.random() * data.vocabulary.length)]
        const cleanList = []

        this.setState({
            wordList: [...cleanList],
            choosenName: [...item.title.toUpperCase()],
            definition: item.definition,
            name: cleanList,
            usedHelp: false
        })

        this.closeModal()
    }

    keydownHandler = (event) => {
        const {
            name,
            counter,
            wordList,
            choosenName,
            points,
            wordCount,
            usedHelp,
            definition
        } = this.state

        if (this.state.isGameOverModalOpened) {
            return
        }

        if (event.key.toUpperCase() === 'Q') {
            this.setState({
                isInfoModalOpened: true
            })
        }

        // HELP ME - būtu jādzēš ārā
        if (event.key.toUpperCase() === 'Y') {
           // console.log(choosenName)
        }

        if (event.key.toUpperCase() === 'X') {
            this.setState({
                settings: { helpModalVisible: true},
                usedHelp: true
            })
        }

        // IZDZEŠAM NO MASĪVA BURTUS
        if (
            event.key.toUpperCase() === 'DELETE' ||
            event.key.toUpperCase() === 'BACKSPACE' ||
            event.key === '{bksp}'
        ) {
            this.setState({
                name: name.slice(0, -1),
                counter: counter + 1,
                wrongWord: false
            })
        }

        // LOĢIKA, KUR APSTIPRINA VARDU
        if (
            name.length === 5 &&
            (event.key.toUpperCase() === 'ENTER' || event.key === '{enter}')
        ) {
            if (this.findWord(name) === undefined) {
                this.setState({
                    wrongWord: true
                })
            } else {
                const uppercaseName = name.join('').toUpperCase()
                const uppercaseChoosenName = choosenName.join('').toUpperCase()

                // console.log(upercaseName, upercaseChoosenName)

                if (uppercaseName === uppercaseChoosenName) {
                    console.log('VĀRDS UZMINĒTS!!! APSVEICU!')

                    let addPointCount = 0
                    switch (wordList.length) {
                        case 0:
                            addPointCount = 10
                            break
                        case 1:
                            addPointCount = 5
                            break
                        case 2:
                            addPointCount = 3
                            break
                        case 3:
                            addPointCount = 2
                            break
                        case 4:
                            addPointCount = 1
                            break
                        default:
                            addPointCount = 0
                            break
                    }

                    if (usedHelp) {
                        addPointCount = 0
                    }

                    this.setState({
                        lastCorrectWord: uppercaseName,
                        points: points + addPointCount,
                        wordCount: wordCount + 1,
                        winInfo: {
                            visible: true,
                            word: uppercaseChoosenName,
                            description: definition
                        }
                    })

                    this.resetGame()
                } else {
                    const newWordList = wordList.concat(
                        name.join('').toUpperCase()
                    )
                    this.setState({
                        wordList: newWordList,
                        name: ''
                    })
                }

                // game over
                if (wordList.length >= 4) {
                    this.setState({
                        isGameOverModalOpened: true,
                        lastWrongWord: uppercaseChoosenName,
                        points: 0,
                        wordCount: 0
                    })
                    return
                }
            }
        }

        if (name.length > 4) return false

        if (alphabet.some((element) => event.key.toUpperCase() === element)) {
            this.setState({
                name: [...name, event.key.toUpperCase()],
                counter: this.state.counter + 1
            })
        }
    }

    findWord = (word) => {
        const w = word.join('').toLowerCase()
        return data.vocabulary.find((name) => name.title === w)
    }

    closeModal = () => {
        const { settings } = this.state

        const sett = {
            settings: {
                infoModalVisible: false,
                settingsModalVisible: false,
                helpModalVisible: false,
                keyboard: settings.keyboard
            }
        }
        const newState = { ...settings, ...sett }
        this.setState(newState)
    }

    closeGameOverModel = () => {
        this.setState({
            isGameOverModalOpened: false
        })
    }

    onKeyPress = (button) => {
        const key = { key: button }
        if (button === "{shift}" || button === "{lock}") this.handleShift();

        this.keydownHandler(key)
        // console.log('Button pressed', button)
    }

    handleShift = () => {
        let layoutName = this.state.layoutName;
    
        this.setState({
          layoutName: layoutName === "default" ? "shift" : "default"
        });
      };

    changeSettings = (sett) => {
        const { settings } = this.state
        this.setState({
            settings: { ...settings, ...sett }
        })
    }

    render() {
        const {
            name,
            choosenName,
            definition,
            wrongWord,
            isHelpOpened,
            wordList,
            isGameOverModalOpened,
            points,
            settings
        } = this.state

        return (
            <div style={{ maxWidth: '510px', margin: '0 auto' }}>
                <Card
                    title={'Punkti: ' + points}
                    extra={
                        <Toolbar
                            settings={settings}
                            changeSettings={this.changeSettings}
                        />
                    }
                    size="small"
                >
                    <GameBoard
                        name={name}
                        choosenName={choosenName}
                        wordList={wordList}
                        wrongWord={wrongWord}
                    />
                </Card>

                <ModalHelp
                    title="Palīdzība"
                    open={settings.helpModalVisible}
                    definition={definition}
                    closeModal={this.closeModal}
                />

                <ModalAbout
                    title="Īsumā par react Lingo lietotni"
                    open={settings.infoModalVisible}
                    closeModal={this.closeModal}
                />

                <ModalSettings
                    title="Iestatījumi"
                    open={settings.settingsModalVisible}
                    closeModal={this.closeModal}
                    settings={settings}
                    changeSettings={this.changeSettings}
                />

                <ModalGameOver
                    title="Ui, nekas, tā gadās..."
                    open={isGameOverModalOpened}
                    closeModal={this.resetGame}
                    choosenName={choosenName}
                    definition={definition}
                />

                {settings.keyboard && (
                    <Keyboard
                        onKeyPress={this.onKeyPress}
                        onChange={this.onChange}
                        layoutName={this.state.layoutName}
                        buttonTheme={[
                            {
                              class: "key-disabled",
                              buttons: "Q W Y X"
                            },
                            {
                              class: "key-highlight",
                              buttons: "{shift}"
                            }
                          ]}
                        layout={{
                            'default': [
                                'Q W E R T Y U I O P {bksp}',
                                '{shift} A S D F G H J K L',
                                'Z X C V B N M {enter}'
                            ], 
                            'shift': [
                                'Q W Ē R T Y Ū Ī O P {bksp}',
                                '{shift} Ā Š D F G H J Ķ Ļ',
                                'Ž X Č V B Ņ M {enter}'
                            ]
                        }}
                        display={{
                            '{bksp}': 'DZĒST',
                            '{enter}': 'APSTIRPINĀT',
                            '{shift}': 'A..Ā'
                        }}
                    />
                )}

                {/*  {winInfo.visible && (
          <Alert
            message={'Atminētais vārds: ' + winInfo.word || ''}
            description={winInfo.description || ''}
            type='success'
            showIcon
            closable
          />
        )} */}
            </div>
        )
    }
}

export default Lingo
