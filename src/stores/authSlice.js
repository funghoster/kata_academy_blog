import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchRegistration = createAsyncThunk('auth/fetchRegistration', async function (data, { rejectWithValue }) {
  try {
    const user = {
      user: {
        username: data.username.toLowerCase(),
        email: data.email.toLowerCase(),
        password: data.password,
      },
    }
    const response = await axios.post('https://blog.kata.academy/api/users/', user)
    return response.data
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data)
    }
  }
})
export const fetchLogin = createAsyncThunk('auth/fetchLogin', async function (data, { rejectWithValue }) {
  try {
    const user = {
      user: {
        email: data.email.toLowerCase(),
        password: data.password,
      },
    }
    const response = await axios.post('https://blog.kata.academy/api/users/login', user)
    return response.data
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data)
    }
  }
})
export const fetchGetCurrentUser = createAsyncThunk(
  'auth/fetchGetCurrentUser',
  async function (token, { rejectWithValue, dispatch }) {
    try {
      const response = await axios.get('https://blog.kata.academy/api/user', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      if (response.status === 401) dispatch(logout())
      if (response.status === 200) dispatch(login(response.data))
      else throw Error()
      return response.data
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data)
      }
    }
  }
)

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
  errors: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.errors = null
    },
    login: (state, action) => {
      state.isAuthenticated = true
      state.token = action.payload.user.token
      state.user = action.payload.user
      console.log(action.payload)
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.token = null
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegistration.fulfilled, (state, action) => {
      state.isAuthenticated = true
      state.token = action.payload.user.token
      state.errors = null
      localStorage.setItem('token', action.payload.user.token)
    })
    builder.addCase(fetchRegistration.rejected, (state, action) => {
      state.errors = action.payload.errors
      console.log(state.errors, 'Ошибочка')
    })
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.isAuthenticated = true
      state.token = action.payload.user.token
      state.errors = null
      localStorage.setItem('token', action.payload.user.token)
    })
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.errors = action.payload.errors
      console.log(state.errors, 'Ошибочка')
    })
    builder.addCase(fetchGetCurrentUser.rejected, (state, action) => {
      state.errors = action.payload.errors
      console.log(state.errors, 'Ошибочка')
    })
  },
})

export const { clearError, logout, login } = authSlice.actions

export default authSlice.reducer
