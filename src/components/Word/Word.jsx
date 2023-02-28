import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Col, Row} from "antd";
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
        <Row
            gutter={6}
            justify="center"
            style={{ justifyContent: 'safe center' }}
        >
          <Col span={4}>
            <Char
                status={this.getCharPositionStatus(0)}
                char={firstChar || name[0]}
            />
          </Col>
          <Col span={4}>
            <Char status={this.getCharPositionStatus(1)} char={name[1]} />
          </Col>
          <Col span={4}>
            <Char status={this.getCharPositionStatus(2)} char={name[2]} />
          </Col>
          <Col span={4}>
            <Char status={this.getCharPositionStatus(3)} char={name[3]} />
          </Col>
          <Col span={4}>
            <Char status={this.getCharPositionStatus(4)} char={name[4]} />
          </Col>
        </Row>
    )
  }
}

Word.propTypes = {
  firstChar: PropTypes.string,
  chosenName: PropTypes.array,
  name: PropTypes.string
};
