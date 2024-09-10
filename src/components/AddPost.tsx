import React, {useState} from "react";

function AddPost() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [postName, setPostName] = useState('');
  const [post, setPost] = useState([]);

  async function addPostHandler() {
    if (postName.trim() === "") {
      alert("할 일을 입력해주세요!");
      return;
    }

    try {
      const response = await fetch(`${baseURL}/yong/items`, {
        method: "POST",
        body: JSON.stringify({ name: postName }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error("데이터 전송 실패");
      }

      const newPost = await response.json();
      setPost((prevPosts) => [...prevPosts, newPost]);
      setPostName(""); // 입력 필드 초기화
      console.log("할 일 추가 성공:", newPost);
    } catch (error) {
      console.error("오류 발생:", error);
      alert("할 일 추가에 실패했습니다.");
    }
  }

  return (
    <div>
      <input
        type="text"
        value={postName}
        onChange={(e) => setPostName(e.target.value)}
        placeholder="할 일을 입력해주세요"
      />
      <button onClick={addPostHandler}>+추가하기</button>
    </div>
  );
}

export default AddPost;
