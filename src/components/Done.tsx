import Post from "./Post";

function Done() {
  return (
    <div>
      <h1>Done</h1>
      <Post selected={true} />
    </div>
  )
}

export default Done;