import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { useDispatch } from 'react-redux'

import router from '../../routes/router'
import './App.scss'
import { fetchGetCurrentUser } from '../../stores/authSlice'

function App() {
  const dispatch = useDispatch()
  if (localStorage.getItem('token')) dispatch(fetchGetCurrentUser(localStorage.getItem('token')))
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Inter, sans-serif',
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
