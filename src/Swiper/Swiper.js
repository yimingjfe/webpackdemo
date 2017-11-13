import React, { Component } from "react"
import style from './style.css'
import Slider from './Slider'

export default class Swiper extends Component{

  renderSliderList = () => {
    const { children } = this.props
    return (
      <div className={style['slider-list']}>
        {
          children.map( (child, index) => {
            return (
              <Slider
                key={index}
              >
                {child}
              </Slider>  
            )
          })
        }
      </div>
    )
  }

  render(){
    const { children } = this.props
    return (
      <div className={style.container}>

      </div>
    )
  }
}