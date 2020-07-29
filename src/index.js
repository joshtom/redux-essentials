import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'

import { fetchUsers } from './features/users/usersSlice'

import './api/server'

store.dispatch(fetchUsers()) // We only need to fetch the list of users once, and we want to do it right when the application starts

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
