import PropTypes from 'prop-types'
export default class Dots{
  static PropTypes = {
    slidesCount: PropTypes.number,
    slidesToScroll: PropTypes.number,
    customPaging: PropTypes.func,
    curIndex: PropTypes.index
  }

  getDotsCount = () => {
    const { slidesCount, slidesToScroll } = this.props
    return Math.ceil(slidesCount / slidesToScroll)
  }

  renderDots = () => {
    const count = this.getDotsCount()
    const dots = Array.fill(0, 0, count).map((x, i) => {
      return (
        <li className={dot}></li>
      )
    })
  }

  render(){
    return (
      <ul>

      </ul>
    )
  }
}