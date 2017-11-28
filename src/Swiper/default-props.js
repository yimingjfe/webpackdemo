import cn from 'classnames'
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
    const className = cn({
      'dot-active': i === curIndex,
      'dot': true
    })
    return (
      <button className={className}></button>
    )
  }
}

export default defaultProps