import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Search from "./components/Search/Search.jsx";
import PostDetail from "./components/PostDetail/PostDetail.jsx";
import SubReddit from "./components/SubReddit/SubReddit.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route
        path="/r/:subreddit/comments/:postId/:postTitle"
        element={<PostDetail />}
      />
      <Route
        path="/r/:subreddit/comments/:postId/comment/:commentId"
        element={<PostDetail />}
      />
      <Route path="/r/:subreddit" element={<SubReddit />} />
      <Route path="/r/:subreddit/search" element={<SubReddit />} />



    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
