import Post from "./Post";
import { useState, useEffect } from "react";
import { fetchPostsHandler } from "../model/handler";
import styles from "../styles/Home.module.css"

function Todo () {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPostsHandler();
      if (data) {
        setPosts(data);
      }
    };
    loadPosts();
  }, []);

  const refreshPosts = async () => {
    const data = await fetchPostsHandler();
    if (data) {
      setPosts(data);
    }
  };

  const incompletePosts = posts.filter((post) => post.isCompleted === false);
  const completedPosts = posts.filter((post) => post.isCompleted === true);

  return (
    <div className={styles.postsContainer}>
      <div className={styles.thePosts}>
        <h3 className={styles.statusTodo}>To do</h3>
        {incompletePosts.length > 0 ? (
          incompletePosts.map((post) => (
            <div className={styles.posts}>
              <Post key={post.id} post={post} onStatusChange={refreshPosts} />
            </div>
          ))
        ) : (
          <div className={styles.noPost}>
            <img src="/todol.png" alt="todoimg" />
            <p className={styles.ptxt}>할 일이 없어요. <br /> TODO를 새롭게 추가해주세요!</p>
          </div>
        )}
      </div>
      
      <div className={styles.thePosts}>
      <h3 className={styles.statusDone}>Done</h3>
        {completedPosts.length > 0 ? (
          completedPosts.map((post) => (
            <div className={`${styles.posts} ${styles.donePost}`}>
              <Post key={post.id} post={post} onStatusChange={refreshPosts} />
            </div>
          ))
        ) : (
          <div className={styles.noPost}>
            <img src="/donel.png" alt="doneimg" />
            <p className={styles.ptxt}>아직 다 한 일이 없어요. <br /> 해야 할 일을 체크해보세요!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Todo;
