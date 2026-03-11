import { Routes, Route } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import Home from "../pages/Home";
import PostPage from "../pages/PostPage";
import TagPage from "../pages/TagPage";

export default function AppRouter() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/tag/:tag" element={<TagPage />} />
      </Routes>

      <Footer />
    </>
  );
}
