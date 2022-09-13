import React from 'react';

function Square(props) {
    return (
      <button 
        //here add specific-square class name with template literal
        className={`square ${
          props.squareIndex === props.specificSquareIndex ? "specific-square" : ""
        }`} 
          onClick={props.onClick}
        >
        {props.value}
      </button>
    );
  }

export default Square;