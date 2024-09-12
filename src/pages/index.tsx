import React, { useState } from 'react'
import styles from '../styles/home.module.css'

//components
import AddPost from '../components/AddPost'
import Header from '../components/Header'
import Todo from '../components/Todo'

function Home() {
  return (
    <div className={styles.home} >
      <Header />
      <AddPost />
      <Todo />
    </div>
  )
}

export default Home
