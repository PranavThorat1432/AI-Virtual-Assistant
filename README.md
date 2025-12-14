# 🤖 AI Virtual Assistant

**Intelligent, Voice-Enabled Assistant powered by Gemini AI**

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-06B6D4?logo=tailwindcss\&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-blueviolet)
![License](https://img.shields.io/badge/License-MIT-blue)

</div>

---

## 🌟 Overview

**AI Virtual Assistant** is a full-stack, voice-enabled intelligent assistant built using the **MERN stack** and powered by **Google Gemini AI**.
Unlike basic chatbot implementations, this project focuses on **intent detection, structured AI responses, and real-world assistant actions** such as search, media playback, system commands, and contextual replies.

The assistant understands **natural language in multiple languages**, determines user intent, and responds with **structured JSON outputs**, making it suitable for real-world integrations like voice assistants, browser automation, and smart dashboards.

---

## 🚀 What Makes This Project Stand Out

✔ Not just a chatbot — a **command-driven AI assistant**
✔ **Intent classification system** (Google, YouTube, system actions, time, weather, etc.)
✔ **Multilingual input & response support**
✔ **Strict JSON-based AI responses** for predictable frontend handling
✔ **Voice-friendly responses** optimized for TTS
✔ Clean **frontend–backend separation**
✔ Production-ready architecture

---

## ✨ Core Features

### 🧠 AI & Intelligence

* Gemini AI–powered responses
* Natural language understanding (English, Hindi, Marathi, etc.)
* Intent detection & classification
* Context-aware short voice responses
* Structured JSON output enforcement

### 🎯 Supported Intents

* General Q&A
* Google Search
* YouTube Search & Play
* Weather Information
* Time / Date / Day / Month
* Open Calculator
* Open Instagram / WhatsApp
* Voice-friendly confirmations

### 🔐 Authentication & Security

* JWT-based authentication
* Protected APIs
* Secure password hashing with bcrypt
* Environment-based configuration

### 🎨 UI / UX

* Modern, minimal UI using Tailwind CSS
* Smooth animations with Framer Motion
* Fully responsive (mobile + desktop)
* Customizable assistant identity

### ☁️ Media & Storage

* Cloudinary integration for avatars/assets
* MongoDB for persistent user data

---

## 🧩 Tech Stack

### Frontend

* **React 19**
* **React Router**
* **Tailwind CSS**
* **Framer Motion**
* **Axios**
* **React Icons**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* **JWT Authentication**
* **Bcrypt**
* **Cloudinary**
* **Google Gemini AI**

---

## 🏗️ Architecture Overview

```
User Voice/Text Input
        ↓
Frontend (React)
        ↓
Backend (Express API)
        ↓
Gemini AI (Intent + Response)
        ↓
Structured JSON Output
        ↓
Frontend Action Handler (Search, Play, Speak, Open App)
```

---

## 🛠️ Project Structure

```
ai-virtual-assistant/
├── Client/
│   ├── src/
│   │   ├── Components/
│   │   ├── Pages/
│   │   ├── ContextAPI/
│   │   └── assets/
│   └── public/
│
└── Server/
    ├── config/
    ├── controllers/
    ├── middlewares/
    ├── models/
    ├── routes/
    ├── gemini.js
    └── server.js
```

---

## ⚙️ Environment Configuration

### Server `.env`

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
```

### Client `.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## ▶️ Running Locally

```bash
# Backend
cd Server
npm install
npm run dev

# Frontend
cd Client
npm install
npm run dev
```

Open: **[http://localhost:5173](http://localhost:5173)**

---

## 🔮 Future Enhancements

* Wake-word detection (hands-free activation)
* Conversation memory & history
* AI personality modes (formal, friendly, humorous)
* Voice-to-voice conversations
* System-level automation (desktop integration)
* AI task scheduling & reminders

---

## 🤝 Contributing

Contributions are welcome.
If you have ideas to improve intelligence, UX, or integrations—feel free to open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the **MIT License**.
See the `LICENSE` file for full details.

---

## 📬 Contact

**Pranav Thorat**
GitHub: [https://github.com/PranavThorat1432](https://github.com/PranavThorat1432)
LinkedIn: *(add your profile)*

---

<div align="center">

⭐ If this project impressed you, consider starring the repository
Built with focus on **real-world AI assistant architecture**

</div>

---

### Brutally honest take (since you prefer that):

This README now **looks like something a startup or product team would publish**, not a tutorial project.
Your **intent-based JSON design** is the strongest part—this README highlights that properly.

If you want next:

* A **demo GIF section**
* A **“How intent detection works” diagram**
* A **Resume-ready one-liner**

Just say the word.
