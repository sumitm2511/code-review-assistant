# Reviewly – AI Code Review Assistant

Reviewly is an AI-powered code review platform that evaluates uploaded files or pasted code using LLMs (Groq API), providing structured feedback, improvements, error detection, and optimization suggestions.

## 🧩 Project Structure
/backend → Node.js + Express + Groq LLM
/frontend → React + Tailwind + Vite


## 🚀 Features
- Upload file or paste code
- AI-driven structured code review
- JSON-safe backend validation
- Animated drag-and-drop file zone
- CodeMirror editor
- Light/Dark mode (default: Dark)
- Saved reports
- Responsive premium UI with clean UX

## 🛠️ Tech Stack
**Frontend:** React, Vite, TailwindCSS  
**Backend:** Node.js, Express  
**LLM Provider:** Groq (Llama-3.1-8B-Instant)  

## 📦 Install & Run

### Backend
cd backend
npm install
npm run dev


### Frontend
cd frontend
npm install
npm run dev


## 🔐 Environment Variables
Backend `.env`




## 📚 How It Works
- User uploads a file or pastes code  
- Request hits `/review/file` or `/review/text`  
- Backend sends prompt to Groq’s Llama-3.1 model  
- Valid JSON review is returned  
- Frontend displays structured feedback

## 📄 Submission Ready
✔ Clean repo  
✔ .gitignore  
✔ README completed  
✔ Folder structure clear  
✔ No node_modules pushed  
✔ App runs from instructions above  

## 👨‍💻 Author
Sumit Kumar Meena  
CodeReview.AI – AI Code Review Assistant
