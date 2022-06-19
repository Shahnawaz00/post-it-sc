import { configureStore } from '@reduxjs/toolkit'
import viewAddPageReducer from '../features/addPage/addPageClassDispatchInitSlice'
import addPageClassReducer from '../features/addPage/addPageClassSlice'
import deletePostReducer from '../features/posts/deletePostSlice'
import loginClassReducer from '../features/loginPage/loginSlice'
import signupClassReducer from '../features/signupPage/signupClassSlice'
import hideADButtonsReducer from '../features/header/hideADButtonsSlice'
import hideLoginButtonsReducer from '../features/header/hideLoginButtonsSlice'
import userIdReducer from '../features/loginPage/userIdSlice'
import { apiSlice } from '../features/api/apiSlice'



export default configureStore({
  reducer: {
    viewAddPage: viewAddPageReducer,
    addPageClass: addPageClassReducer,
    deletePost: deletePostReducer,
    loginClass: loginClassReducer,
    signupClass: signupClassReducer,
    hideADButtons: hideADButtonsReducer,
    hideLoginButtons: hideLoginButtonsReducer,
    userId: userIdReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})
