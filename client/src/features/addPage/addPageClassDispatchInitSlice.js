import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false
} ;

const viewAddPageSlice = createSlice({
    name: 'viewAddPage',
    initialState,
    reducers: {
        addPageClassDispatched(state, action) {
            state.value = action.payload
        }
    }
})

export const {addPageClassDispatched} = viewAddPageSlice.actions

export default viewAddPageSlice.reducer


