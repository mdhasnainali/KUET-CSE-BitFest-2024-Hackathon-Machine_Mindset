### KUET-CSE-BitFest-2024-Hackathon-Machine_Mindset


# BanglaShift: A Banglish to Bangla Conversion App (Web and Android)

BanglaShift is a modern web and mobile app that makes interacting with the Bengali language effortless. It allows users to easily convert Banglish (Bengali written in English letters) into proper Bangla. Whether you’re writing stories, chatting, or learning, BanglaShift bridges the gap between convenience and cultural authenticity, helping to preserve the beauty of Bangla while offering a smooth and user-friendly experience.


# Core Features

![alt text](<images/_- visual selection.png>)

**1. Banglish to Bangla Conversion**
- Accurate translation of Banglish text to Bangla using advanced AI models.

**2. Content Management**
- Write stories or paragraphs in Banglish and convert them into Bangla.
- Export content as PDFs with AI-generated titles and captions.

**3. Chatbot Integration**
- Interact with a chatbot that understands Banglish and Bangla queries and responds in Bangla.


**4. Search Functionality**
- Search for user profiles or public PDFs using Banglish or Bangla.


**5.Continuous Learning**
- Users can contribute to improving the translation system with verified inputs.

**6. Authentication**
- Secure login and registration for personalized experiences.



# Additional Features:

**1. Custom fonts for PDFs**
- We are offering users to customize the font of the PDFs before exporting, currently we have 6 fonts in our system: Ador Noirrit, Alinur Nakkhatra, Alinur Showpnocari, Sankalpa, SirajeeSanjar, and SwarnaliOkkhor.

**2. Analytics Dashboard**
- Access a comprehensive dashboard with detailed metrics to help you track your progress and gain valuable insights into your usage and activity.

**3. Auto-Correction for Banglish Input**
- We leverage OpenAI’s GPT model to automatically correct misspelled Banglish words before passing them to our LLM model, ensuring more accurate translations and a smoother user experience.




# Tech Stack

- **Frontend:** NextJS, shadcn, aceternity, tailwindCSS, redux
- **Mobile App:** Flutter
- **Backend**: Django, Django Rest Framework, weasyprint, SimpleJWT Authentication
- **Database**: SQLite3
- **AI**: Llama 3.1 8B instruct model, MLflow, pyTorch, FastAPI (for production server)

# Installation

Prerequisites:
- Python 3.13.1
- Node.js 22.12.0
- Flutter 3.27.1

System Requirements for running the AI model:
- Nvidia GeForce RTX 3090
- RAM 8 GB
- Processor intel core i7
- 20 GB of free disk space


Clone the repo by git cli tool:

```
git clone https://github.com/mdhasnainali/KUET-CSE-BitFest-2024-Hackathon-Machine_Mindset/
```

Set up the backend:

```
cd backend  
python -m venv venv  
source venv/bin/activate
pip install -r requirements.txt  
python manage.py runserver  
```

Set up the frontend:

```
cd ../frontend  
npm install  
npm run dev
```

# API Documentation

## For Teachers:

**1. Profile Management**

Get Profile

Method: GET

URL: `/teacher/profile/`

Update Profile

Method: PUT

URL: `/teacher/profile/`

body:
```
{
    "name": "Teacher Name",
    "subject": "Subject",
    "image_url": "https://profile-image.com/"
}
```


**2. Content Management**

Method: POST

URL: `/teacher/content-management/`

```
{
    "banglish": "Text content here...",
    "public": true,
    "font": "font name"
}
```

**3. Get All Contents**

Method: GET

URL: `/teacher/content-management/`

**4. Get Single Content**

Method: GET

URL: `/teacher/content-management/?content_id=7`

**4. Update Content**

Method: PUT

URL: `/teacher/content-management/7`

```
{
    "banglish": "Updated content text...",
    "public": true,
    "font": "AdorNoirrit"
}
```

**5. Delete Content**

Method: DELETE

URL: `/teacher/content-management/6`

**6. Analytics**

Method: GET

URL: `/teacher/analytics/`


**8. Registration**

Method: POST

URL: `/teacher/registration/`

```
{
    "name": "Teacher Name",
    "subject": "Subject",
    "email": "email@address.com",
    "password1": "123456",
    "password2": "123456",
    "image_url": "https://profile.picture/"
}
```



## For Students:

**1. Get Profile**

Method: GET

URL: `/student/profile/`

**2. Update Profile**

Method: PUT

URL: `/student/profile/`

```
{
    "name": "Student Name",
    "roll": "123456",
    "level": "Level",
    "image_url": "https://profile.picture/"
}
```

**3. Registration**


Method: POST

URL: `/student/registration/`

```
{
    "name": "Student Name",
    "roll": "123456",
    "level": "Level",
    "email": "student@email.address",
    "password1": "123456",
    "password2": "123456",
    "image_url": "https://profile.picture/"
}
```

## Public API

**1. Get all public contents**

Method: GET

URL: `/misc/contents/`

**2. Search**

Method: POST

URL: `/misc/search/`

```
{
    "search_text": "..."
}
```

## Chatbot API

**1. Chatbot**

Method: POST

URL: `/misc/chatbot/`

```
{
    "message": "banglish or bangla text here..."
}
```

**2. Chat with Reference**

Method: POST

URL: `/misc/chatbot/`

```
{
    "content_id": <id>,
    "message": "banglish or bangla text here...",    
}
```


## Administator

**1. Create Contribution**

Method: POST

URL: `/administrator/contribution/`

```
{
    "banglish": "Banglish text here...",
    "bangla": "Bangla text here..."
}
```


**2. Get All Contributions**

Method: GET

URL: `/administrator/contribution/`

**3. Remove Contribution**

Method: DELETE

URL: `/administrator/contribution/7`


**4. Train LLM Model**

Method: POST

URL: `/administrator/train_llm_model/`

**5. Analytics**

Method: GET

URL: `/administrator/analytics/`


**6. Get All Students**

Method: GET

URL: `/administrator/students/`

**7. Get All Teachers**

Method: GET

URL: `/administrator/teachers/`



## AI Model Training Metrics

![alt text](<images/Screenshot 2025-01-04 at 7.57.33 AM.png>)

![alt text](<images/Screenshot 2025-01-04 at 7.57.54 AM.png>)

