import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./Char.css"
export class Char extends Component {
  render() {
    const { char, status } = this.props;
    return (
        <div className={`char ${status}`}>
          { char }
        </div>
    );
  }
}

Char.propTypes = {
  char: PropTypes.string,
  status: PropTypes.string
};
