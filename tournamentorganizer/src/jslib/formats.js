const KnockOut  = "knockout";
const Groups    = "groups";

class TournamentFormat
{
    constructor(type, grouping, numberOfTeams=3, numberOfGroups=1 ){
        this.TournamentType     = type;
        this.isGroupingPossible = grouping;
        this.numberOfGroups     = numberOfGroups;
        this.numberOfTeams      = numberOfTeams;
    }

    createKnockOut(){
        // Default Implementation for Tournament Format.
        if(this.TournamentType.toLowerCase() != "knockout"){
            throw("Error not a supported method for this format");
            return;
        }
        
    }

    createGrouping(){

    }

}

export default Formats;