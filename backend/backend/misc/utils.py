import re
from django.conf import settings


def contains_bangla_script(text):
    # Bangla Unicode range: U+0980 - U+09FF
    bangla_pattern = re.compile(r"[\u0980-\u09FF]")
    return bool(bangla_pattern.search(text))


def get_gemini_response(message):
    import requests

    url = f" https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={settings.GEMINI_API_KEY}"

    request_body = {"contents": [{"parts": [{"text": message}]}]}
    
    response = requests.post(url, json=request_body)
    return response.json()



# key=AIzaSyDIIUZ7IImpEigbHyqDa-qgXaEyLYHfzZs
