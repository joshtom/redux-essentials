import { createSlice } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';

const initialState = [
    { id: '0', name: 'Olajide Joshua' },
    { id: '1', name: 'Ajeigbe John' },
    { id: '2', name: 'Tomiwa johnson' }
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export default usersSlice.reducer