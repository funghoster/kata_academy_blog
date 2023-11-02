import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchRegistration = createAsyncThunk(
  'auth/fetchRegistration',
  async function (data, { rejectWithValue, dispatch }) {
    try {
      const user = {
        user: {
          username: data.username.toLowerCase(),
          email: data.email.toLowerCase(),
          password: data.password,
        },
      }
      const response = await axios.post('https://blog.kata.academy/api/users/', user)
      dispatch(login(response.data))
      return response.data
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data)
      }
    }
  }
)
export const fetchLogin = createAsyncThunk('auth/fetchLogin', async function (data, { rejectWithValue, dispatch }) {
  try {
    const user = {
      user: {
        email: data.email.toLowerCase(),
        password: data.password,
      },
    }
    const response = await axios.post('https://blog.kata.academy/api/users/login', user)
    dispatch(login(response.data))
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
      dispatch(login(response.data))
      return response.data
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data)
      }
    }
  }
)
export const fetchEditProfile = createAsyncThunk(
  'auth/fetchEditProfile',
  async function (user, { rejectWithValue, getState }) {
    const request = {
      user: {
        email: user.email,
        username: user.username,
        bio: null,
        image: user.image || null,
      },
    }
    const config = {
      headers: {
        Authorization: `Token ${getState().auth.token}`,
        'Content-Type': 'application/json',
      },
    }
    try {
      const response = await axios.put('https://blog.kata.academy/api/user', request, config)
      return response.data
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response)
      }
    }
  }
)

export const fetchCreateArticle = createAsyncThunk(
  'auth/fetchCreateArticle',
  async function ({ article, params }, { rejectWithValue, getState }) {
    const request = {
      article,
    }
    const config = {
      headers: {
        Authorization: `Token ${getState().auth.token}`,
        'Content-Type': 'application/json',
      },
    }
    try {
      let response
      if (params.slug)
        response = await axios.put(`https://blog.kata.academy/api/articles/${params.slug}`, request, config)
      else response = await axios.post('https://blog.kata.academy/api/articles', request, config)
      return response.data
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response)
      }
    }
  }
)

export const fetchFavoriteArticle = createAsyncThunk(
  'auth/fetchFavoriteArticle',
  async function ({ slug, setFavorite }, { rejectWithValue, getState }) {
    const request = {}
    const config = {
      headers: {
        Authorization: `Token ${getState().auth.token}`,
        'Content-Type': 'application/json',
      },
    }
    try {
      let response
      if (setFavorite)
        response = await axios.post(`https://blog.kata.academy/api/articles/${slug}/favorite`, request, config)
      else response = await axios.delete(`https://blog.kata.academy/api/articles/${slug}/favorite`, config)
      return response.data
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response)
      }
    }
  }
)
export const fetchDeleteArticle = createAsyncThunk(
  'auth/fetchDeleteArticle',
  async function (slug, { rejectWithValue, getState }) {
    const config = {
      headers: {
        Authorization: `Token ${getState().auth.token}`,
        'Content-Type': 'application/json',
      },
    }
    try {
      const response = await axios.delete(`https://blog.kata.academy/api/articles/${slug}`, config)
      return response.data
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response)
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
      localStorage.removeItem('token')
      state.isAuthenticated = true
      state.token = action.payload.user.token
      state.user = { ...action.payload.user }
      state.errors = null
      localStorage.setItem('token', action.payload.user.token)
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.token = null
      state.user = null
      state.errors = null
      localStorage.removeItem('token')
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
    })
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.errors = action.payload.errors
    })
    builder.addCase(fetchGetCurrentUser.rejected, (state, action) => {
      state.errors = action.payload.errors
    })
    builder.addCase(fetchEditProfile.fulfilled, (state, action) => {
      state.user = action.payload.user
    })
    builder.addCase(fetchEditProfile.rejected, (state, action) => {
      state.errors = action.payload.errors
    })
    builder.addCase(fetchCreateArticle.rejected, (state, action) => {
      state.errors = action.payload.errors
    })
    builder.addCase(fetchDeleteArticle.rejected, (state, action) => {
      state.errors = action.payload.errors
    })
  },
})

export const { clearError, logout, login } = authSlice.actions

export default authSlice.reducer
