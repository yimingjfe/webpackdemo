import React, { Component } from "react"
import style from './style.css'
import Swiper from './Swiper'

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  // slidesToScroll: 1
}

export default class SimpleSwiper extends Component{
  render(){
    return (
      <div style={{width: '700px', margin: '0 auto'}}>
        <Swiper>
          <div className={style.slider}>432232344</div>
          <div className={style.slider}>4234</div>
        </Swiper> 
      </div>
    )
  }
}