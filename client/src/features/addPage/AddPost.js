import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { nanoid } from '@reduxjs/toolkit';
import {addPageClassChanged} from './addPageClassSlice';
// import { addNewPost } from '../posts/postsSlice';
import { useAddNewPostMutation } from '../api/apiSlice'

const AddPost = () => {

  // close add page dispatch on close button

  const viewAddPage = useSelector(state => state.viewAddPage);
  const addPageClass = useSelector(state => state.addPageClass.value);


  const dispatch = useDispatch()

  const closeAddPage = () => {
    if (addPageClass.value !== 'closeAddPage') {
      dispatch(
        addPageClassChanged({
            value: 'closeAddPage'
        })
    )
    }
  }
    // close add page dispatch on esc button
  useEffect(() => {
    const handleEsc = (event) => {
       if (event.keyCode === 27) {
        if (addPageClass.value !== 'closeAddPage') {
          dispatch(
            addPageClassChanged({
                value: 'closeAddPage'
            })
          )

        }

      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // form input states
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const onTitleChange = (e) => setTitle(e.target.value)
  const onDescriptionChange = (e) => setDescription(e.target.value)

  // add new post dispatch
  const userId = useSelector(state => state.userId)
  const [addNewPost, { isLoading }] = useAddNewPostMutation()
  const canSave = [title, description].every(Boolean) && !isLoading

  const onFormSubmit = async (e) => {
    if (canSave) {
      try {
        await addNewPost({ title, description, userId: userId.value }).unwrap()
        setTitle('')
        setDescription('')

      } catch (err) {
        console.error('fail', err)
      }
    }
  }

  return (
    <div className={viewAddPage.value? addPageClass.value : 'closeAddPageInit'} >
      <div className='addPageHeader' >
        <h3 className='addPageTitle' >Add Post</h3>
      </div>
      <form className='addForm'  >
        <label htmlFor="postTitle">Post:</label>
        <input className='addFormInputs' type="text" name='postTitle'
         placeholder='Go Hiking' onChange={onTitleChange} value={title} />
        <label htmlFor="postDescription">Description:</label>
        <textarea className='addFormInputs' name="postDescription" id="postDescription"
        cols="30" rows="10" onChange={onDescriptionChange} value={description}></textarea>
        <button onClick={onFormSubmit} className='addFormBtn' type='button' >Add Post</button>
      </form>
      <button className='addPageCloseBtn' onClick={closeAddPage} > Close </button>
    </div>
  )
}

export default AddPost
