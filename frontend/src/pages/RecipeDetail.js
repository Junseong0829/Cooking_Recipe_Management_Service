import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RecipeDetail.css"

function RecipeDetail() {
  const { index } = useParams(); 
  const [recipe, setRecipe] = useState([]); 

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/recipes/${index}`) 
      .then((response) => response.json())
      .then((data) => setRecipe(data)) // 특정 레시피만 저장
      .catch((error) => console.error("Error fetching recipe:", error));
  }, [index]);

  if (!recipe["instructions"]) return <p><span style={{fontSize:"30px"}}>🐰 상세 요리 과정을 불러오는 중이에요...!</span></p>; 

  return (
    <>
      <h2>🧂 {recipe["name"]}</h2>
      <div className="container">
        <img src={recipe["image"]} alt={recipe["name"]} className="imageStyle_2"></img>
        <div className="detail_1">
          <p>✅ 종류는 <span style = {{color:"red"}}>{recipe["category"]}</span> 입니다</p>
          <p>✅ 열량은 <span style = {{color:"red"}}>{recipe["kcal"]}</span> kcal 입니다</p>
          <p>✅ 탄수화물은 <span style = {{color:"red"}}>{recipe["car"]}</span> g 이에요</p>
          <p>✅ 단백질은 <span style = {{color:"red"}}>{recipe["pro"]}</span> g 이에요</p>
          <p>✅ 지방은 <span style = {{color:"red"}}>{recipe["fat"]}</span> g 이에요</p>
          <p>✅ 나트륨은 <span style = {{color:"red"}}>{recipe["na"]}</span> g 이에요</p>
        </div>
        <div className="detail_2">
          <p>🥕 필요한 식재료는 아래와 같아요</p>
          <p style={{whiteSpace:"pre-line"}}>{recipe["details"]}</p>
        </div>
      </div>
      <h2>👨🏼‍🍳 조리 과정</h2>
      <div className="container_2">
        {recipe["instructions"].map((step, index) => (
          <div key={index}>
            {step.image && <img src={step.image} alt={`Step ${index + 1}`} className="imageStyle_3" />}
            <p>{step.step}</p>
          </div>
        ))}
      </div>
    </>
  );  
}
export default RecipeDetail;