import React, { Component } from "react"
import style from './style.css'

export default class Slider extends Component{
  render(){
    return(
      <div className={style['slider']}>
        {this.props.children}
      </div>
    )
  }
}