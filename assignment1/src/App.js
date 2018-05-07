import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import IncrementButton from './IncrementButton';
import ButtonList from './ButtonList';

class App extends Component {
  state = {counter : 0};
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ButtonList/>
        <br/>
        <br/>
        <br/>
        <p> The below are increment counters and their sum on clicking would be displayed below </p>
        <IncrementButton initialValue={5}   onClickFunc={this.incrementCounter}/>
        <IncrementButton initialValue={10}  onClickFunc={this.incrementCounter}/>
        <IncrementButton initialValue={25}  onClickFunc={this.incrementCounter}/>
        <IncrementButton initialValue={50}  onClickFunc={this.incrementCounter}/>
        <IncrementButton initialValue={100} onClickFunc={this.incrementCounter}/>
        <br/>   
        <a>The sum is </a><Result counter={this.state.counter}/>
        <br/>
      </div>
    );
  }

  incrementCounter = (increment) =>{
    this.setState((prevState) => ({
        counter : prevState.counter + increment
    }));
  }
}



const Result = (props) => {
    return (<div>{props.counter}</div>); 
};
// This is a function component but can't be usedfor much. Should be used for something static.
// const Button = (props) =>{
//   return(
//     <button> GO </button>
//   )
// }

// Now we can create a class for the same.
// Refer to Button.js



// React.render(<Button/>, document.getElementById('root'));
export default App;
