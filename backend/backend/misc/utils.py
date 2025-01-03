import re
import requests
from django.conf import settings
from weasyprint import HTML
from django.template.loader import render_to_string
from uuid import uuid4
import json


def contains_bangla_script(text):
    # Bangla Unicode range: U+0980 - U+09FF
    bangla_pattern = re.compile(r"[\u0980-\u09FF]")
    return bool(bangla_pattern.search(text))


def get_gemini_response(message):
    url = f" https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={settings.GEMINI_API_KEY}"

    new_message = message + "\n\nReply in Bangla"
    request_body = {"contents": [{"parts": [{"text": new_message}]}]}

    response = requests.post(url, json=request_body)
    return response.json()["candidates"][0]["content"]["parts"][0]["text"]


def gpt_banglish_correction(message):
    url = f"https://api.openai.com/v1/chat/completions"

    prompt = "Correct the following Banglish text and provide the corrected Banglish text. Banglish text: "
    prompt += message
    prompt += "\nOnly provide the corrected Banglish text. No other information is required."

    request_body = {
        "model": "gpt-4-turbo",
        "messages": [{"role": "user", "content": [{"type": "text", "text": prompt}]}],
        "max_tokens": 500,
    }

    response = requests.post(url, json=request_body, 
        headers={"Authorization": f"Bearer {settings.OPENAI_API_KEYs}"}
    )

    print(response.json())
    return response.json()["choices"][0]["message"]["content"]


# export to pdf with txt and return pdf file path
def export_pdf(title, caption, body, date, author, font):

    pdf_content = render_to_string(
        "pdf_template.html",
        {
            "title": title,
            "caption": caption,
            "body": body,
            "date": date,
            "author": author,
            "font_path": f"{font}",
        },
    )

    print(pdf_content)

    # write pdf content to a file
    pdf_file_path = f"{uuid4()}.pdf"
    HTML(string=pdf_content).write_pdf(f"media/{pdf_file_path}")
    return pdf_file_path


def generate_title_and_caption(message):
    url = f" https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={settings.GEMINI_API_KEY}"

    new_message = (
        message
        + '\n\nGenerate Bangla Title and Caption for this in JSON format. JSON format example: {"title": "টাইটেল", "caption": "ক্যাপশন"}. Return this json in plain text format. No formatting required.'
    )
    request_body = {"contents": [{"parts": [{"text": new_message}]}]}

    response = requests.post(url, json=request_body)
    response = response.json()["candidates"][0]["content"]["parts"][0]["text"]
    print(response)
    json_response = json.loads(response)
    return json_response


# returns the translated text
def process_text_with_llm_endpoint(text):
    response = requests.post(
        f"{settings.LLM_API_ENDPOINT}translate/",
        json={"prompt": text},
    )
    print(response.json())
    return response.json()["bangla_text"]


def train_llm_model(json_data):
    response = requests.post(
        f"{settings.LLM_API_ENDPOINT}retrain/",
        json=json_data,
    )
    return response.json()
