import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {GrAdd} from 'react-icons/gr'
import {AiFillDelete} from 'react-icons/ai'
import {addPageClassChanged} from '../addPage/addPageClassSlice';
import { addPageClassDispatched } from '../addPage/addPageClassDispatchInitSlice';
import { deletePostDispatched } from '../posts/deletePostSlice';
import { loginClassDispatched } from '../loginPage/loginSlice';
import { signupClassDispatched } from '../signupPage/signupClassSlice';
import { hideADButtonsDispatched } from './hideADButtonsSlice';
import { hideLoginButtonsDispatched } from './hideLoginButtonsSlice';
import { userIdStored } from '../loginPage/userIdSlice';

const Header = () => {

const dispatch = useDispatch();

  //   add page dispatch
  const addPageClass = useSelector(state => state.addPageClass);
  const openAddPage = () => {
    if (addPageClass.value !== 'openAddPage') {
        dispatch(
            addPageClassDispatched({
                value: true
            })
        )
        dispatch(
            addPageClassChanged({
                value: 'openAddPage'
            })
        )
    }
  }
   //   delete page dispatch
   const deletePost = useSelector(state => state.deletePost)
   const openDeletePost = () => {
    if (deletePost.value !== true ) {
        dispatch (
            deletePostDispatched(true)
        )
    }
   }
    // add and delete buttons div state
    const hideADButtons = useSelector(state => state.hideADButtons)

    // user bttons div state
    const hideLoginButtons = useSelector(state => state.hideLoginButtons)

    // login page dispatch
    const loginClass = useSelector(state => state.loginClass)
    const openLoginPage = () => {
        if (loginClass.value !== true) {
            dispatch(
                loginClassDispatched(true)
            )
            dispatch(
                signupClassDispatched(false)
            )
        }
    }

    // signup page dispatch
    const signupClass = useSelector(state => state.signupClass)
    const openSignupPage = () => {
        if (signupClass.value !== true) {
            dispatch(
                signupClassDispatched(true)
            )
            dispatch(
                loginClassDispatched(false)
            )

        }
    }
    // logout dispatch
    const onLogout = () => {
        dispatch(
            hideADButtonsDispatched(true)
          )
        dispatch(
            hideLoginButtonsDispatched(false)
        )
        dispatch(
            userIdStored('')
        )
    }



  return (
    <div className='headerMain' >
            <header>
                <h1 className='headerTitle' >
                    POST-IT
                </h1>
            </header>
          {/* buttons */}
             {/* mobile logout */}
            <button className={hideADButtons.value ? 'hideADButtons' : 'mLogoutButton'} onClick={onLogout}  >
                      Logout
            </button>
            <div className='headerButtons' >
              {/* add and delete post  */}
              <div className={hideADButtons.value ? 'hideADButtons' : 'showADButtons'} >
                 <button className='addButton' onClick={openAddPage} >
                   <GrAdd size={24} className='addIcon'/>
                 </button>
                 <button className='deleteButton' onClick={openDeletePost}>
                   <AiFillDelete size={24} />
                  </button>
              </div>
              {/* desktop logout  */}
              <button className={hideADButtons.value ? 'hideADButtons' : 'dLogoutButton'} onClick={onLogout}  >
                  Logout
               </button>
              {/* login  */}
              <div className={hideLoginButtons.value? 'hideLoginButtons': 'showLoginButtons'} >
                <button className='loginButton' onClick={openLoginPage} >
                    Login
                </button>
                <button className='signupButton' onClick={openSignupPage} >
                    Signup
                </button>
              </div>

            </div>

    </div>
  )
}

export default Header
