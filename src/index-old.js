import _ from 'lodash';
import printMe from './print.js';
import { greet } from './greet'
import './style.css'
import { cube } from './util'

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
} else {
  console.log('production')
}

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

// function getComponent(){
//   return import(/* webpackChunkName: "lodash" */ 'lodash').then(_=>{
//     var element = document.createElement('div');
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//     return element;
//   }).catch(error => 'An error occurred while loading the component')
// }

// getComponent().then(component => {
//   document.body.appendChild(component)
// })

var element = component()
document.body.appendChild(element)

if(module.hot){
  module.hot.accept('./print.js', function(){
    console.log('Accepting the updated printMe module!')
    document.body.removeChild(element)
    element = component()
    document.body.appendChild(element)
  })
}