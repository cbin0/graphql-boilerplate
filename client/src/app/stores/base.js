import _ from 'lodash'
import { observable, computed } from 'mobx'
import RootStore, { StoreStatus } from '@stores/root'
import stores from '@stores'
import debug from 'debug'
import axios from 'axios'
// const token = localStorage.getItem('access_token')

const http = axios.create({
  baseURL: '/api_v2/',
  // headers: {'X-Auth-Token': token}
})

export default class BaseStore {
  http = http

  get debug() {
    return debug(`Store::${this.constructor.name}`)
  }

}
