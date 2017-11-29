import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import style from './style.css'
export default class Dots extends Component{
  static PropTypes = {
    slidesCount: PropTypes.number,   //不包含头和尾的数量
    slidesToScroll: PropTypes.number,
    customPaging: PropTypes.func,
    curIndex: PropTypes.index,
    onClick: PropTypes.func
  }

  getDotsCount = () => {
    const { slidesCount, slidesToScroll } = this.props
    return Math.ceil(slidesCount / slidesToScroll)
  }

  renderDots = () => {
    const { curIndex } = this.props
    const count = this.getDotsCount()
    const dots = new Array(count).fill(0).map((x, i) => {
      return React.cloneElement(this.props.customPaging(i, curIndex), {
        onClick: () => this.props.onClick(i)
      }) 
    })
    return dots
  }

  render(){
    const dots = this.renderDots()
    // 如果一用特定的类，用户就没法改变样式了
    return (
      <ul className={'pup-swiper-dots'}>
        { dots }
      </ul>
    )
  }
}