import React from 'react';

class Game extends React.Component{
    render(){
        return(
            <div>
                <h1>Numbers Game</h1>
                <Stars count="5"/>
                <Retry/>
                <Answer/>
            </div>
        );
    }

}

const Stars = (props) => {
    return(
        <div>
            {new Array(parseInt(props.count)).fill(0).map((d,i) => 
                <button> {d+1} </button>
            )}
        </div>
    );
}

const Retry = ()=>{
    return(
        <div>
            <button>Retry</button>
        </div>

    )
}


const Answer = ()=>{
    return(
        <div>
            Answer
        </div>

    )
}

export default Game;