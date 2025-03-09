import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  return (
    <>
      <h2>😊준성님을 위한 레시피들이예요!</h2>
      <div className="galleryStyle">
        {recipes.map((recipe, index) => (
          <Link to={`/recipe/${index}`} key={index} className="linkStyle">
            <img src={recipe.image} alt={recipe.name} className="imageStyle_1" />
            <p style={{ fontSize: "20px" }}>{recipe.name}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
export default Home;
