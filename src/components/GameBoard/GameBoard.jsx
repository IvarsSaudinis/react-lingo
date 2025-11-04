import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Separator } from '../ui/separator'
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

                <Separator className="my-1"/>
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
