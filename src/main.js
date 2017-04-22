// import {}
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


axios.get('/questions').then(res => console.log(res.data))


class App extends Component{

   // constructor(){
   //
   // }


   render(){
      return(
         <div className="container">
            <h1>Im the main container</h1>
         </div>
      )

   }
}


ReactDOM.render(<App/>, document.querySelector('#app-container'))
