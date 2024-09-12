import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { fetchPostHandler } from '../../../model/handler'

//components
import Header from '../../../components/Header'
import TodoDetail from '../../../components/TodoDetail'
const ItemPage: NextPage = () => {
  const [todo, setTodo] = useState([]);
  const router = useRouter()
  const { id } = router.query
  const postData = async () => {
    const data = await fetchPostHandler(id as string); 
    setTodo(data);
  };
  
  useEffect(() => {
    if (id) {
      postData();
    }
  }, [id]);

  const refreshPosts = () => {
    postData();
  };

  return (
    <div>
      <Header />
      <TodoDetail post={todo} onStatusChange={refreshPosts}/>
    </div>
  )
}

export default ItemPage