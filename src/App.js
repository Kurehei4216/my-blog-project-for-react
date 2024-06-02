import "./App.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import PostCreate from "./pages/Admin/PostCreate";
import AdminPostDetail from "./pages/Admin/PostDetail";
import AdminLayout from "./pages/Admin/Layout";
import AdminPostList from "./pages/Admin/PostList";
import AdminPostEdit from "./pages/Admin/PostEdit";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PostDetail } from "./pages/PostDetail";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/post/:postId"
            element={
              <Layout>
                <PostDetail />
              </Layout>
            }
          />
          <Route
            path="/admin/post/create"
            element={
              <AdminLayout>
                <PostCreate />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/post/:postId"
            element={
              <AdminLayout>
                <AdminPostDetail />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/post/:postId/edit"
            element={
              <AdminLayout>
                <AdminPostEdit />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/posts"
            element={
              <AdminLayout>
                <AdminPostList />
              </AdminLayout>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
