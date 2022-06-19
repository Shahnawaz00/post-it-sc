import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false
} ;

const loginClassSlice = createSlice({
    name: 'loginClass',
    initialState,
    reducers: {
        loginClassDispatched(state, action) {
            state.value = action.payload
        }
    }
})

export const {loginClassDispatched} = loginClassSlice.actions

export default loginClassSlice.reducer
