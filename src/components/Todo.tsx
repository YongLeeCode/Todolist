import Post from "./Post";

function Todo () {
  return (
    <div>
      <h1>Todo</h1>
      <Post selected={false} />
    </div>
  )
}

export default Todo;