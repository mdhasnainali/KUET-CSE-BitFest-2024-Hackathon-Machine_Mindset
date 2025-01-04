from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from unsloth import FastLanguageModel
from transformers import TrainingArguments
from fastapi import BackgroundTasks
from typing import List
import subprocess
import uvicorn
import json

# Initialize FastAPI app
app = FastAPI(title="Banglish-to-Bangla Translation API (Unsloth)")

def extract_last_bangla_text(input_text: str) -> str:
    pos = input_text.rfind("Response:") + 10
    return input_text[pos:]

# Load model and tokenizer
MODEL_NAME = "Llama-3.1-Banglish-to-Bangla-V1"
MAX_SEQ_LENGTH = 2048
DTYPE = None  # Auto-detection of dtype
LOAD_IN_4BIT = True  # Use 4-bit quantization

# Load model and tokenizer
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name=MODEL_NAME,
    max_seq_length=MAX_SEQ_LENGTH,
    dtype=DTYPE,
    load_in_4bit=LOAD_IN_4BIT,
)

# Enable faster inference
FastLanguageModel.for_inference(model)

# Request and response schemas
class TranslationRequest(BaseModel):
    prompt: str

class TranslationResponse(BaseModel):
    bangla_text: str

class DataItem(BaseModel):
    rm: str
    bn: str

@app.get("/")
def root():
    return {"message": "Welcome to the Banglish-to-Bangla Translation API (Unsloth)"}

@app.post("/translate", response_model=TranslationResponse)
def translate(request: TranslationRequest):
    try:
        # Prepare the input using the Alpaca prompt
        alpaca_prompt = """You are a powerful Banglish-to-Bangla model. Given the banglish text, your job is to translate the banglish into Bangla.

### Instruction:
Convert the Input (Banglish) to Bangla

### Input:
{}

### Response:
"""
        input_text = alpaca_prompt.format(request.prompt)
        inputs = tokenizer([input_text], return_tensors="pt").to("cuda")

        # Generate output
        outputs = model.generate(**inputs, max_new_tokens=5000, use_cache=True)
        result = tokenizer.batch_decode(outputs, skip_special_tokens=True)
        bangla_text = result[0].strip()
        # print(bangla_text)
        bangla_text = extract_last_bangla_text(bangla_text)
        # print(bangla_text)

        return TranslationResponse(bangla_text=bangla_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




@app.post("/retrain")
def retrain_model(data: List[DataItem], background_tasks: BackgroundTasks):
    try:
        # Save the received data to a JSON file
        json_file_path = "new_data.json"
        with open(json_file_path, "w") as f:
            json.dump([item.dict() for item in data], f, indent=4)

        # Function to run the retraining script
        def run_retrain_script():
            subprocess.run(
            ["python", "retrain_model.py"],
            check=True,
            capture_output=True,
            text=True
        )

        # Add the retraining process to background tasks
        background_tasks.add_task(run_retrain_script)
        return {"message": "Retraining initiated. This process runs in the background."}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Retraining failed: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)


# http://103.99.176.106:5000/invocations -H "Content-Type:application/json"  --data '{"inputs": "Tumi Kamon acho?"'

# mlflow models serve -m runs:/d042ae9810d340f5baba6385f0394eeb/model -p 5000