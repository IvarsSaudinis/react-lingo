import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Char} from "../Char";

export class Word extends Component {

  getCharPositionStatus = (index) => {
    const { name, chosenName } = this.props

    if (name === '') {
      return 'none'
    }

    if (chosenName[index] === name[index]) {
      return 'correct'
    }

    if (chosenName.indexOf(name[index]) === -1) {
      return 'wrong'
    } else {
      return 'misplaced'
    }
  }

  render() {
    const { name, firstChar } = this.props
    return (
        <div className="flex gap-1.5 justify-center">
          <Char
              status={this.getCharPositionStatus(0)}
              char={firstChar || name[0]}
          />
          <Char status={this.getCharPositionStatus(1)} char={name[1]} />
          <Char status={this.getCharPositionStatus(2)} char={name[2]} />
          <Char status={this.getCharPositionStatus(3)} char={name[3]} />
          <Char status={this.getCharPositionStatus(4)} char={name[4]} />
        </div>
    )
  }
}

Word.propTypes = {
  firstChar: PropTypes.string,
  chosenName: PropTypes.string,
  name: PropTypes.string
};
