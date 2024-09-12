import Post from "./Post";
import { useState, useEffect } from "react";
import { fetchPostsHandler } from "../model/handler";

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
    <div>
      <h1>Todo</h1>
      {incompletePosts.length > 0 ? (
        incompletePosts.map((post) => (
          <Post key={post.id} post={post} onStatusChange={refreshPosts} />
        ))
      ) : (
        <p>할 일이 없습니다.</p>
      )}

      <h2>Done</h2>
      {completedPosts.length > 0 ? (
        completedPosts.map((post) => (
          <Post key={post.id} post={post} onStatusChange={refreshPosts} />
        ))
      ) : (
        <p>완료된 일이 없습니다.</p>
      )}
    </div>
  );
}

export default Todo;
