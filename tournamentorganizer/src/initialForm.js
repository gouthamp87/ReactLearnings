import React from 'react'


class InitialForm extends React.Component{
    constructor (props){
        super(props);
        this.state = {
            tournamentType  : "Groups",
            tournamentName  : "Football",
            noOfTeams       : 3,
            noOfGroups      : 1
        }
        this.submitEntered = false;
    }

    render() {
        return (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Welcome to Tournament Scheduler</h1>
            </header>
            <p className="App-intro">
              Please Go through the Read Me Document, if you need any clarifications
            </p>
            <form onSubmit={this.getTournamentDetails} > {/*action="../public/TeamEntries.html" method="get"*/}
              Tournament Name
              <input type="text" ref="tournamentName" defaultValue={this.state.tournamentName}/>
              <button type="submit" name="create">Create Tournament</button>
              <br/>
            </form>
            <form>
                <input type="radio" value="Groups" onChange={this.changeTournamentType} checked={this.state.tournamentType === "Groups"} defaultChecked />Group Tournament
                <input type="radio" value="Knockout" onChange={this.changeTournamentType} checked={this.state.tournamentType === "Knockout"}/> Knockout <br/>
                Number of Teams
                <input type="text" inputMode="number" ref="noOfTeams" defaultValue={this.state.noOfTeams}/>
                <div id="GroupSettings">
                    Number of Groups
                    <input type="text" inputMode="number" ref="noOfGroups" defaultValue={this.state.noOfGroups}/>
                </div>
            </form>
          </div>
        );
    }

    componentDidUpdate(){
        if(this.submitEntered){
            this.submitEntered = false;
            this.props.onComplete(this.state);
        }
        // let tournament = { "TournamentName": this.state.tournamentName,
        //                     "TournamentType": this.state.tournamentType};
    }

    changeTournamentType= (event) =>{
        let format = event.target.value;
        this.setState ({
            tournamentType : format
        });
        var x = document.getElementById("GroupSettings");
        if(format === "Knockout"){
            this.setState({
                noOfGroups : 0
            })
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
        console.log("Changed Tournament Type to :", format);
    }
    
    getTournamentDetails = (event) => {

        this.submitEntered = true;
        event.preventDefault();
        console.log("Tournament is created : "+ this.refs.tournamentName.value);
        this.setState (({
            tournamentName  : this.refs.tournamentName.value,
            // tournamentType  : this.refs.tournamentType.value,
            noOfGroups      : this.refs.noOfGroups.value,
            noOfTeams       : this.refs.noOfTeams.value
        }));
    }


}

export default InitialForm;