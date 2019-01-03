import React from 'react'
import BaseComponent from './base'
import { inject, observer } from 'mobx-react'

export default class Foot extends BaseComponent {

  render() {
    return (
      <footer className="footer">
        <div className="">
          <ul>
            <li>process.env.NODE_ENV: {process.env.NODE_ENV}</li>
            <li>version: {__VERSION__}</li>
          </ul>
        </div>
      </footer>
    )
  }

}
