import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false
} ;

const hideLoginButtonsSlice = createSlice({
    name: 'hideLoginButtons',
    initialState,
    reducers: {
        hideLoginButtonsDispatched(state, action) {
            state.value = action.payload
        }
    }
})

export const {hideLoginButtonsDispatched} = hideLoginButtonsSlice.actions

export default hideLoginButtonsSlice.reducer
