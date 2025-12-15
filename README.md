# AI Medical Writing Assistant 🪶

Live Link: https://ai-medical-writer-tina.vercel.app/

## About

Medical writing but make it ✨automated✨ Enter a disease name to create a disease overview based on your desired detail level complete with references. View all your previous search histories and save for later in Word or PDF format.

## Features

- Input a disease name and generate an article via OpenAI API
- Choose between brief or detailed summaries
- Download generated articles as Word or PDF
- Stores user's session history

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Python, Flask
- **API:** OpenAI GPT for article generation
- **Other:** SWR for client-side data fetching and caching, FPDF & python-docx for document generation

## Getting Started Locally

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
flask run
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
