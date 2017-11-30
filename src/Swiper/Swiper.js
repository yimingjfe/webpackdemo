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
import { normalize } from "path";

class Swiper extends Component{

  static PropTypes = {
    
  }

  state = {
    curSliderIndex: 0,
    pageIndex: this.props.settings.slidesToShow,
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

  getTransition = () => {
    const { settings } = this.props
    const duration = this.ms2s(settings.duration)
    return `transform ${settings.easing} ${duration}s`
  }

  getSliderListStyle = (sliderStyle) => {
    const { settings } = this.props
    const sliderWidth = sliderStyle.width
    const length = this.props.children.length
    let width = 0
    const transition = this.getTransition()
    if(settings.infinite){
      width = sliderWidth * (length + settings.slidesToShow * 2)
    } else {
      width = sliderWidth * length
    }

    return {
      width,
      transition
    }
  }

  initialize = () => {
    const sliderStyle = this.getSliderStyle()
    const sliderListStyle = this.getSliderListStyle(sliderStyle)
    const { pageIndex } = this.state
    this.setState({
      sliderStyle,
      sliderListStyle
    }, () => {
      this.animate(pageIndex)
    })
  }

  normalizeSliderIndex = (index) => {
    const { children } = this.props
    let  length = React.Children.count(children)
    const { settings } = this.props
    const { slidesToShow, infinite } = settings
    if(infinite){
      return (index + length + slidesToShow * 2) % (length + slidesToShow * 2)
    }
    return (index + length) % length 
  }

  pre = () => {
    const { pageIndex } = this.state
    const index = pageIndex - 1
    this.jumpTo(index)
  }

  next = () => {
    const { pageIndex } = this.state
    const index = pageIndex + 1
    this.jumpTo(index)
  }

  wait = (time) => {
    return new Promise( resolve => setTimeout(resolve, time) )
  }

  jumpTo = async(index) => {
    let normalizeIndex = 0
    let pageIndex = 0
    const length = React.Children.count(this.props.children)
    const { settings } = this.props
    const { sliderStyle } = this.state
    const { infinite, slidesToShow } = settings
    normalizeIndex = this.normalizeSliderIndex(index)
    if(infinite && normalizeIndex < slidesToShow){
      this.animate(normalizeIndex)
      await this.wait(settings.duration)
      pageIndex = normalizeIndex + length
      this.animate(normalizeIndex + length, false)
    } else if(infinite && normalizeIndex >= length +  slidesToShow) {
      this.animate(normalizeIndex) // 执行动画
      console.time()
      await this.wait(settings.duration)
      console.timeEnd()
      //animate到前面
      pageIndex = normalizeIndex - length
      this.animate(pageIndex, false)
    } else {
      pageIndex = normalizeIndex
      this.animate(pageIndex)
    }
    this.setState({
      pageIndex,
      curSliderIndex: pageIndex - slidesToShow
    })
  }

  // jumpTo = (index) => {
  //   const { settings, children } = this.props
  //   const length = React.Children.count(children)
  //   const { infinite, slidesToShow } = settings

  //   if(infinite && index < 0){

  //   } else if(infinite && index > length - 1) {

  //   } else {
  //     this.animate(index)
  //   }
  // }


  animate = async(index, isAnimate) => {
    if(isAnimate === undefined) isAnimate = true
    const { sliderListStyle } = this.state
    const offset = this.getOffset(index)
    const transform = this.getTransform(offset)
    const transition = this.getTransition()
    if(!!isAnimate){
      this.setState({
        sliderListStyle: {
          ...sliderListStyle,
          transform,
          transition
        }
      })
    } else {
      this.setState({
        sliderListStyle: {
          ...sliderListStyle,
          transform,
          transition: ''
        }
      })
      await this.wait(2000)
      this.setState({
        sliderListStyle: {
          ...this.state.sliderListStyle,
          transition
        }
      })
    }
  }  

  ms2s = (ms) => {
    return ms / 1000
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
    let headSliders = []
    let lastSliders = []
    const { children, settings } = this.props
    const { infinite, slidesToShow } = settings
    const { sliderListStyle, sliderStyle } = this.state
    let length = React.Children.count(children)
    console.log('slidesToShow', slidesToShow)
    // 这个应该根据一次要滚动多少个元素
    React.Children.forEach(children, (child, index) => {
      if(infinite){
        // 6  2  头两个和后两个
        if(index < slidesToShow){
          lastSliders.push(child)
        }
        if(index >= length - slidesToShow){
          headSliders.push(child)
        }
      }
      sliders.push(child)
    })
    sliders = headSliders.concat(sliders, lastSliders)
    console.log('sliders', sliders)
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