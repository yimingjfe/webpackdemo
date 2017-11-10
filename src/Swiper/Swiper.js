import React, { Component } from "react"
import style from './style.css'

export default class Swiper extends Component{
  render(){
    const { children } = this.props
    return (
      <div className={style.container}>
        <div className={style['slider-list']}>
          {children}
        </div>
      </div>
    )
  }
}