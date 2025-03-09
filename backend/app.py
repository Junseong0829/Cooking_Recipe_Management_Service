from flask import Flask, jsonify
import requests
from flask_cors import CORS

app=Flask(__name__)
CORS(app)

key="0019be287c9c49ffae88"
service="COOKRCP01"
startIdx=24
endIdx=101
URL=f"http://openapi.foodsafetykorea.go.kr/api/{key}/{service}/json/{startIdx}/{endIdx}"

@app.route('/api/recipes', defaults={"index":None},methods=['GET'])
@app.route('/api/recipes/<int:index>', methods=['GET'])

def get_recipes(index):
    response = requests.get(URL)
    data = response.json()
    recipes = data.get("COOKRCP01", {}).get("row", [])

    formatted_data = []
    count=0
    for recipe in recipes:
        instructions = []
        for i in range(1, 21):
            step = recipe.get(f"MANUAL{str(i).zfill(2)}")  # 01, 02 형식 맞추기
            step_img = recipe.get(f"MANUAL_IMG{str(i).zfill(2)}")  # 단계별 이미지

            if step:  # 조리법이 존재할 때 list append
                instructions.append({"step": step, "image": step_img})
                
        temp_DTLS=""
        for j in recipe.get("RCP_PARTS_DTLS"):  #특수 문자 보이면 띄어쓰기 생성
            if j=="●":
                temp_DTLS+="\n"
            temp_DTLS+=j
            
        formatted_data.append({
            "index":count, #index
            "name": recipe.get("RCP_NM"), #이름
            "category": recipe.get("RCP_PAT2"), #종류
            "car": recipe.get("INFO_CAR"), #탄수화물
            "pro": recipe.get("INFO_PRO"), #단백질
            "fat": recipe.get("INFO_FAT"), #지방
            "na": recipe.get("INFO_NA"), #나트륨
            "details": temp_DTLS[1:] if temp_DTLS[0]=="\n" else temp_DTLS, #식재료
            "kcal" : recipe.get("INFO_ENG"), #열량
            "image": recipe.get("ATT_FILE_NO_MAIN"),  # 대표 요리 이미지
            "instructions": instructions  # 조리법 + 이미지 리스트
        })
        count+=1
    if index is None:
        return jsonify(formatted_data)
    if 0<=index<len(recipes):
        return jsonify(formatted_data[index])
    return jsonify({"error": "Recipe not found"}), 404
    
if __name__=="__main__":
    app.run(debug=True)