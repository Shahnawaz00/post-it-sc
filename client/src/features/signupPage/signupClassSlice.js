import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false
} ;

const signupClassSlice = createSlice({
    name: 'signupClass',
    initialState,
    reducers: {
        signupClassDispatched(state, action) {
            state.value = action.payload
        }
    }
})

export const {signupClassDispatched} = signupClassSlice.actions

export default signupClassSlice.reducer
