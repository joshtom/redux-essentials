// Create a new slice for our notifications, and an async thunk to fetch some notification entries from the API:
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client' // The api endpoint

export const fetchNotifications = createAsyncThunk(
    `notifications/fetchNotifications`,
    async(_, { getState }) => {
        const allNotifications = selectAllNotifications(getState())
        const [latestNotification] = allNotifications
        const latestTimestamp = latestNotification ? latestNotification.date : ""
        const response = await client.get(
            `/fakeApi/notifications?since=${latestTimestamp}`
          )
        return response.notifications
    }
)

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers: {},
    extraReducers: {
        [fetchNotifications.fulfilled] : (state, action) => {
            state.push(...action.payload)
            // sort with the newest date first
            state.sort((a, b) => b.date.localeCompare(a.date))
        }
    }
})

export default notificationsSlice.reducer

export const selectAllNotifications = state => state.notifications


