import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 'closeAddPage'
} ;

const addPageClassSlice = createSlice({
    name: 'addPageClass',
    initialState,
    reducers: {
        addPageClassChanged(state, action) {
            state.value = action.payload
          }
    }
})

export const {addPageClassChanged} = addPageClassSlice.actions

export default addPageClassSlice.reducer


