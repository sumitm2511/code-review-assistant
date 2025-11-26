# 🚀 CodeReview.AI — Automated Code Review Assistant  
**A full-stack AI-powered tool to analyze, review, and give suggestions for uploaded files or pasted code.**

This project was built as part of **Unthinkable Solutions – Frontend Internship Assignment**, fulfilling all mandatory requirements.

---

## 📘 Table of Contents
1. Overview  
2. Features  
3. Tech Stack  
4. Folder Structure  
5. Running Locally  
6. Environment Variables  
7. Screenshots  
8. API Endpoints  
9. Limitations & Future Improvements  
10. Author  

---

## 🔍 1. Overview

**CodeReview.AI** is an interactive AI tool that performs automated code reviews.  
Users can:

- Upload any code file  
- Paste code directly into the editor  
- Receive structured, JSON-validated, LLM-powered reviews  
- Store & re-view previous reports  
- Switch between dark/light theme (default: **dark**)  

The focus of the tool is to emulate real-world code review workflows and improve developer productivity.

---

## ✨ 2. Features

### 🔹 Frontend (React + Tailwind + CodeMirror)
- Animated drag-and-drop file upload box  
- Smart editor for pasted code  
- Auto-scroll to results  
- Theme switcher with persistent mode  
- Clean, modern UI with premium styling  
- Mobile & tablet responsive

### 🔹 Backend (Node + Express)
- File parsing (txt, js, py, cpp, java, json, many more)
- Pasted text review handling
- Uses **Groq LLM (LLaMA-3.1-8B)** for analysis
- Forces LLM to return *strict JSON only*
- Saves reports in `/backend/reports/`
- Structured API endpoints

### 🔹 AI Review Features
- Bug Detection  
- Code Quality Suggestions  
- Security Issues  
- Performance Improvements  
- Readability & Style Improvements  

---

## 🛠 3. Tech Stack

### **Frontend**
- React (Vite)
- TailwindCSS
- CodeMirror Editor
- Zustand Store

### **Backend**
- Node.js
- Express.js
- Groq LLM API

---

## 📂 4. Folder Structure

code-review-assistant/
│── backend/
│ ├── src/
│ ├── reports/
│ ├── package.json
│── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│── README.md
│── .gitignore


---

## ▶️ 5. Running Locally

### **STEP 1: Clone**
git clone https://github.com/sumitm2511/code-review-assistant.git

cd code-review-assistant


### **STEP 2: Install Backend**
cd backend
npm install


### **STEP 3: Install Frontend**
cd ../frontend
npm install


### **STEP 4: Start Backend**
cd backend
npm run dev


### **STEP 5: Start Frontend**
cd frontend
npm run dev


Backend → http://localhost:5000  
Frontend → http://localhost:5173

---

## 🔑 6. Environment Variables

Create a `.env` in `/backend`:
PORT=5000

## 📡 8. API Endpoints

### **POST /review/file**
Upload a code file → Get JSON review

### **POST /review/text**
Submit pasted code → Get JSON review

### **GET /reports/:id**
Retrieve a saved report



## 👤 10. Author
**Sumit Meena**  
Email: sumitkumeena2511@gmail.com  
GitHub: [sumitm2511](https://github.com/sumitm2511)


