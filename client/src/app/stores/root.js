import _ from 'lodash'
import { observable, action } from 'mobx'
import BaseStore from './base'
import { ReactInstance } from 'react'

/**
 * 这个store是用来保存所有其他store的状态的
 */
export default class RootStore extends BaseStore {

  @observable focusElement = document.body

  /**
   * 目前只有一个可观察的状态
   */
  @observable storeStatus = new Map()

  constructor() {
    super()
    document.body.addEventListener('click', (e) => {
      this.focusElement = e.target
    })
  }

  getStore(storeName) {
    if (!this.storeStatus.has(storeName)) {
      this.storeStatus.set(storeName, {
        fetching: false
      })
    }
    return this.storeStatus.get(storeName)
  }

  isMouseIn(el, focusElement = this.focusElement) {
    if (el === focusElement) return true
    return !!focusElement.parentElement ?
      this.isMouseIn(el, focusElement.parentElement) :
      false
  }

  startFetching(storeName) {
    this.getStore(storeName).fetching = true
  }

  stopFetching(storeName) {
    this.getStore(storeName).fetching = false
  }

  isFocus(selector) {
    return this.isMouseIn(document.querySelector(selector))
  }

}
