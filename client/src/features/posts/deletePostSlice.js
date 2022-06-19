import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false
} ;

const deletePostSlice = createSlice({
    name: 'deletePost',
    initialState,
    reducers: {
        deletePostDispatched(state, action) {
            state.value = action.payload
        }
    }
})

export const {deletePostDispatched} = deletePostSlice.actions

export default deletePostSlice.reducer


