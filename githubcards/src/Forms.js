import React,{Component} from 'react';
import logo from './logo.svg';
import "./App.css";
import axios from 'axios';
class InputForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            //cards: (this.props.userCards)
            // [
            //     {name:"Goutham Peepala",
            //     url:"https://avatars2.githubusercontent.com/u/17699180?v=4",
            //     company:"Citrix R&D India Pvt Ltd"},
            //     {name:"Sai Kumar",
            //     url:"https://avatars.githubusercontent.com/u/8445?v=3",
            //     company: "HCL Technologies"}
            // ]
        };
    }
    
    render(){
        return(
            <div>
                <input ref="user" type="text" name="LastName" placeholder="GitUserName"></input><br/>
                <button type="submit" value="Get User" onClick={this.getUser}>Get GitHub User</button>
                <CardsList cards={this.props.userCards}/>
            </div>  
        );
    }

    getUser = () =>{
        let user = this.refs.user.value;
        let urlReq = 'https://api.github.com/users/' + user;
        console.log("URL Request is :" + urlReq);
        axios.get(urlReq)
            .then(resp => {
                console.log("REsponse data is "+ resp.data);
                this.props.userInfo(resp.data);
            });
        // this.setState ((prevState) => ({
        // }));
    }
    // componentWillReceiveProps(){
    //     console.log("Component " + this.props.userName + " Will Receive Props" );
    //     this.setState(() => ({
    //         userName : this.props.retrieveUser
    //     }));
    //     // console.log(this.props);
    // }

}

class UserCard extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={{margin: '1em'}}>
                <img src={this.props.avatar_url} className="App-Image" />
                <div style={{display : 'inline-block', marginLeft : 5}}>
                    <div  style= {{fontSize : '1.25em', fontWeight: 'bold'}}>
                    {this.props.name}
                    </div>
                    <div className="App-UserInfo">
                    {this.props.company}
                    </div>
                </div>
            </div>
        );
    }


}


class CardsList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                {this.props.cards.map(card => <UserCard key= {card.id} {...card}/>)}
            </div>
        );
    }
}

export default InputForm;
