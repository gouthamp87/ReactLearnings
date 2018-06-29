import React, {Component} from 'react';
import './App.css';

class EntriesForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            teamsLeft : this.props.teams
        }
        this.teamMapping = {};
        // this.teamsLeft = this.props.teams;
        // this.dummTeams = {};
        // this.initializeTeams(this.teamsLeft);
    }


    render(){
        return(
            <div>
                 <h2> Please Enter the teams according to their Seeding </h2>
                 {//let teams = parseInt(this.state.teamsLeft)
                    <div>
                        <EntryForm seed={this.state.teamsLeft} returnTeams={this.makeEntry}/>
                    </div>
                 }
            </div>
        );
    }

    componentWillReceiveProps(){
        console.log("Component " + this.props.index + " Will Receive Props" );
        this.setState(() => ({
            teamsLeft : this.state.teamsLeft
        }));
        // console.log(this.props);
    }
    componentWillMount(){
        console.log("Component " + this.props.teams + " Will Mount")
    }

    componentDidUpdate(){
        console.log("Component " + this.props.teams + " Did Update")
    }

    componentDidCatch(){
        console.log("Component " + this.props.teams + " Did catch")
    }

    componentDidMount(){
        console.log("Component " + this.props.teams + " Mounted")
    }

    componentWillUpdate(){
        console.log("Component " + this.props.teams + " Updated")
    }
    componentWillUnmount(){
        console.log("Component " + this.props.teams + " Will Unmount")
    }

    makeEntry = (teamsEntered) =>{
        this.props.returnTeams(teamsEntered);
    }
    
    
}

class EntryForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            seed : this.props.seed
        }
        
    }
    render(){
        return(
            <div>
                {new Array(parseInt(this.state.seed)).fill(0).map((d,i) => 
                <div key= {i}>
                    <input type="text" id={i+1} defaultValue=""/> <a>as seed {i+1}</a>
                </div>
                )}
                <button type="submit" name="entry" onClick={this.readTeams}>Enter Teams in Tournament</button>
            </div>
        );
    }
    readTeams = () => {
        var teamCount = parseInt(this.state.seed);
        var teams = {};
        var replacement = {};
        while(teamCount > 0){
            var teamName= document.getElementById(teamCount).value;
            var teamKey = "Team" + teamCount;
            console.log("Name of team seeded " + teamCount + " is " + teamName);
            teams[teamCount--] = teamName;
            // replacement[teamKey]["teamName"] = teamName;
        }
        this.props.returnTeams(teams);
    }
}




export default EntriesForm;
