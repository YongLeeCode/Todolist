// components/Post.tsx
import { useState } from "react";
import Link from 'next/link'
import { handleChange } from '../model/handler';
import styles from "../styles/Home.module.css"

interface PostProps {
  post: {
    id: string
    name: string
    isCompleted: boolean
  }
  onStatusChange: () => void
}

const Post: React.FC<PostProps> = (props) => {
  const [isChecked, setIsChecked] = useState(props.post.isCompleted);

  const checkStatus = async () => {
    const updatedPost = {
      isCompleted: !isChecked, 
    };
    setIsChecked(!isChecked);
    await handleChange(props.post.id, updatedPost);
    props.onStatusChange();
  };

  return (
    <>
      <label className={styles.statusCheckbox}>
        <input
          id="statusCheckbox"
          type="checkbox"
          checked={isChecked}
          onChange={checkStatus}
          className={styles.hiddenCheckbox}
        />
        <span className={styles.customCheckbox}></span>
      </label>
      {props.post.isCompleted 
      ? <Link className={`${styles.postName} ${styles.doneName}`} href={`/items/${props.post.id}`}>
          {props.post.name}
        </Link>
      : <Link className={styles.postName} href={`/items/${props.post.id}`}>
          {props.post.name}
        </Link>
      }
      
    </>
  );
}

export default Post;
