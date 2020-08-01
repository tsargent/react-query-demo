import React, { useState } from "react";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import axios from "axios";

function Posts({ setPostId }) {
  // https://jsonplaceholder.typicode.com/posts
  const postsQuery = useQuery("posts", () =>
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(({ data }) => data)
  );
  console.log(postsQuery);
  return (
    <div>
      {postsQuery.isLoading ? (
        "loading..."
      ) : (
        <ul>
          {postsQuery.data.map((post) => (
            <li key={post.id}>
              <button onClick={() => setPostId(post.id)}>{post.title}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Post({ postId, setPostId }) {
  // https://jsonplaceholder.typicode.com/posts/1
  return (
    <div>
      <button onClick={() => setPostId(-1)}>View All</button>HELLO {postId}
    </div>
  );
}

function App() {
  const [postId, setPostId] = useState(-1);
  return (
    <div>
      <div>Post id: {postId}</div>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
      <ReactQueryDevtools />
    </div>
  );
}

export default App;
