import { useState, useEffect } from "react";
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import "./Calculator.css";

function NutritionLineChart({ data }) {
    return (
        <ResponsiveContainer width={650} height={400}>
            <LineChart data={data} margin={{left:30, right:30}}> 
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="섭취량" stroke="#ff7300" strokeWidth={2} />
                <Line type="monotone" dataKey="성인 평균 권장량" stroke="#387908" strokeWidth={2} strokeDasharray="6 6" />
            </LineChart>
        </ResponsiveContainer>
    );
}

function Calculator() {
    const [recipes, setRecipes] = useState([]);
    const [breakfast, setBreakfast] = useState(null);
    const [lunch, setLunch] = useState(null);
    const [dinner, setDinner] = useState(null);

    const totalKcal = Math.floor((breakfast?.kcal || 0)) + Math.floor((lunch?.kcal || 0)) + Math.floor((dinner?.kcal || 0));
    const totalCarbs = Math.floor((breakfast?.car || 0)) + Math.floor((lunch?.car || 0)) + Math.floor((dinner?.car || 0));
    const totalProtein = Math.floor((breakfast?.pro || 0)) + Math.floor((lunch?.pro || 0)) + Math.floor((dinner?.pro || 0));
    const totalFat = Math.floor((breakfast?.fat || 0)) + Math.floor((lunch?.fat || 0)) + Math.floor((dinner?.fat || 0));
    const totalNa = Math.floor((breakfast?.na || 0)) + Math.floor((lunch?.na || 0)) + Math.floor((dinner?.na || 0));

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/recipes")
            .then((response) => response.json())
            .then((data) => setRecipes(data))
            .catch((error) => console.error("Error fetching recipes:", error));
    }, []);

    const nutritionData = [
        { name: "kcal", 섭취량: totalKcal, "성인 평균 권장량": 2000},
        { name: "나트륨", 섭취량: totalNa, "성인 평균 권장량": 2300 }
    ];
    const nutritionData2 = [
        { name: "탄수화물", 섭취량: totalCarbs, "성인 평균 권장량": 300 },
        { name: "단백질", 섭취량: totalProtein, "성인 평균 권장량": 50 },
        { name: "지방", 섭취량: totalFat, "성인 평균 권장량": 70 },
    ];
       
    return (
        <>
            <h2>👻 아침, 점심, 저녁 메뉴를 설정해주세요</h2>
            <div className="calculator">
                <div className="select">
                    <div className="meal">
                        <p>아침</p>
                        <select className="select-box" onChange={(e) => setBreakfast(recipes.find(r => r.name === e.target.value))}>
                            <option value="">-- 선택하세요 --</option>
                            {recipes.map((recipe) => (
                                <option key={recipe.name} value={recipe.name}>{recipe.name} ({recipe.category})</option>
                            ))}
                        </select>
                    </div>
                    <div className="meal">
                        <p>점심</p>
                        <select className="select-box" onChange={(e) => setLunch(recipes.find(r => r.name === e.target.value))}>
                            <option value="">-- 선택하세요 --</option>
                            {recipes.map((recipe) => (
                                <option key={recipe.name} value={recipe.name}>{recipe.name} ({recipe.category})</option>
                            ))}
                        </select>
                    </div>
                    <div className="meal">
                        <p>저녁</p>
                        <select className="select-box" onChange={(e) => setDinner(recipes.find(r => r.name === e.target.value))}>
                            <option value="">-- 선택하세요 --</option>
                            {recipes.map((recipe) => (
                                <option key={recipe.name} value={recipe.name}>{recipe.name} ({recipe.category})</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="temp">
                    {breakfast && <img src={breakfast.image} className="picture" />}
                    {lunch && <img src={lunch.image} className="picture" />}
                    {dinner && <img src={dinner.image} className="picture" />}
                </div>
                <div>
                    <div className="summary">
                        <p>➡️ 총 kcal는 <span style={{color:"red"}}>{totalKcal}</span> kcal 입니다. (❇️성인 평균 권장량과 <span style={{color:"green"}}>{Math.abs(2000-totalKcal)}</span> kcal 차이 납니다.)</p>
                        <p>➡️ 총 탄수화물은 <span style={{color:"red"}}>{totalCarbs}</span> g 입니다.   (❇️성인 평균 권장량과 <span style={{color:"green"}}>{Math.abs(300-totalCarbs)}</span> g 차이 납니다.)</p>
                        <p>➡️ 총 단백질은 <span style={{color:"red"}}>{totalProtein}</span> g 입니다.   (❇️성인 평균 권장량과 <span style={{color:"green"}}>{Math.abs(50-totalProtein)}</span> g 차이 납니다.)</p>
                        <p>➡️ 총 지방은 <span style={{color:"red"}}>{totalFat}</span> g 입니다.   (❇️성인 평균 권장량과 <span style={{color:"green"}}>{Math.abs(70-totalFat)}</span> g 차이 납니다.)</p>
                        <p>➡️ 총 나트륨은 <span style={{color:"red"}}>{totalNa}</span> g 입니다.   (❇️성인 평균 권장량과 <span style={{color:"green"}}>{Math.abs(2300-totalNa)}</span> g 차이 납니다.)</p>
                    </div>
                    <div className="chartWrapper">
                        <div className="chartContainer">
                            <NutritionLineChart data={nutritionData} />
                        </div>
                        <div className="chartContainer">
                            <NutritionLineChart data={nutritionData2} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Calculator;