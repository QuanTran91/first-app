import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class AddCard extends Component {
  state = {
    cards:[
    {
        name : "Paul1",
        avatar_url : "https://raw.githubusercontent.com/hashdog/node-identicon-github/master/examples/images/github.png",
        company : "Quanto"
    },
    {
        name : "Paul2",
        avatar_url : "https://avatars2.githubusercontent.com/u/464297?v=3&s=88",
        company : "Lotus"
    },
    {
        name : "Paul3",
        avatar_url : "https://avatars2.githubusercontent.com/adob?v=3&s=40",
        company : "Microscope"
    }
    ]
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.addNewCard}/>
        <CardList cards = {this.state.cards} />
      </div>  
    )
  }

  addNewCard = (infor)=> {
    this.setState(prevState =>({
        cards : prevState.cards.concat(infor)
    }));
  }
}




const Card = (props)=> {
 return (
     <div>
         <img width='75' src={props.avatar_url}/>
         <div className="info" style={{display:'inline-block',marginLeft:10}}>
             <div style={{fontSize:'1.25em',fontWeight:'bold'}}>
                 {props.name}
             </div>
             <div>
                 {props.company}
             </div>
         </div>
     </div>
 )
}

const CardList = (props) =>{
    return (
        <div>
            {props.cards.map(card => <Card {...card}/>)} 
        </div>
    )
}

class Form extends Component{
  state = {userName:''}
   handleSubmit = (event)=> {
      event.preventDefault();
      axios.get('https://api.github.com/users/'+ this.state.userName)
           .then(response => {
              this.props.onSubmit(response.data);
           }).catch(function (error) {
                console.log(error);
                alert("Can not display this user");
            });;
   }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='text'
                  ref = {(input)=> this.userNameInput = input} 
                  onChange = {(event)=> this.setState({userName: event.target.value })}              
                 placeholder='Enter name here'/>
                <button type='submit'> Add user </button>
            </form>
        )
    }
}
export default AddCard;
