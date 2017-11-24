import 'normalize.css'
import React from 'react';
import ReactDOM from 'react-dom';
// import { AppContainer } from 'react-hot-loader'
import SimpleSwiper from './SimpleSwiper'

const render = Component => {
  ReactDOM.render(
    // <AppContainer>
      <Component/>
    // </AppContainer>  
   ,
    document.getElementById('root')
  )
}

render(SimpleSwiper)

// if (module.hot) {
//   module.hot.accept('./SimpleSwiper', () => { render(SimpleSwiper) })
// }

