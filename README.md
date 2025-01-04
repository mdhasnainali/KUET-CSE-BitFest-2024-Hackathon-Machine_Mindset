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

