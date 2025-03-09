import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Category.css";

function Category(){
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
      fetch("http://127.0.0.1:5000/api/recipes")
        .then((response) => response.json())
        .then((data) => setRecipes(data))
        .catch((error) => console.error("Error fetching recipes:", error));
    }, []);

    if (!recipes) return <p><span style={{fontSize:"30px"}}>🐰 Loading...!</span></p>; 

    return(
        <>
        <h2>🍚 밥</h2>
        <div className="type_1">
        {recipes.filter((recipe) => (recipe["category"]=="밥")).map((recipe, index) => (
            <div className="box">
                <Link to={`/recipe/${recipe.index}`} key={recipe.index} className="linkStyle">
                    <img src={recipe.image} className="image"/>
                    <p>{recipe.name}</p>    
                </Link>
            </div>
        ))}
        </div>
        <h2>🍲 국&찌개</h2>
        <div className="type_1">
        {recipes.filter((recipe) => (recipe["category"]=="국&찌개")).map((recipe, index) => (
            <div className="box">
                <Link to={`/recipe/${recipe.index}`} key={recipe.index} className="linkStyle">
                    <img src={recipe.image} className="image"/>
                    <p>{recipe.name}</p>
                </Link>
            </div>
        ))}
        </div>
        <h2>🥗 반찬</h2>
        <div className="type_1">
        {recipes.filter((recipe) => (recipe["category"]=="반찬")).map((recipe, index) => (
            <div className="box">
                <Link to={`/recipe/${recipe.index}`} key={recipe.index} className="linkStyle">
                    <img src={recipe.image} className="image"/>
                    <p>{recipe.name}</p>
                </Link>
            </div>
        ))}
        </div>
        <h2>🍖 일품</h2>
        <div className="type_1">
        {recipes.filter((recipe) => (recipe["category"]=="일품")).map((recipe, index) => (
            <div className="box">
                <Link to={`/recipe/${recipe.index}`} key={recipe.index} className="linkStyle">
                    <img src={recipe.image} className="image"/>
                    <p>{recipe.name}</p>
                </Link>
            </div>
        ))}
        </div>
        <h2>🍰 후식</h2>
        <div className="type_1">
        {recipes.filter((recipe) => (recipe["category"]=="후식")).map((recipe, index) => (
            <div className="box">
                <Link to={`/recipe/${recipe.index}`} key={recipe.index} className="linkStyle">
                    <img src={recipe.image} className="image"/>
                    <p>{recipe.name}</p>
                </Link>
            </div>
        ))}
        </div>
        </>
    )
}
export default Category;