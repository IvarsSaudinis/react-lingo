import React, {Component} from 'react'

import {Card, Modal, notification, message} from 'antd'

import {Toolbar} from './components/Toolbar'
import {GameBoard} from './components/GameBoard'

import {HelpModal} from "./components/modals/HelpModal";
import {AboutModal} from "./components/modals/AboutModal";
import {History} from "./components/History";

import {data} from './assets/vocabulary.js'
import {alphabet} from './assets/alphabet.js'

import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

import './App.css'

const openSuccessNotification = (word, definition) => {
    notification.success({
        message: word,
        description: definition,
    });
};

class Lingo extends Component {

    state = {
        chosenWord: {},
        gameState: {
            board: [],
            points: 0,
            status: 'start', // running, lost, etc...
        },
        inputName: '',
        level: {
            easy: true,
            middle: false,
            hard: false
        },
        isGameOverModalOpened: false,
        isHelpModalVisible: false,
        giveUp: false,
        history: [],
        layoutName: 'default',
        disabledButtons: 'Q W Y X',
        //-------- oldies
        settings: {
            keyboard: false,
            infoModalVisible: true,
            historyVisible: false
        },
    }



    componentDidMount() {
        document.addEventListener('keydown', this.keydownHandler)
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault()
        })
        this.loadGame()

        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydownHandler)
        document.removeEventListener('contextmenu', () => {
        })
        window.removeEventListener("resize", this.resize.bind(this));
    }

    resize() {
        let currentHideNav = (window.innerWidth <= 460);
        if (currentHideNav !== this.state.settings.keyboard) {
            this.setState({settings: {...this.state.settings, keyboard: currentHideNav}});
        }
    }

    saveGame = () => {
        const {gameState, history} = this.state
        localStorage.setItem('history', JSON.stringify(history));
        localStorage.setItem('points', gameState.points.toString());
    }

    loadGame = () => {
        const {gameState} = this.state

        this.setState({
            gameState: {
                ...gameState,
                points: parseInt(localStorage.getItem('points') ?? 0),
            },
            history: JSON.parse(localStorage.getItem('history')) ?? []
        })
    }

    setNewWord = () => {
        const {level}   = this.state
        const wordDict = []

        data.vocabulary.forEach(item => {
            if(item.level === 1) {
                wordDict.push(item)
            }
            if(item.level === 2 && level.middle) {
                wordDict.push(item)
            }
            if(item.level === 3 && level.hard) {
                wordDict.push(item)
            }
        })

        const word = wordDict[Math.floor(Math.random() * wordDict.length)]
        return {
            id: word.id,
            title: word.title.toUpperCase(),
            definition: word.definition,
        }
    }

    clearGameHistory = () => {
        localStorage.clear();
        this.setState({
            history: []
        })
    }

    handleHelpAction = (pressedKey) => {
        const {chosenWord} = this.state
        if (pressedKey.toUpperCase() === 'Y') {
            console.log(chosenWord.title)
        }
    }
    handleDeleteAction = (pressedKey) => {
        const {inputName} = this.state
        if (
            pressedKey.toUpperCase() === 'DELETE' ||
            pressedKey.toUpperCase() === 'BACKSPACE' ||
            pressedKey === '{bksp}'
        ) {
            this.setState({
                inputName: inputName.slice(0, -1)
            })
        }
    }

    keydownHandler = (event) => {
        const {
            chosenWord,
            gameState,
            inputName,
            history
        } = this.state

        const pressedKey = event.key

        if (this.state.isGameOverModalOpened) {
            return
        }

        this.handleHelpAction(pressedKey)

        this.handleDeleteAction(pressedKey)

        // LOĢIKA, KUR APSTIPRINA VARDU
        if (inputName.length === 5 && (pressedKey.toUpperCase() === 'ENTER' || pressedKey === '{enter}')) {
            if (this.findWord(inputName) === undefined) {
                message.error('Šāds vārds nav atrodams sarakstā. Mēģini citu vārdu!')

            } else {

                const uppercaseName = inputName.join('').toUpperCase()

                if (uppercaseName === chosenWord.title) {
                    console.log('VĀRDS UZMINĒTS!!! APSVEICU!')

                    openSuccessNotification(chosenWord.title, chosenWord.definition)

                   // cik daudz punkti tiek piešķirti
                    let addPointCount
                    switch (gameState.board.length) {
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

                    if(this.state.giveUp) {
                        addPointCount = 0
                    }

                    const currentPoints = gameState.points + addPointCount

                    this.setState({
                            chosenWord: this.setNewWord(),
                            gameState: {
                                ...gameState,
                                points: currentPoints,
                                board: [],
                            },
                            inputName: '',
                            giveUp: false,
                            history: [...history, {
                                name: chosenWord.title,
                                definition: chosenWord.definition,
                                points: addPointCount,
                                type: 'success'
                            }]
                        },
                        () => {
                        this.saveGame()
                    })

                } else {
                    const newWordList = gameState.board.concat(
                        inputName.join('').toUpperCase()
                    )
                    this.setState({
                         gameState: {
                            ...gameState,
                            board: [...newWordList],
                        },
                        inputName: ''
                    })
                }

                // game over
                if (gameState.board.length >= 4) {
                    console.log("GAME OVER!!!")
                    Modal.error({
                        title: 'Neuzminēji! Minamais vārds: ' + chosenWord.title,
                        content: chosenWord.definition,
                        okText: 'nu labi',
                        cancelText: null,
                        cancelButtonProps: {
                            style: {display: 'none'}
                        }
                    });

                    // reset board
                    this.setState({
                        chosenWord: this.setNewWord(),
                        giveUp: false,
                        gameState: {
                            points: 0,
                            board: [],
                            status: 'game-over'
                        },
                        history: [...history, {
                            name: chosenWord.title,
                            definition: chosenWord.definition,
                            points: 0,
                            type: 'error'
                        }]
                    }, () => {
                        this.saveGame()
                    })

                    return
                }
            }
        }

        // Ja nav ievadīts vārds ar vismaz 5 burtiem, tad neko nedara
        if (inputName.length > 4) return false

        // pievienojam jaunu simbolu ievades vārda steitam
        if (alphabet.some((element) => pressedKey.toUpperCase() === element)) {
            this.setState({
                inputName: [...inputName, pressedKey.toUpperCase()],
            })
        }
    }

    findWord = (word) => {
        const w = word.join('').toLowerCase()
        return data.vocabulary.find((name) => name.title === w)
    }

    closeModal = () => {
        const {settings} = this.state

        const sett = {
            isGameOverModalOpened: false,
            isHelpModalVisible: false,

            settings: {
                infoModalVisible: false,
                helpModalVisible: false,
                keyboard: settings.keyboard,
            }
        }
        const newState = {...settings, ...sett}
        this.setState(newState)
    }

    closeAboutModal = () => {
        if( this.state.chosenWord.title === undefined ) {
            this.setState({
                chosenWord: this.setNewWord(),
            })
        }
        this.closeModal()
    }

    onKeyPress = (button) => {
        const key = {key: button}
        if (button === "{shift}" || button === "{lock}") this.handleShift();

        this.keydownHandler(key)
        // console.log('Button pressed', button)
    }

    handleShift = () => {
        let layoutName = this.state.layoutName;

        this.setState({
            layoutName: layoutName === "default" ? "shift" : "default",
            disabledButtons: layoutName === "default" ? 'Q W R T Y O P D F H J Z X V B M' : 'Q W Y X'
        });
    };
    closeHistory = () => {
        const {settings} = this.state

        this.setState({
            settings: {...settings, historyVisible: false}
        })
    }

    changeSettings = (sett) => {
        const {settings} = this.state

        this.setState({
            settings: {...settings, ...sett}
        })

    }

    changeLevel = (checked, levelInput) => {
        this.setState({
            level: {
                easy: true,
                middle: levelInput==='middle' ? checked : levelInput.middle,
                hard: levelInput==='hard' ? checked : levelInput.hard
            }
        })
    }

    giveUp = () => {

        this.setState({
            isHelpModalVisible: true,
            giveUp: true,
        })
    }
    render() {
        const {
            chosenWord,
            gameState,
            inputName,
            isHelpModalVisible,
            giveUp,
            level,
            settings,
            history,
            disabledButtons,

        } = this.state

        return (
            <div style={{maxWidth: '504px', margin: '0 auto'}}>
                <Card style={{padding: "10px", color:"red"}}
                    title={'Punkti: ' + gameState.points}
                    extra={
                        <Toolbar
                            settings={settings}
                            changeSettings={this.changeSettings}
                            gameStatus={giveUp}
                            giveUp={this.giveUp}
                        />
                    }
                >
                    <GameBoard
                        name={inputName}
                        chosenWord={chosenWord.title}
                        board={gameState.board}
                    />
                </Card>

                <AboutModal
                    title="Īsumā par lietotni"
                    open={settings.infoModalVisible}
                    closeModal={this.closeAboutModal}
                    changeLevel={this.changeLevel}
                    level={{level}}
                />

                <HelpModal
                    title="Minamā vārda skaidrojums"
                    open={isHelpModalVisible}
                    definition={chosenWord.definition}
                    closeModal={this.closeModal}
                />
                <History
                    open={settings.historyVisible}
                    onClose={this.closeHistory}
                    history={history}
                    clearGameHistory={this.clearGameHistory}
                />
                {settings.keyboard && (
                    <Keyboard
                        onKeyPress={this.onKeyPress}
                        onChange={this.onChange}
                        layoutName={this.state.layoutName}
                        buttonTheme={[
                            {
                                class: "key-disabled",
                                buttons: disabledButtons
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
                                '{shift} Ā Š D F Ģ H J Ķ Ļ',
                                'Ž X Č V B Ņ M {enter}'
                            ]
                        }}
                        display={{
                            '{bksp}': 'DZĒST',
                            '{enter}': 'APSTIRPINĀT',
                            '{shift}': 'a..ā'
                        }}
                    />
                )}
            </div>
        )
    }
}

export default Lingo
