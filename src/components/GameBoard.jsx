import PropTypes from 'prop-types'

import React, { Component } from 'react'
import { Divider } from 'antd'
import Word from './Word'
import InputWord from './InputWord'

export default class GameBoard extends Component {
    render() {
        const { choosenName, wordList, wrongWord, name } = this.props

        return (
            <>
                <Word
                    firstChar={choosenName[0]}
                    choosenName={choosenName}
                    name={wordList[0] ? wordList[0] : ''}
                />

                <Word
                    choosenName={choosenName}
                    name={wordList[1] ? wordList[1] : ''}
                />

                <Word
                    choosenName={choosenName}
                    name={wordList[2] ? wordList[2] : ''}
                />

                <Word
                    choosenName={choosenName}
                    name={wordList[3] ? wordList[3] : ''}
                />

                <Word
                    choosenName={choosenName}
                    name={wordList[4] ? wordList[4] : ''}
                />

                <Divider style={{ margin: '4px 0' }} />
                <InputWord wrongWord={wrongWord} name={name} />
            </>
        )
    }
}

GameBoard.propTypes = {
    choosenName: PropTypes.array,
    wordList: PropTypes.array,
    wrongWord: PropTypes.bool,
    name: PropTypes.array
}
