import React, { Component } from 'react';

class IncrementButton extends Component{
    handleClick = () => {
        this.props.onClickFunc(this.props.initialValue)
    }
    render(){
        return(
            <button onClick = {this.handleClick}>+{this.props.initialValue} </button>
        );
    }
}


export default IncrementButton;