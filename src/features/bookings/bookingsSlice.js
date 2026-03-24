import { createSlice } from '@reduxjs/toolkit'
import { mockBookings } from '../../utils/mockData'

const initialState = {
  list: mockBookings,
  filter: 'all', // all | confirmed | pending | completed
  searchQuery: '',
}

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
    },
    cancelBooking(state, action) {
      const booking = state.list.find(b => b.id === action.payload)
      if (booking) booking.status = 'cancelled'
    },
  },
})

export const { setFilter, setSearchQuery, cancelBooking } = bookingsSlice.actions

export const selectFilteredBookings = (state) => {
  const { list, filter, searchQuery } = state.bookings
  return list
    .filter(b => filter === 'all' || b.status === filter)
    .filter(b =>
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.artist.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
}

export default bookingsSlice.reducer
