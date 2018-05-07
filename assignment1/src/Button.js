import React, { Component } from 'react'

class Button extends Component{

    
     constructor(props){
        super(props);
        this.state = {counter : this.props.index};
    }

    // End Replacement Constructor

    render(){
        var {counter} = this.state
        return( 
            <button onClick = {this.incrementCounter}>{counter} </button>
        );
    }

    incrementCounter = () =>{
        this.setState((prevState) => ({
            counter : prevState.counter + 1
        }));
    }

    componentWillReceiveProps(){
        console.log("Component " + this.props.index + " Will Receive Props" );
        this.setState(() => ({
            counter : this.props.index
        }));
        // console.log(this.props);
    }
    componentWillMount(){
        console.log("Component " + this.props.index + " Will Mount")
    }

    componentDidUpdate(){
        console.log("Component " + this.props.index + " Did Update")
    }

    componentDidCatch(){
        console.log("Component " + this.props.index + " Did catch")
    }

    componentDidMount(){
        console.log("Component " + this.props.index + " Mounted")
    }

    componentWillUpdate(){
        console.log("Component " + this.props.index + " Updated")
    }
    componentWillUnmount(){
        console.log("Component " + this.props.index + " Will Unmount")
    }
    
}


export default Button;