const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

//read all
export async function fetchPostsHandler() {
  try {
    const response = await fetch(`${baseURL}/yong/items`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error("데이터 가져오기 실패");
    }
    const data = await response.json();
    console.log("할 일 목록:", data);
    return data;
  } catch (error) {
    console.error("오류 발생:", error);
    alert("할 일 목록을 불러오는 데 실패했습니다.");
  }
}

// read one
export async function fetchPostHandler(id: string) {
  try {
    const response = await fetch(`${baseURL}/yong/items/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error("데이터 가져오기 실패");
    }

    const data = await response.json();
    console.log("할 일:", data);
    return data; 
    
  } catch (error) {
    console.error("오류 발생:", error);
    alert("할 일 목록을 불러오는 데 실패했습니다.");
  }
}


// patch one
export const handleChange = async (id: string, updatedPost: any) => {
  try {
    const response = await fetch(`${baseURL}/yong/items/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedPost)
    });

    if (!response.ok) {
      throw new Error("업데이트 실패");
    }
    
  } catch (error) {
    console.error("오류 발생:", error);
    alert("상태 업데이트에 실패했습니다.");
  }
};

//new one
export async function addPostHandler(postName: string, setPost: any, setPostName: any) {
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
    setPostName(""); 
    console.log("할 일 추가 성공:", newPost);
    window.location.reload();
  } catch (error) {
    console.error("오류 발생:", error);
    alert("할 일 추가에 실패했습니다.");
  }
}

//delete one
export async function deleteHandler(id: string) {
  try {
    const response = await fetch(`${baseURL}/yong/items/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error("데이터 삭제 실패");
    }

    console.log("할 일 삭제 성공:", id);
    alert('삭제되었습니다.'); 
  } catch (error) {
    console.error("오류 발생:", error);
    alert("할 일 삭제에 실패했습니다.");
  }
}