# app/main.py
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
import pandas as pd

app = FastAPI()

# KcELECTRA 기반 감정 분석 파이프라인 전역 로드 (Cold Start 방지)
# *실제 운영 시에는 GPU(device=0) 할당 및 양자화(Quantization) 모델 사용 권장
emotion_classifier = pipeline(
    "text-classification", 
    model="Beomi/KcELECTRA-base-v2022-finetuned-emotion", 
    return_all_scores=False
)

class TextPayload(BaseModel):
    text: str

class ChatPayload(BaseModel):
    message: str

class LifeDataPayload(BaseModel):
    user_id: int
    # DB에서 추출된 시계열 데이터 배열 형태 가정

@app.post("/ml/emotion")
async def analyze_emotion(payload: TextPayload):
    # KcELECTRA 모델을 통한 감정 라벨링 및 신뢰도 점수 산출
    result = emotion_classifier(payload.text)[0]
    return {"label": result['label'], "score": round(result['score'], 4)}

@app.post("/ml/chat")
async def process_chat(payload: ChatPayload):
    # 챗봇 의도 분석 및 감정 추출
    emotion_result = emotion_classifier(payload.message)[0]
    
    # 핵심 로직: 극단적 부정 감정(예: 절망, 분노) 신뢰도가 0.85 이상일 경우 위기 감지 플래그 활성화
    is_crisis = True if emotion_result['label'] in ['절망', '우울'] and emotion_result['score'] > 0.85 else False
    
    # TODO: 챗봇 생성 모델(예: KoGPT) 응답 생성 로직 추가
    bot_reply = "말씀해주셔서 감사합니다. 조금 더 자세히 들어볼 수 있을까요?"

    return {
        "reply": bot_reply,
        "emotion": emotion_result['label'],
        "crisis_detected": is_crisis
    }

@app.post("/ml/insight")
async def analyze_correlation(payload: LifeDataPayload):
    # 핵심 로직: 생활 데이터와 감정 점수 간의 상관관계 분석 (Pandas 활용)
    # 예시 데이터 생성
    data = {
        'sleep_hours': [5, 6, 8, 7, 4, 8, 7],
        'exercise_mins': [0, 30, 60, 45, 0, 90, 30],
        'emotion_score': [2, 3, 5, 4, 1, 5, 4] # 1: 부정, 5: 긍정
    }
    df = pd.DataFrame(data)
    
    # 피어슨 상관계수 매트릭스 도출
    correlation_matrix = df.corr()
    
    # 수면과 감정의 상관계수 추출
    sleep_emotion_corr = correlation_matrix.loc['sleep_hours', 'emotion_score']
    
    insight_msg = "수면 시간과 긍정적 감정 간의 강한 양의 상관관계가 분석되었습니다." if sleep_emotion_corr > 0.6 else "유의미한 패턴을 분석 중입니다."

    return {
        "correlation_coefficient": round(sleep_emotion_corr, 3),
        "insight": insight_msg
    }
