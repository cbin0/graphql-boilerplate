import _ from 'lodash'
import RootStore from './root'
import RouterStore from './route'
import DocStore from './doc'

let stores = {
  root: new RootStore(),
  route: new RouterStore(),
  doc: new DocStore()
}

export default stores

_.map(stores, x => {
  if (x.autorun) x.autorun.call(x)
})

