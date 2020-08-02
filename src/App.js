/* eslint-disable jsx-a11y/anchor-is-valid */
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
  return (
    <div>
      {postsQuery.isLoading ? (
        "loading..."
      ) : (
        <ul>
          {postsQuery.data.map((post) => (
            <li key={post.id}>
              <a href="#" onClick={() => setPostId(post.id)}>
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Post({ postId, setPostId }) {
  const postQuery = useQuery(["post", postId], () =>
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(({ data }) => data)
  );
  if (postQuery.isLoading) return "Loading...";
  return (
    <div>
      <a href="#" onClick={() => setPostId(-1)}>
        Back
      </a>
      <h1>{postQuery.data.title}</h1>
      <p>{postQuery.data.body}</p>
    </div>
  );
}

function App() {
  const [postId, setPostId] = useState(-1);
  return (
    <div>
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
