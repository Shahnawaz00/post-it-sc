import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: true
} ;

const hideADButtonsSlice = createSlice({
    name: 'hideADButtons',
    initialState,
    reducers: {
        hideADButtonsDispatched(state, action) {
            state.value = action.payload
        }
    }
})

export const {hideADButtonsDispatched} = hideADButtonsSlice.actions

export default hideADButtonsSlice.reducer
