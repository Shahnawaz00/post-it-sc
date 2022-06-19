import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: ''
} ;

const userIdSlice = createSlice({
    name: 'userId',
    initialState,
    reducers: {
        userIdStored(state, action) {
            state.value = action.payload
        }
    }
})

export const {userIdStored} = userIdSlice.actions

export default userIdSlice.reducer
