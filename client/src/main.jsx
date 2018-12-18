import React from 'react'
import ReactDOM from 'react-dom'
import Promise from 'bluebird'
import { Component } from 'react'
import { AppContainer } from 'react-hot-loader'
import Root from './app/root'
import '@styles/bulma.scss'
import '@styles/structure.less'
import '@styles/app.less'

let render = () => {
  return ReactDOM.render(
    <AppContainer>{Root}</AppContainer>,
    document.getElementById('root')
  )
}

render()

if (module.hot) {
  module.hot.accept('./app/root', () => render())
}

Promise.config({
  cancellation: true
})
