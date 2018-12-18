import React from 'react'
import BaseComponent from './base'
import Header from './header'
import { RouterStore } from '@app/stores/route'
import Doc from './doc'
import { observer } from 'mobx-react'

export default class Home extends BaseComponent {

  render() {
    return (
      <div className='layout'>
        <Header />
        <Doc />
      </div>
    )
  }

}
