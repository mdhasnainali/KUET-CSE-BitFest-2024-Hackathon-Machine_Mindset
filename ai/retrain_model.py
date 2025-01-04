import os
import shutil
from trl import SFTTrainer
from unsloth import FastLanguageModel
from transformers import TrainingArguments
from datasets import load_dataset
from unsloth import is_bfloat16_supported
from mlflow.models import infer_signature

# Constants
MODEL_NAME = "Llama-3.1-Banglish-to-Bangla-V1"
BACKUP_DIR = f"{MODEL_NAME}_backup"
NEW_MODEL_DIR = f"{MODEL_NAME}_new"
ALPACA_PROMPT = """You are a powerful Banglish-to-Bangla model. Given the banglish text, your job is to translate the banglish into Bangla.

### Instruction:
Convert the Input (Banglish) to Bangla

### Input:
{}

### Response:
{}"""

# Step 1: Backup Current Model
if not os.path.exists(BACKUP_DIR):
    shutil.copytree(MODEL_NAME, BACKUP_DIR)
print(f"Backup of model saved to {BACKUP_DIR}")

# Step 2: Load and Prepare Model
load_model_info = {
    "model_name" : MODEL_NAME,
    "max_seq_length" : 2048,
    "dtype" : None,
    "load_in_4bit" : True,
}
model, tokenizer = FastLanguageModel.from_pretrained(**load_model_info)

# Configure LoRA
model_configurations = {
    "r": 16,
    "target_modules": ["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
    "lora_alpha": 16,
    "lora_dropout": 0,
    "bias": "none",
    "use_gradient_checkpointing": "unsloth",
    "use_rslora" : False,  
    "loftq_config" : None, 
}
model = FastLanguageModel.get_peft_model(model, **model_configurations)

# Step 3: Prepare Dataset
def formatting_prompts_func(examples):
    inputs = examples["rm"]
    outputs = examples["bn"]
    texts = [ALPACA_PROMPT.format(input, output) for input, output in zip(inputs, outputs)]
    return {"text": texts}

dataset = load_dataset("json", data_files="new_data.json", split="train")
dataset = dataset.map(formatting_prompts_func, batched=True)

# Step 4: Train Model
training_configurations = {
    "per_device_train_batch_size" : 4,
    "gradient_accumulation_steps" : 4,
    "warmup_steps" : 5,
    "max_steps" : 60,
    "learning_rate" : 2e-4,
    "logging_steps" : 1,
    "optim" : "adamw_8bit",
    "weight_decay" : 0.01,
    "lr_scheduler_type" : "linear",
    "seed" : 3407,
    "output_dir" : NEW_MODEL_DIR,
    "report_to" : "none", 
}

trainer = SFTTrainer(
    model=model,
    tokenizer=tokenizer,
    train_dataset=dataset,
    dataset_text_field="text",
    max_seq_length=2048,
    args=TrainingArguments(
        **training_configurations,
        fp16 = not is_bfloat16_supported(),
        bf16 = is_bfloat16_supported(),
        ),
)
trainer.train()

# Step 5: Save the New Model
model.save_pretrained(NEW_MODEL_DIR)
tokenizer.save_pretrained(NEW_MODEL_DIR)
print(f"New model saved to {NEW_MODEL_DIR}")

# Step 6: Replace Old Model
shutil.rmtree(MODEL_NAME)
shutil.copytree(NEW_MODEL_DIR, MODEL_NAME)
print(f"Production model updated with the new model.")

# Step 7: Cleanup
if os.path.exists(BACKUP_DIR):
    shutil.rmtree(BACKUP_DIR)
    print(f"Backup directory {BACKUP_DIR} deleted.")

if os.path.exists(NEW_MODEL_DIR):
    shutil.rmtree(NEW_MODEL_DIR)
    print(f"New model directory {NEW_MODEL_DIR} deleted.")