import React, { Component } from "react";

import Char from "./Char";

export default class Word extends Component {

  getStatus = (index) => {
    const { name, choosenName } = this.props;
    
    if(name === "")
    {
      return "none"
    }
   
    if (choosenName[index] === name[index]) {
      return "correct";
    } 
    
    if (choosenName.indexOf(name[index])===-1) {
      return  "wrong";
    }  else {
      return  "misplaced";
    }
    
  };

  render() {
    const { name, firstChar } = this.props;

    // status: none, correct, wrong, misplaced

    return (
      <div style={{ width: "550px", margin: "0 auto" }}>
        <Char status={this.getStatus(0)} char={!!firstChar ? firstChar : name[0]} />
        <Char status={this.getStatus(1)} char={name[1]} />
        <Char status={this.getStatus(2)} char={name[2]} />
        <Char status={this.getStatus(3)} char={name[3]} />
        <Char status={this.getStatus(4)} char={name[4]} />
      </div>
    );
  }
}
