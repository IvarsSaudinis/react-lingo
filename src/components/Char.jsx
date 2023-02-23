import React, { Component } from "react";
 
 

  const correctCharStyle = {
    backgroundColor: "#addbad"
  }

  const wrongCharStyle = {
    backgroundColor: "#f7b9ac"
  }
    
  const misplacedCharStyle = {
    backgroundColor: "#f1ea82"
  }

  /*
  // andris
        const correctCharStyle = {
        backgroundColor: "#009052",
        };

        const wrongCharStyle = {
        backgroundColor: "#e14600",
        };

        const misplacedCharStyle = {
        backgroundColor: "#dad30f",
        };
*/

export default class Char extends Component {

  render() {
    const { char, status } = this.props;
  
    let style

    // none, correct, wrong, misplaced
    switch (status) {
        case 'correct':
            style = correctCharStyle
            break;
        case 'wrong':
            style =  wrongCharStyle
            break;
        case 'misplaced':
            style =  misplacedCharStyle
            break;
           
        default:
            break;
    }

    return (
      <div className="char" style={style} >
        { char }        
      </div>
    );
  }
}
