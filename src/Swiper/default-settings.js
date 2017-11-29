import cn from 'classnames'
import React from 'react'
const defaultProps = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  easing: 'ease',
  duration: '2s',
  isShowDots: true,
  // dotsClass: ''
  slidesToScroll: 1,
  customPaging: function(i, curIndex){
    console.log('i === curIndex', i, curIndex, i === curIndex)
    const className = cn({
      'dot-active': i === curIndex,
      'dot': true
    })
    return (
      <li key={i} className={className}></li>
    )
  }
}

export default defaultProps