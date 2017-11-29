import React, { Component } from 'react'
export default (WrapedComponent, defaults) => {
  return class NewComponent extends Component{
    render(){
      const newProps = {
        ...this.props,
        settings: {
          ...defaults,
          ...this.props.settings
        },
      }
      return (
        <WrapedComponent {...newProps}/>
      )
    }
  }
}