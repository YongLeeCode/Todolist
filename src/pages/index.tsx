import styles from '../styles/Home.module.css'

//components
import AddPost from '../components/AddPost'
import Header from '../components/Header'
import Todo from '../components/Todo'

function Home() {
  return (
    <div className={styles.home} >
      <Header />
      <hr />
      <AddPost />
      <Todo />
    </div>
  )
}

export default Home
