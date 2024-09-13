import React, { useState, useEffect } from 'react';
import { handleChange, addFetchImage, deleteHandler } from '../model/handler';
import { useRouter } from 'next/router';
import styles from '../styles/Detail.module.css';

function TodoDetail(props) {
  const { post, onStatusChange } = props;
  const router = useRouter();

  // 상태 관리
  const [theImage, setTheImage] = useState(post?.imageUrl || '');
  const [isChecked, setIsChecked] = useState(post?.isCompleted || false);
  const [name, setName] = useState(post?.name || '');
  const [memo, setMemo] = useState(post?.memo || ''); 

  // post가 변경될 때 상태 업데이트
  useEffect(() => {
    if (post) {
      setIsChecked(post.isCompleted);
      setName(post.name);
      setMemo(post.memo || '');
      setTheImage(post.imageUrl || '');
    }
  }, [post]);

  // 체크박스 변경 핸들러
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleDelete = async () => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      await deleteHandler(post.id);
      router.push('/');
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const MAX_SIZE = 5 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        alert('파일 크기가 5MB를 초과합니다. 다른 파일을 선택해 주세요.');
        return;
      }
      const regex = /^[a-zA-Z0-9._-]+$/; 
      if (!regex.test(file.name)) {
        alert('파일 이름은 영어와 숫자로만 작성되어야 합니다.');
        return;
      }
      const img = await addFetchImage(file);
      setTheImage(img.url);
      console.log(img.url)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 기본 동작 막기

    const updatedPost = {
      isCompleted: isChecked, // 상태 업데이트
      name: name,
      memo: memo,
      imageUrl: theImage
    };
    if (confirm('정말로 업데이트하시겠습니까?')) {
      await handleChange(post.id, updatedPost); 
      onStatusChange();
      router.push('/');
    }
  }
  return (
    <>
      <form className={styles.detailForm} onSubmit={handleSubmit}>

        <div className={`${styles.nameContainer} ${isChecked ? styles.backgroundPurple : styles.backgroundDefault}`}>
          <label className={styles.statusCheckbox}>
            <input
              id="statusCheckbox"
              className={styles.hiddenCheckbox}
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange} // 체크박스 상태 변경 처리
            />
            <span className={styles.customCheckbox}></span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // 이름 필드 상태 관리
            className={styles.nameInput}
          />
        </div>
        <div className={styles.bodyline}>
          <div className={styles.imgContainer}>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              id="file-input"
              style={{ display: 'none' }}/>
            <label htmlFor="file-input" className={styles.uploadButton}>
              {!theImage
                ? <img src="/plus.png" alt="Upload" className={styles.uploadImage} /> 
                : <img src="/edit.png" alt="Upload" className={styles.uploadImage} />}
              
            </label>
            { !theImage 
              ? <img className={styles.singleimg} src="/img.png" alt="postimg" />
              : <img className={styles.singleimg} src={theImage} alt="postimg" />
            }
              
          </div>
          <div className={styles.memoContainer}>
            <label className={styles.memoLabel} htmlFor="memo">메모</label>
            <textarea
              className={styles.memoInput}
              name="memo"
              value={memo}
              onChange={(e) => setMemo(e.target.value)} // 메모 필드 상태 관리
            />
          </div>
        </div>
        <div className={styles.btnline}>
          <button className={`${styles.btns} ${isChecked ? styles.patchBtn : styles.backgroundDefault}`}type="submit">
            <img src="/check.svg" alt="check" /> 수정 완료
          </button>
          <button className={`${styles.btns} ${styles.delBtn}`} type="button" onClick={handleDelete}>
            <img src="/x.svg" alt="x" /> 삭제하기
            </button>
        </div>
      </form>
    </>
  );
}

export default TodoDetail;
