import './App.css';
import React from 'react';
import Header from './features/header/Header';
import PostsList from './features/posts/PostsList'
import AddPost from './features/addPage/AddPost';
import Login from './features/loginPage/Login';
import Signup from './features/signupPage/Signup';

function App() {
  return (
    <div className="App">
      <Header/>
      <AddPost />
      <Login />
      <Signup/>
      <PostsList/>
    </div>
  );
}

export default App;
