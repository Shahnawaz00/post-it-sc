import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { loginClassDispatched } from './loginSlice';
import { useGetUsersQuery } from '../api/apiSlice'
import { hideADButtonsDispatched } from '../header/hideADButtonsSlice';
import { hideLoginButtonsDispatched } from '../header/hideLoginButtonsSlice';
import { userIdStored } from './userIdSlice';


const Login = () => {

  const dispatch = useDispatch()
  const loginClass = useSelector(state => state.loginClass)

  // close login page

  const closeLogin = () => {
    if (loginClass.value !== false) {
      dispatch(
        loginClassDispatched(false)
      )
    }
  }

  // input states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onEmailChange = (e) => setEmail(e.target.value)
  const onPasswordChange = (e) => setPassword(e.target.value)

  // check user data
  const {
    data: users,
    isLoading
  } = useGetUsersQuery()
  const canLogin = [email, password].every(Boolean) && !isLoading


  // on login button click
  const [validInput, setValidInput] = useState(true)
  const [validCred, setValidCred] = useState(true)
  const onLogin = () => {

    if (canLogin) {          //  check if inputs are empty
      const userData = users.find(user => user.email === email);        // check if email exists
      if (userData) {
        if (userData.password === password) {            //check if password matches email
          // on success
          dispatch(         // store user id
            userIdStored(userData.id)
          );
          dispatch(            // show add delete post buttons
            hideADButtonsDispatched(false)
          );
          dispatch(        // hide login buttons
            hideLoginButtonsDispatched(true)
          );
          dispatch(         // show logout button
            loginClassDispatched(false)
          );
          setEmail('');
          setPassword('');
          setValidInput(true);
          setValidCred(true)
        } else setValidCred(false); setValidInput(true)
      } else setValidCred(false)
    } else setValidInput(false)
    }




  return (
      <div className={loginClass.value ? 'showLogin' : 'hideLogin'} >
           <h2>Login</h2>
        {/* form  */}
        <form >
          <div>
            <label htmlFor="email">Username: *</label>
            <input required type="text" name='email' onChange={onEmailChange} value={email} />
          </div>
          <div>
            <label htmlFor="password">Password: *</label>
            <input required type="password" name='password' onChange={onPasswordChange} value={password} />
        </div>
            {!validCred && <p className='invalidPrompts' >Incorrect request</p>}
            {!validInput && <p className='invalidPrompts'>Please enter username and password</p>}
            <button className='loginSubmitButton' type='button' onClick={onLogin} >
                Login
            </button>
        </form>
        <button className='loginCloseButton' onClick={closeLogin} >
          Close
        </button>

      </div>
  )
}

export default Login
