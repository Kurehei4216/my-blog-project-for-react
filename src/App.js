import "./App.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import PostCreate from "./pages/PostCreate";
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
