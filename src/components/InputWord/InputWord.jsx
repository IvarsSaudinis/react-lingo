import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd'

const defaultStyle = {
  borderRadius: '4px',
  margin: '3px',
  float: 'left',
  textAlign: 'center',
  paddingTop: '0',
  height: '35px',
  fontSize: '40px',
  border: '1px solid #ccd'
}

const wrongWordStyle = {
  backgroundColor: 'orange'
}
export class InputWord extends Component {
  render() {
    const { name, wrongWord } = this.props

    let style = defaultStyle

    if (wrongWord) {
      style = {
        ...defaultStyle,
        ...wrongWordStyle
      }
    }

    return (
        <Row
            gutter={6}
            justify="center"
            style={{ justifyContent: 'safe center' }}
        >
          <Col span={4}>
            <div className="char" style={style}>
              {name[0]}
            </div>
          </Col>
          <Col span={4}>
            <div className="char" style={style}>
              {name[1]}
            </div>
          </Col>
          <Col span={4}>
            <div className="char" style={style}>
              {name[2]}
            </div>
          </Col>
          <Col span={4}>
            <div className="char" style={style}>
              {name[3]}
            </div>
          </Col>
          <Col span={4}>
            <div className="char" style={style}>
              {name[4]}
            </div>
          </Col>
        </Row>
    )
  }
}

InputWord.propTypes = {
  chosenName: PropTypes.array,
  wordList: PropTypes.array,
  wrongWord: PropTypes.bool,
  name: PropTypes.string
};
