import React, { Component } from "react"
import style from './style.css'
import defaultSettings from './default-settings'
// import Slider from './Slider'
import cn from 'classnames'
import { log } from "core-js/library/web/timers"
import WrapWithDefault from './WrapWithDefault'
import Dots from './Dots'
import PropTypes from 'prop-types'
import './style.css'

class Swiper extends Component{

  static PropTypes = {
    
  }

  state = {
    curSliderIndex: 0,
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
    const { settings } = this.props
    const sliderWidth = sliderStyle.width
    const length = this.props.children.length
    const width = sliderWidth * length

    return {
      width,
      transition: `transform ${settings.easing} ${settings.duration}`
    }
  }

  initialize = () => {
    const sliderStyle = this.getSliderStyle()
    const sliderListStyle = this.getSliderListStyle(sliderStyle)
    console.log('sliderStyle', sliderStyle)
    this.setState({
      sliderStyle,
      sliderListStyle
    })
  }

  renderSliderList = () => {
    const { children } = this.props
    const { sliderListStyle, sliderStyle } = this.state
    console.log('sliderListStyle', sliderListStyle)
    return (
      <div className={cn('slider-list', 'clearfix')} style={sliderListStyle}>
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

  normalizeSliderIndex(index){
    const { children } = this.props
    return (index + children.length) % children.length 
  }

  pre(){
    const { curSliderIndex } = this.state
    const index = curSliderIndex - 1
    this.jumpTo(index)
  }

  next(){
    const { curSliderIndex } = this.state
    const index = curSliderIndex + 1
    this.jumpTo(index)
  }

  jumpTo = (index) => {
    const normalizeIndex = this.normalizeSliderIndex(index)
    this.animate(normalizeIndex)
  }

  animate = (index) => {
    const { sliderListStyle } = this.state
    const offset = this.getOffset(index)
    const transform = this.getTransform(offset)
    console.log('transform', transform)
    this.setState({
      curSliderIndex: index,
      sliderListStyle: {
        ...sliderListStyle,
        transform
      }
    })
  }

  getOffset = (index) => {
    const { sliderStyle } = this.state
    const width = sliderStyle.width
    return -index * width
  }

  getTransform = (offset) => {
    return `translate3d(${offset}px, 0, 0)` 
  }

  componentDidMount() {
    this.initialize()
  }
  

  render(){
    const { children, settings } = this.props
    const { curSliderIndex } = this.state
    const sliderList = this.renderSliderList()
    return (
      <div className={'pup-swiper-container'} ref={container => this.container = container}>
        { sliderList }
        <Dots
          curIndex={curSliderIndex}
          slidesCount={children.length}
          slidesToScroll={settings.slidesToScroll}
          customPaging={settings.customPaging}
          curSliderIndex={settings.curSliderIndex}
          onClick={this.jumpTo}
        />
      </div>
    )
  }
}

export default WrapWithDefault(Swiper, defaultSettings)