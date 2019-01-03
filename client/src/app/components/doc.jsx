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
      <div className="content">
        <div className="columns">
          <div className="column has-text-centered">
            First column
          </div>
          <div className="column has-text-centered">
            Second column
          </div>
          <div className="column is-4 has-text-centered">
            {this.props.doc.id}: {this.props.doc.content}
          </div>
          <div className="column has-text-centered">
            Third column
          </div>
          <div className="column has-text-centered">
            Fourth column
          </div>
        </div>
      </div>
    )
  }

}
