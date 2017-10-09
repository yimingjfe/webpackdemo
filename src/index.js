import { greet } from './greet'
import './style.css'
import { cube } from './util'

console.log('prod', process.env.production)

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
} else {
  console.log('production')
}

var parent = window.document.createElement('span')
parent.classList.add('content')
parent.textContent = greet + cube(7)

// const element = window.document.createElement('h3')
// element.innerHTML = greet
window.document.body.appendChild(parent)