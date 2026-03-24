import { createSlice } from '@reduxjs/toolkit'
import { mockArtists } from '../../utils/mockData'

const initialState = {
  list: mockArtists,
  filter: 'all', // all | verified | pending | suspended
  searchQuery: '',
  loading: false,
  error: null,
}

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
    },
    approveArtist(state, action) {
      const artist = state.list.find(a => a.id === action.payload)
      if (artist) artist.status = 'verified'
    },
    rejectArtist(state, action) {
      const artist = state.list.find(a => a.id === action.payload)
      if (artist) artist.status = 'suspended'
    },
    suspendArtist(state, action) {
      const artist = state.list.find(a => a.id === action.payload)
      if (artist) artist.status = 'suspended'
    },
    unsuspendArtist(state, action) {
      const artist = state.list.find(a => a.id === action.payload)
      if (artist) artist.status = 'verified'
    },
  },
})

export const { setFilter, setSearchQuery, approveArtist, rejectArtist, suspendArtist, unsuspendArtist } = artistsSlice.actions

// Selectors
export const selectFilteredArtists = (state) => {
  const { list, filter, searchQuery } = state.artists
  return list
    .filter(a => filter === 'all' || a.status === filter)
    .filter(a =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
}

export default artistsSlice.reducer
