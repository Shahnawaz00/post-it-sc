import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deletePostDispatched } from '../posts/deletePostSlice';

// import { deletePostConfirm } from '../posts/postsSlice';
import { useGetPostsQuery, useDeletePostConfirmMutation } from '../api/apiSlice'

const PostsList = () => {

  const dispatch = useDispatch()
  // api data

  // get posts
  const {
    data: posts
  } = useGetPostsQuery()
  // get user posts
  const userId = useSelector(state => state.userId)

  // delete posts
  const [deletePostConfirm, {isLoading, isSuccess}] = useDeletePostConfirmMutation()
  // delete post div
  const deletePost = useSelector(state => state.deletePost)

  // checkbox checked array
  const [checkedArray, setCheckedArray] = useState([]);

  const checkBoxClick = (e) => {
    if (e.target.checked === true) {
      setCheckedArray(prevState => [...prevState, {value:e.target.id}])
    } if (e.target.checked === false) {
      setCheckedArray((prevState) =>
      prevState.filter((id) => id.value !== e.target.id )
      )
    }
  }
  // remove posts dispatch
  let deleteLoader
  const onDeleteConfirm = async () => {
    if (checkedArray.length > 0) {
        try {
          await checkedArray.map(postid => deletePostConfirm({ id: postid.value }))
          console.log(isLoading)
          console.log(isSuccess)
            dispatch (
              deletePostDispatched(false)
            )
            setCheckedArray([])
        } catch (err) {
          console.error('fail', err)
          alert('request failed')
        }

    }  else alert('select a post')

  }
  // delete post class changes

  const closeDeletePost = () => {
    if (deletePost.value !== false ) {
        dispatch (
            deletePostDispatched(false)
        )
    }
  }


  // show data from backend

  let content
  if (userId.value) {

    const userPosts = posts.filter(post => post.userId === userId.value)

    if (userPosts) {
      content = userPosts.map(post => (
        <div className={deletePost.value ? 'eachPost shake' : 'eachPost'} key={post.id}>
          <h3>{post.title}</h3>
          <p> {post.description} </p>
          <div className={deletePost.value? 'showCheckbox' : 'hideCheckbox'} >
            <label className='checkboxLabel'>
              <input className='eachPostCheckbox' type="checkbox" id={post.id} onClick={checkBoxClick}  />
              <span className="newCheckbox"></span>
            </label>
          </div>
        </div>)
      )
    } else content =   <h1>add new post</h1>
} else content =  <h1 className='loginPrompt'>log in or sign up to add posts</h1>

  return (
    <div >
      <div className={deletePost.value ? 'deleteBtnSection' : 'removeDeleteBtnSection '} >
          <button className={deletePost.value?'deleteConfirmBtn': 'removeDeleteConfirmBtn'} onClick={onDeleteConfirm} >
          Delete
          </button>
          <button className={deletePost.value?'deleteCancelBtn': 'removeDeleteCancelBtn'} onClick={closeDeletePost} >
          Cancel
          </button>
      </div>

      <div className='postsSection'>
      {content}
      </div>
      {deleteLoader}
    </div>
  )
}
export default PostsList
