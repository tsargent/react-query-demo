/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useQuery, queryCache } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import axios from "axios";

const wait = () => new Promise(resolve => setTimeout(resolve, 1000));

function Posts({ setPostId }) {
  const postsQuery = useQuery("posts", async () => {
    await wait();
    return axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(({ data }) => data)
  });
  return (
    <div>
      <h1>Posts{postsQuery.isFetching ? "..." : null}</h1>
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
  const postQuery = useQuery(["post", postId], async () => {
    // simulate a slow network connection
    await wait();
    return axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(({ data }) => data)
  }, {
    initialData: queryCache.getQueryData('posts').find((post) => post.id === postId),
    initialStale: true,
  });
  if (postQuery.isLoading) return "Loading...";
  return (
    <div>
      <a href="#" onClick={() => setPostId(-1)}>
        Back
      </a>
      <h1>{postQuery.data.title}</h1>
      <p>{postQuery.data.body}</p>
      <p>{postQuery.isFetching ? "Updating..." : null}</p>
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
