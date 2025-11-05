import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class InputWord extends Component {
  render() {
    const { name, wrongWord } = this.props

    const charClass = `char rounded border border-gray-300 m-[3px] text-center h-[35px] text-[40px] leading-[35px] ${
      wrongWord ? 'bg-orange-400' : ''
    }`

    return (
        <div className="flex gap-1.5 justify-center">
          <div className={charClass}>
            {name[0]}
          </div>
          <div className={charClass}>
            {name[1]}
          </div>
          <div className={charClass}>
            {name[2]}
          </div>
          <div className={charClass}>
            {name[3]}
          </div>
          <div className={charClass}>
            {name[4]}
          </div>
        </div>
    )
  }
}

InputWord.propTypes = {
  chosenName: PropTypes.array,
  wordList: PropTypes.array,
  wrongWord: PropTypes.bool,
  name: PropTypes.any
};
