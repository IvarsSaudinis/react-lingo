import React, { Component } from "react";

const defaultStyle = {
  borderRadius: "4px",
  margin: "3px",
  float: "left",
  textAlign: "center",
  paddingTop: "30px",
  width: "80px",
  height: "50px",
  fontSize: "40px",
  border: "1px solid #ccc",
};

const wrongWordStyle = {
  backgroundColor: "orange"
}

export default class InputWord extends Component {
  render() {
    const { name, wrongWord } = this.props;
    let style = defaultStyle
   
    if (wrongWord) {
      style = {
        ...defaultStyle,
        ...wrongWordStyle
      }
    }
    
    return (
      <div style={{width: "550px"}}>
         <div className="char" style={style}>{name[0]}</div>
         <div className="char" style={style}>{name[1]}</div>
         <div className="char" style={style}>{name[2]}</div>
         <div className="char" style={style}>{name[3]}</div>
         <div className="char" style={style}>{name[4]}</div>
      </div>
    );
  }
}
