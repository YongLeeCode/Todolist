import React, { useState } from 'react'
import './App.css'

//components
import AddPost from './components/AddPost'
import Header from './components/Header'
import Done from './components/Done'
import Todo from './components/Todo'

function App() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  return (
    <>
      <Header />
      <AddPost />
      <Todo />
      <Done />
    </>
  )
}

export default App
