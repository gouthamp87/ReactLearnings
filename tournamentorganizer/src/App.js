import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InitialForm from './initialForm';
import EntriesForm from './EntriesForm';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      form : <InitialForm onComplete={this.readFormatAndTeams}/>
    }
    this.tournamentName;
    this.tournamentType;
    this.tournamentSize;
    this.tournamentTeams;
    this.replacementTeams;
    this.noOfGroups;
  }


  render() {
    return (
      <div className="App">
        {this.state.form}
      </div>
    );
  }

  readFormatAndTeams = (tournament) => {
    console.log("The Tournament Name is "+ tournament.tournamentName + 
              " Of Format " + tournament.tournamentType + 
              " With " + tournament.noOfTeams + " Teams"+
              " To Be divided into " + tournament.noOfGroups + " Groups");
    this.tournamentName   = tournament.tournamentName;
    this.tournamentType   = tournament.tournamentType;
    this.tournamentSize   = parseInt(tournament.noOfTeams); 
    this.noOfGroups = parseInt(tournament.noOfGroups);
    this.readTeams(this.tournamentSize);
  }

  readTeams = (size) => {
    this.setState( {form : <EntriesForm teams={size} returnTeams={this.teamsRetrieved}/>});
  }

  teamsRetrieved = (teams, replacementTeams) => {
    console.log("Teams entered are :", teams);
    this.tournamentTeams = teams;
    this.replacementTeams = teams;
    this.processTeams();
  }

  processTeams = () => {
    if(this.tournamentType === "Knockout"){
      var res = this.isPowerOfTwo(this.tournamentSize);
      this.tournamentSize = res;
      console.log("The Adjusted size of Tournament is :", res);
      this.knockOutFixtures(res);
    } else if(this.tournamentType === "Groups"){
      var teamsOdd = this.tournamentSize%this.noOfGroups;
      if(teamsOdd === 0){
        console.log("We have groups with Equal teams, no need to Normalize");
      } else {
        teamsOdd = (this.noOfGroups - teamsOdd);
        console.log("We have " + teamsOdd + "teams to be adjusted");
        this.tournamentSize += teamsOdd;
        console.log("The Adjusted size of Tournament is :", this.tournamentSize);
      }
      this.createGroups(teamsOdd);
    }
  }

  knockOutFixtures = (n) =>{
    var count = 0;
    while( n != 1)
    {
        n >>= 1;
        count += 1;
    }
    var tournamentFixtures= {};
    console.log("No Of Rounds of Tournament if KnockOut are: ", count);
    var round=1;
    while(count-- > 0){
      // var roundName = "round" + round;
      var roundSize = parseInt(this.tournamentSize/round);
      if(Object.keys(tournamentFixtures).length === 0 && tournamentFixtures.constructor === Object){
        tournamentFixtures[round] = this.createRound(round,roundSize, this.tournamentTeams);
      } else {
        tournamentFixtures[round] = this.createRound(round,roundSize, tournamentFixtures[round-1]);
      }
      round++;
    }
    console.log("The final fixtures are :", tournamentFixtures);
  }

  createGroups = (teamsOdd) => {
    var groupSize = parseInt(this.tournamentSize/this.noOfGroups);
    console.log("We are creating " + this.noOfGroups + " of Max Size :" + groupSize);
    // var groupIndex = this.tournamentSize + 1;
    var groups = new Array(this.noOfGroups).fill(0).map((d,i) => 
      d = "Group" + (i+1)
    );
    console.log("Created Groupings of ", groups);
    this.populateGroups(groups, this.tournamentTeams, teamsOdd);
  }
  
  populateGroups = (groups, teams, dummyTeams) => {
    var teamHigher = 1;
    var teamLower = this.tournamentSize;
    var teamsRemaining = this.tournamentSize-dummyTeams;
    var tournamentGroups = {};
    var i=0;
    groups.forEach(element => {
        tournamentGroups[++i]={"groupName": element, "teams":[]};
    });

    while(1){
      for(var i=1; i<= this.noOfGroups;i++){
        if(!teamsRemaining){
          break;
        }
        
        tournamentGroups[i]["teams"].push(teams[teamHigher++]);
        teamsRemaining--;
        if(teams[teamLower] && (teamsRemaining > this.noOfGroups)){
          tournamentGroups[i]["teams"].push(teams[teamLower]);
          teamsRemaining--;
        } 
        // else {
        //   // tournamentGroups[i]["teams"].push("none");
        //   // dummyTeams--;
        // }
        teamLower--;
      }
      if(!teamsRemaining)
        break;
    }
    console.log("The final Groups are :", tournamentGroups);
  }


  isPowerOfTwo = (n) =>{ 
    if (n && !(n & (n - 1)))
      return n;

    var count = 0;
    while( n != 0)
    {
        n >>= 1;
        count += 1;
    }
    return 1 << count;
  }

  createRound = (round, size, tournamentTeams) =>{
    console.log("Creating Round " + round + "with team size" + size);
    var fixtures = size/2;
    console.log("No oF fixtures are : ", fixtures);
    var fixtureForRound = {};
    var teamHigher = 1;
    var teamLower = size;
    
    for(var i=1; i <= fixtures ; i++,teamHigher++, teamLower-- )
    {
      if(tournamentTeams[teamLower]){
        fixtureForRound[i] =  tournamentTeams[teamHigher] + " vs " + tournamentTeams[teamLower];
      } else {
        fixtureForRound[i] =  tournamentTeams[teamHigher] + " gets a Bye in this Round";
      }
    }
    return fixtureForRound;
  }

}

export default App;
