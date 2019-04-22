import './bootstrap'
import React from 'react'
import { hydrate, render } from 'react-dom'
import './styles/baseline.css'
import './styles/animate.css'
import Routes from './Routes'

const rootElement = document.getElementById('root')
if (rootElement.hasChildNodes()) {
  hydrate(<Routes />, rootElement)
} else {
  render(<Routes />, rootElement)
}