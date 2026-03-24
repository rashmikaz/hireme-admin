import { createSlice } from '@reduxjs/toolkit'
import { mockCustomers } from '../../utils/mockData'

const initialState = {
  list: mockCustomers,
  filter: 'all', // all | active | banned
  searchQuery: '',
}

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
    },
    banCustomer(state, action) {
      const customer = state.list.find(c => c.id === action.payload)
      if (customer) customer.status = 'banned'
    },
    unbanCustomer(state, action) {
      const customer = state.list.find(c => c.id === action.payload)
      if (customer) customer.status = 'active'
    },
  },
})

export const { setFilter, setSearchQuery, banCustomer, unbanCustomer } = customersSlice.actions

export const selectFilteredCustomers = (state) => {
  const { list, filter, searchQuery } = state.customers
  return list
    .filter(c => filter === 'all' || c.status === filter)
    .filter(c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
}

export default customersSlice.reducer
