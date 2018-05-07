import React from 'react';
import Button from './Button'

class ButtonList extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            count:5
        }
    }


    render(){
        return(
            <div>
                <input ref="count"></input>
                <button onClick={this.setButtons}>Set Buttons</button>
                {new Array(this.state.count).fill(0).map((d,i)=>
                    <div>
                        <Button index={i+1}/>
                        <br/>
                    </div>
                )}
            </div>
        )
    }

    setButtons=()=>{
        this.setState((prevState) => ({
            count : parseInt(this.refs.count.value)
        }));
        // console.log(this.refs.count.value);
    }


}

export default ButtonList;