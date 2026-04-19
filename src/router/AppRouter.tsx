import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import Home from "../pages/Home";
import PostPage from "../pages/PostPage";
import TagPage from "../pages/TagPage";

const AppRouter: React.FC = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:slug" element={<PostPage />} />
        <Route path="/tag/:tag" element={<TagPage />} />
      </Routes>

      <Footer />
    </>
  );
};

export default AppRouter;