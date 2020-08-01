import React, { useState } from "react";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import axios from "axios";

function Posts() {
  // https://jsonplaceholder.typicode.com/posts
  const postsQuery = useQuery("posts", () =>
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(({ data }) => data)
  );
  console.log(postsQuery);
  return (
    <div>
      {postsQuery.isLoading
        ? "loading..."
        : postsQuery.data.map((post) => <div key={post.id}>{post.title}</div>)}
    </div>
  );
}

function Post() {
  // https://jsonplaceholder.typicode.com/posts/1
}

function App() {
  const [postId, setPostId] = useState(-1);
  return (
    <div>
      <button onClick={() => setPostId(postId - 1)}>Prev Post</button>
      <button onClick={() => setPostId(postId + 1)}>Next Post</button>
      <Posts />
      <ReactQueryDevtools />
    </div>
  );
}

export default App;
