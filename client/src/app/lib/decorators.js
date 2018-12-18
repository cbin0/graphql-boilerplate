import 'reflect-metadata'
import * as _ from 'lodash'
import { action } from 'mobx'
import RootStore from '@stores/root'
import stores from '@stores'
import RouterStore from '@stores/route'
import { t } from '@lib/i18n'
let setterDebounceVals = {}

/**
 * request装饰器
 * 使用这个装饰器装饰的方法代表是个异步方法
 * store的状态会被保存到RootStore中
 * 通过继承stores/base就可以读取fetching属性拿到状态
 * 注意：被装饰方法需要返回一个Promise
 */
export function request() {
  return (target, propertyKey, descriptor) => {
    target.debug('decorator request init')
    let method = descriptor.value
    let name = target.constructor.name
    let returnType = Reflect.getMetadata('design:returntype', target, propertyKey)
    if (!(returnType && returnType.name === 'Promise')) {
      throw new Error('decorator request target returnType is not Promise!')
    }
    descriptor.value = function() {
      target.debug(`decorator request for '${propertyKey}()' called`)
      let rootStore = stores.root
      let promise = method.apply(this, arguments)
      target.debug(`decorator request for '${propertyKey}()' get promise:`, promise)
      rootStore.startFetching(name)
      return promise.then((res) => {
        target.debug(`decorator request for '${propertyKey}()' promise done`, res)
        rootStore.stopFetching(name)
      }).catch((e) => {
        // Notification('error', t('警告'), t('网络请求好像出错了～'))
        target.debug(`request for '${propertyKey}()' promise error:`, e)
        rootStore.stopFetching(name)
      })
    }
  }
}

/**
 * routeParam装饰器
 * 使用这个装饰器装饰的属性代表是个需要在route体现的param
 * 直接读取目标属性就能得到当前路由的param
 * 直接修改目标属性就会触发route修改
 * 注意：这个装饰器不能和 @observable 一起使用
 * @param def 默认值
 */
export function routeParam(def) {
  return function(target, propertyKey) {
    target.debug(`decorator routeParam for ${propertyKey} init`)
    let descriptor = arguments[2]
    let setter = _.debounce(() => {
      stores.route.goto({
        search: setterDebounceVals,
        replace: false
      })
      setterDebounceVals = {}
    }, 10, { maxWait: 500 })
    if (descriptor && (descriptor.get || descriptor.set)) {
      throw new Error('decorator routeParam can not used at getter or setter')
    }
    return {
      get() {
        let value = stores.route.getSearch(propertyKey, def)
        if (typeof def === 'number') {
          return parseInt(value, 10)
        } else return value
      },
      set(value) {
        setterDebounceVals[propertyKey] = value
        setter()
      }
    }
  }
}
