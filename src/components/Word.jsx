import PropTypes from 'prop-types'

import React, { Component } from 'react'
import { Col, Row } from 'antd'

import Char from './Char'

export default class Word extends Component {
    getStatus = (index) => {
        const { name, choosenName } = this.props

        if (name === '') {
            return 'none'
        }

        if (choosenName[index] === name[index]) {
            return 'correct'
        }

        if (choosenName.indexOf(name[index]) === -1) {
            return 'wrong'
        } else {
            return 'misplaced'
        }
    }

    render() {
        const { name, firstChar } = this.props

        // status: none, correct, wrong, misplaced

        return (
            <Row
                gutter={6}
                justify="center"
                style={{ justifyContent: 'safe center' }}
            >
                <Col span={4}>
                    <Char
                        status={this.getStatus(0)}
                        char={firstChar || name[0]}
                    />
                </Col>
                <Col span={4}>
                    <Char status={this.getStatus(1)} char={name[1]} />
                </Col>
                <Col span={4}>
                    <Char status={this.getStatus(2)} char={name[2]} />
                </Col>
                <Col span={4}>
                    <Char status={this.getStatus(3)} char={name[3]} />
                </Col>
                <Col span={4}>
                    <Char status={this.getStatus(4)} char={name[4]} />
                </Col>
            </Row>
        )
    }
}

Word.propTypes = {
    firstChar: PropTypes.string,
    choosenName: PropTypes.array,
    name: PropTypes.string
}
