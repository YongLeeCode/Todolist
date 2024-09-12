import React, { useState, useEffect } from 'react';
import { handleChange, deleteHandler } from '../model/handler';
import { useRouter } from 'next/router';

function TodoDetail(props) {
  const { post, onStatusChange } = props;
  const router = useRouter();
  // 상태 관리
  const [isChecked, setIsChecked] = useState(post?.isCompleted || false);
  const [name, setName] = useState(post?.name || '');
  const [memo, setMemo] = useState(post?.memo || ''); // 메모 필드가 없을 경우 빈 문자열

  // post가 변경될 때 상태 업데이트
  useEffect(() => {
    if (post) {
      setIsChecked(post.isCompleted);
      setName(post.name);
      setMemo(post.memo || '');
    }
  }, [post]);

  // 체크박스 변경 핸들러
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 기본 동작 막기

    const updatedPost = {
      isCompleted: isChecked, // 상태 업데이트
      name: name,
      memo: memo,
      imageUrl: ''
    };
    if (confirm('정말로 업데이트하시겠습니까?')) {
      await handleChange(post.id, updatedPost); 
      onStatusChange();
      router.push('/');
    }
  }

  const handleDelete = async () => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      await deleteHandler(post.id);
      router.push('/');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange} // 체크박스 상태 변경 처리
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} // 이름 필드 상태 관리
        />
        <div className='memoContainer'>
          <label htmlFor="memo">메모</label>
          <textarea
            name="memo"
            cols="30"
            rows="10"
            value={memo}
            onChange={(e) => setMemo(e.target.value)} // 메모 필드 상태 관리
          />
        </div>
        
        <button type="submit">업로드</button>
        <button type="button" onClick={handleDelete}>삭제</button>
      </form>
    </>
  );
}

export default TodoDetail;
