import React from "react";
import Header from "./Components/Shared/Header";
import Footer from "./Components/Shared/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home/Home"; 
import PostDetails from "./Components/Pages/Posts/PostDetails";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" component={PostDetails} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
