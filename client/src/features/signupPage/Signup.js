import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { signupClassDispatched } from './signupClassSlice';
import { useAddNewUserMutation, useGetUsersQuery } from '../api/apiSlice';
import { loginClassDispatched } from '../loginPage/loginSlice';


const Signup = () => {

  const dispatch = useDispatch()
  const signupClass = useSelector(state => state.signupClass)

  // close signup page

  const closeSignup = () => {
    if (signupClass.value !== false) {
      dispatch(
        signupClassDispatched(false)
      )
    }
    setEmail('')
    setPassword('')
  }
    // input states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onEmailChange = (e) => setEmail(e.target.value)
  const onPasswordChange = (e) => setPassword(e.target.value)

  // add new user
  const [validInput, setValidInput] = useState(true)
  const [validUser, setValidUser] = useState(true)
  const [addNewUser, { isLoading }] = useAddNewUserMutation()
  const canSave = [email, password].every(Boolean) && !isLoading
  const { data: users } = useGetUsersQuery()

  const onFormSubmit = async (e) => {
    const checkUser = users.find(user => user.email === email)
    if (canSave) {
      if (checkUser) {
        setValidUser(false)
      } else {
        try {
          await addNewUser({  email,  password }).unwrap()
          setEmail('')
          setPassword('')
          setValidInput(true)
          dispatch(
            signupClassDispatched(false)
          )
          dispatch(
            loginClassDispatched(true)
          )
        } catch (err) {
          console.error('fail', err)
        }
       }
      } else setValidInput(false)

  }



  return (
      <div className={signupClass.value ? 'showSignup' : 'hideSignup'} >
           <h2>Sign-up</h2>
        {/* form  */}
        <form >
          <div>
            <label htmlFor="email">Username: *</label>
            <input type="text" name='email'  onChange={onEmailChange} value={email} />
          </div>
          <div>
            <label htmlFor="password">Password: *</label>
            <input type="password" name='password' onChange={onPasswordChange} value={password} />
        </div>
          {!validInput && <p className='invalidPrompt'>Please enter username and password</p>}
          {!validUser && <p className='invalidPrompt'> user already exists</p>}
            <button className='signupSubmitButton' type='button' onClick={onFormSubmit} >
                Sign-up
            </button>
        </form>
        <button className='signupCloseButton' onClick={closeSignup} >
          Close
        </button>

      </div>
  )
}

export default Signup
