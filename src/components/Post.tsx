// components/Post.tsx
import { useState } from "react";
import Link from 'next/link'
import { handleChange } from '../model/handler';

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
      <input
        type="checkbox"
        checked={isChecked}
        onChange={checkStatus}
      />
      <Link href={`/items/${props.post.id}`}>
        {props.post.name}
      </Link>
    </>
  );
}

export default Post;
