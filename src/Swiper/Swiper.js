import React, { Component } from "react"
import style from './style.css'
import defaultSettings from './default-settings'
// import Slider from './Slider'
import cn from 'classnames'
import { log } from "core-js/library/web/timers"
import WrapWithDefault from './WrapWithDefault'
import Dots from './Dots'
import PropTypes from 'prop-types'
import {head, last} from 'lodash'
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
    this.setState({
      sliderStyle,
      sliderListStyle
    })
  }

  normalizeSliderIndex = (index) => {
    const { children } = this.props
    return (index + children.length) % children.length 
  }

  pre = () => {
    const { curSliderIndex } = this.state
    const index = curSliderIndex - 1
    this.jumpTo(index)
  }

  next = () => {
    const { curSliderIndex } = this.state
    const index = curSliderIndex + 1
    this.jumpTo(index)
  }

  jumpTo = (index) => {
    let normalizeIndex = 0
    const { settings } = this.props
    const { infinite, slidesToScroll } = settings
    if(infinite){
      normalizeIndex = this.normalizeSliderIndex(index + slidesToShow)
    } else {
      normalizeIndex = this.normalizeSliderIndex(index)
    }
    this.animate(normalizeIndex)
  }
  // sliderIndex 0 3  2-4
  // index 1 4
  animate = (index) => {
    const { sliderListStyle } = this.state
    const { settings } = this.props
    const { infinite } = settings
    if(!!infinite){
      index = index + 1
    }
    const offset = this.getOffset(index)
    const transform = this.getTransform(offset)
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

  renderArrows = () => {
    const { settings } = this.props
    const { preArrow, nextArrow } = settings
    const PreArrow = React.cloneElement(preArrow, {
      key: 'pre',
      onClick: this.pre
    })
    const NextArrow = React.cloneElement(nextArrow, {
      key: 'next',
      onClick: this.next
    })
    return (
      <div>
        {PreArrow}
        {NextArrow}
      </div> 
    )
  }

  renderSliderList = () => {
    let sliders = []
    const { children, settings } = this.props
    const { infinite } = settings
    const { sliderListStyle, sliderStyle } = this.state
    sliders = children.slice()
    // 这个应该根据一次要滚动多少个元素
    if(!!infinite){
      sliders.unshift(last(children))
      sliders.push(head(children))
    }
    return (
      <div className={cn('slider-list', 'clearfix')} style={sliderListStyle}>
        {
          React.Children.map(sliders, (child, index) => {
            const slider = this.getSlider(child, index)
            return (
              slider
            )
          })
        }
      </div>
    )
  }

  componentDidMount() {
    this.initialize()
  }
  

  render(){
    const { children, settings } = this.props
    const { curSliderIndex } = this.state
    const sliderList = this.renderSliderList()
    const arrows = this.renderArrows()
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
        { arrows }
      </div>
    )
  }
}

export default WrapWithDefault(Swiper, defaultSettings)