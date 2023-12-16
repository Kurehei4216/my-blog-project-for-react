import "./App.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import PostCreate from "./pages/PostCreate";
import AdminTop from "./pages/AdminTop";
import AdminLayout from "./pages/Admin/Layout";
import AdminPostList from "./pages/Admin/PostList";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
          <Route path="/post/create" element={<PostCreate />} />
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
