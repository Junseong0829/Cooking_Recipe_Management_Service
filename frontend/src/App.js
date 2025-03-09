/*eslint-disable*/
import React from "react";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import Category from "./pages/Category";
import Calculator from "./pages/Calculator";
import {Route, Routes, Link} from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1><b>🍽️Cooking Recipe Management Service🍽️</b></h1>
        <nav class="head"> 
        <Link to={`/`}>
          <li>Home</li>
        </Link>
        <Link to={`category`}>
          <li>Category</li>
        </Link>
        <Link to={`calculator`}>
          <li>Calculator</li>
        </Link>
        </nav>
      </header> 
      <main class="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:index" element={<RecipeDetail />} />
          <Route path="/category" element={<Category />} />
          <Route path="/calculator" element={<Calculator />} />
        </Routes>
      </main>
      <footer>
        <div class="footer">
          <p>SNS : 🐣@wnsxxd_</p>
          <p>TEL : ☎️010-4235-2512</p>
          <p>Made by 🏫GIST 21 이준성</p>
          <p>Reference : 🌺식품의약품안전처</p>
        </div>
      </footer>
    </div>
  );
}
export default App;