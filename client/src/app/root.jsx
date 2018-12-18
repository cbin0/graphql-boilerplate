import React from 'react'
import { Provider } from 'mobx-react'
import stores from '@stores'
import RouterStore from '@stores/route'
import Home from './components/home'
import {
  Router, Redirect,
  Route, Switch
} from 'react-router-dom'

export default (
  <Provider { ...stores } >
    <Router history={stores.route.history}>
      <Switch>
        <Route exact path='/' component={Home} />
        {/*
        <Route path='/create' component={Query} />
        <Route path='/querys/:id' component={Query} />
        */}
        <Redirect to='/' />
      </Switch>
    </Router>
  </Provider>
)
