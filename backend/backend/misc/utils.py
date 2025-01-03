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


# export to pdf with txt and return pdf file path
def export_pdf(title, caption, body, date, author):

    pdf_content = render_to_string(
        "pdf_template.html",
        {
            "title": title,
            "caption": caption,
            "body": body,
            "date": date,
            "author": author,
        },
    )

    # write pdf content to a file
    pdf_file_path = f"media/{uuid4()}.pdf"
    HTML(string=pdf_content).write_pdf(pdf_file_path)
    return pdf_file_path


def generate_title_and_caption(message):
    url = f" https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={settings.GEMINI_API_KEY}"

    new_message = (
        message
        + '\n\nGenerate Bangla Title and Caption for this in JSON format. JSON format example: {"title": "টাইটেল", "caption": "ক্যাপশন"}'
    )
    request_body = {"contents": [{"parts": [{"text": new_message}]}]}

    response = requests.post(url, json=request_body)
    json_response = json.loads(response.json()["candidates"][0]["content"]["parts"][0]["text"])
    return json_response
