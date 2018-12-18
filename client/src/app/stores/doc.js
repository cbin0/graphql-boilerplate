import _ from 'lodash'
import { observable, action } from 'mobx'
import BaseStore from './base'

export default class DocStore extends BaseStore {

  @observable id = 1

  @observable content = 'hello world!'

  query (id) {
    return this.http.query(`/docs/${id}`)
  }
}
