import React from 'react'
import BaseComponent from './base'
import { inject, observer } from 'mobx-react'

@inject('doc')
@observer
export default class Home extends BaseComponent {

  async onRouteChange() {
    this.debug('route change, getting data')
    if (this.props.doc.id) {
      this.props.doc.content = await this.props.doc.query(this.props.doc.id)
    } else this.props.doc.content = ''
  }

  render() {
    return (
      <div>
        {this.props.doc.docId}
        <div>{this.props.doc.content}</div>
      </div>
    )
  }

}
