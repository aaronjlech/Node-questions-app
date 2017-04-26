import React, { Component } from 'react';
import axios from 'axios';



export default class QuestionForm extends Component{


   onChange = (evt) =>{
      let { name, value } = evt.currentTarget
      this.setState({[name]: value})
   }
   submitForm = (evt) => {
      evt.preventDefault();
      axios.post('/questions', this.state)
         .then(() => evt.reset())

   }
   render(){
      return(
         <form onSubmit={this.submitForm}>
            <label htmlFor="text">
               Username
               <input name="username" type="text" onChange={this.onChange}/>
            </label>
            <label htmlFor="text">
               Question Title
               <input name="title" type="text" onChange={this.onChange}/>
            </label>
            <label htmlFor="question">
               What's Your ?
               <textarea name="text" id="" cols="30" rows="3" onChange={this.onChange}></textarea>
            </label>
            <button className="button" type='submit'>Submit Question</button>
         </form>
      )
   }
}
