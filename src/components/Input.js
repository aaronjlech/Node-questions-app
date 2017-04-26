import React, { Component } from 'react';




export default class Input extends Component{
   


   render(){
      const { type, name, title, onChange } = this.props
      return(
         <label htmlFor={name}>
            {title}
            <input type={type} name={name} onChange={onChange}/>
         </label>
      )
   }
}
