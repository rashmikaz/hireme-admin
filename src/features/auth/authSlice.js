import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: true, // Set to true for development; false in production
  admin: {
    name: 'Admin',
    role: 'Super Administrator',
    avatar: 'https://i.pravatar.cc/40?img=33',
  },
  token: 'mock-token-123',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true
      state.admin = action.payload.admin
      state.token = action.payload.token
    },
    logout(state) {
      state.isAuthenticated = false
      state.admin = null
      state.token = null
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
