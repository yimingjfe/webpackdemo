import React, { Component } from "react"
import './style.css'
import Swiper from './Swiper'

const settings = {
  easing: 'cubic-bezier(0.69, 0.28, 0.64, 0.5)',
  duration: '500'
}

export default class SimpleSwiper extends Component{
  render(){
    return (
      <div style={{width: '700px', height:'300px', margin: '0 auto'}}>
        <Swiper settings={settings}>
          <div className='slider'>1</div>
          <div className='slider'>2</div>
          <div className='slider'>3</div>
        </Swiper> 
      </div>
    )
  }
}