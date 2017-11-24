import React, { Component } from "react"
import style from './style.css'
// import Slider from './Slider'
import cn from 'classnames'
import { log } from "core-js/library/web/timers";

export default class Swiper extends Component{

  state = {
    sliderStyle: {},
    sliderListStyle: {}
  }

  container: null

  getSliderStyle = () => {
    // 与直接this.props.children.length的区别？
    const length = React.Children.count(this.props.children)
    const containerRct = this.container.getBoundingClientRect()
    const width = containerRct.width

    return {
      width,
      display: 'inline-block',
      height: '100%',
      boxSizing: 'border-box'
    }
  }

  getKey = (child, fallbackKey) => {
    if(child.key === null || child.key === undefined) return fallbackKey
    return child.key
  }

  getSlider = (elem, index) => {
    const { sliderStyle } = this.state
    return React.cloneElement(elem, {
      key: this.getKey(elem, index),
      style: {...elem.props.style, ...sliderStyle},
    })
  }

  getSliderListStyle = (sliderStyle) => {
    const sliderWidth = sliderStyle.width
    const length = this.props.children.length
    const width = sliderWidth * length

    return {
      width
    }
  }

  initialize = () => {
    const sliderStyle = this.getSliderStyle()
    const sliderListStyle = this.getSliderListStyle(sliderStyle)
    // console.log('this', this)
    this.setState({
      sliderStyle,
      sliderListStyle
    })
  }

  renderSliderList = () => {
    const { children } = this.props
    const { sliderListStyle, sliderStyle } = this.state
    return (
      <div className={cn(style['slider-list'], style['clearfix'])} style={sliderListStyle}>
        {
          children.map( (child, index) => {
            const slider = this.getSlider(child, index)
            return (
              slider
            )
          })
        }
      </div>
    )
  }

  setContainer = (container) => {
    this.container = container
    console.log('yyyy', this.container)
  }

  componentDidMount() {
    this.initialize()
  }
  

  render(){
    const { children } = this.props
    const sliderList = this.renderSliderList()
    return (
      <div className={style.container} ref={this.setContainer}>
        { sliderList }
      </div>
    )
  }
}