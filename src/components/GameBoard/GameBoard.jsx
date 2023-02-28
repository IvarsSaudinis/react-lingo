import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Divider } from 'antd'
import {Word} from "../Word";
import {InputWord} from "../InputWord";

export class GameBoard extends Component {
  render() {
    const { chosenName, wordList, wrongWord, name } = this.props

    return (
        <>
          <Word
              firstChar={chosenName[0]}
              chosenName={chosenName}
              name={wordList[0] ? wordList[0] : ''}
          />

          <Word
              chosenName={chosenName}
              name={wordList[1] ? wordList[1] : ''}
          />

          <Word
              chosenName={chosenName}
              name={wordList[2] ? wordList[2] : ''}
          />

          <Word
              chosenName={chosenName}
              name={wordList[3] ? wordList[3] : ''}
          />

          <Word
              chosenName={chosenName}
              name={wordList[4] ? wordList[4] : ''}
          />

          <Divider style={{ margin: '4px 0' }} />
          <InputWord wrongWord={wrongWord} name={name} />
        </>
    )
  }
}

GameBoard.propTypes = {
  chosenName: PropTypes.array,
  wordList: PropTypes.array,
  wrongWord: PropTypes.bool,
  name: PropTypes.string
};
