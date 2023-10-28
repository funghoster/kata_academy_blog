import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './components/App'
import stores from './stores/index.js'

import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={stores}>
    <App />
  </Provider>
)
