import React, { useState } from "react";
import { addPostHandler } from "../model/handler";
import styles from "../styles/Home.module.css";

function AddPost() {
  const [postName, setPostName] = useState('');
  const [post, setPost] = useState([]);

  const handleAddPost = () => {
    addPostHandler(postName, setPost, setPostName);
  };

  return (
    <div className={styles.addContainer}>
      <input
        type="text"
        value={postName}
        onChange={(e) => setPostName(e.target.value)}
        placeholder="할 일을 입력해주세요"
        className={styles.addInput}
      />
      <button className={styles.addBtn} onClick={handleAddPost}></button>
    </div>
  );
}

export default AddPost;