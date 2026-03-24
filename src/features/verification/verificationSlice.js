import { createSlice } from '@reduxjs/toolkit'
import { mockVerifications } from '../../utils/mockData'

const initialState = {
  list: mockVerifications,
  filter: 'all', // all | today | resubmitted
  expandedId: 1, // First card expanded by default
}

const verificationSlice = createSlice({
  name: 'verification',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload
    },
    toggleExpand(state, action) {
      state.expandedId = state.expandedId === action.payload ? null : action.payload
    },
    approveApplication(state, action) {
      state.list = state.list.filter(v => v.id !== action.payload)
    },
    rejectApplication(state, action) {
      state.list = state.list.filter(v => v.id !== action.payload)
    },
  },
})

export const { setFilter, toggleExpand, approveApplication, rejectApplication } = verificationSlice.actions

export const selectFilteredVerifications = (state) => {
  const { list, filter } = state.verification
  if (filter === 'today') return list.filter(v => v.isToday)
  if (filter === 'resubmitted') return list.filter(v => v.isResubmitted)
  return list
}

export default verificationSlice.reducer
