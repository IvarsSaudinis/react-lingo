import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Divider} from 'antd'
import {Word} from "../Word";
import {InputWord} from "../InputWord";

export class GameBoard extends Component {
    render() {
        const {chosenWord, board, name} = this.props
        let firstChar  = ''

        if(chosenWord?.length > 0) firstChar = chosenWord[0]
        if(board.length > 0) firstChar = board[0][0]

        return (
            <>
                <Word
                    firstChar={ firstChar }
                    chosenName={chosenWord}
                    name={board[0] ?? ''}
                />

                <Word
                    chosenName={chosenWord}
                    name={board[1] ?? ''}
                />

                <Word
                    chosenName={chosenWord}
                    name={board[2] ?? ''}
                />

                <Word
                    chosenName={chosenWord}
                    name={board[3] ?? ''}
                />

                <Word
                    chosenName={chosenWord}
                    name={board[4] ?? ''}
                />

                <Divider style={{margin: '4px 0'}}/>
                <InputWord name={name}/>
            </>
        )
    }
}

GameBoard.propTypes = {
    chosenWord: PropTypes.string,
    board: PropTypes.array,
    name: PropTypes.any
};
