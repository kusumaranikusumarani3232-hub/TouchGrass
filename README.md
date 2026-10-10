# 🌿 NatureBuddy AI

> **"The screen starts the adventure. The outside world is the main experience."**

Built for **Hacktoberfest Open-Source AI Challenge Week 1: “Touch Grass.”**

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19.2.8-blue.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-purple.svg)](https://vitejs.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4.3.3-38bdf8.svg)](https://tailwindcss.com)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg)](https://fastapi.tiangolo.com)

---

## 🔗 Demo & Links

* 🌐 **Live Web Application**: `[Demo Link Placeholder - https://your-demo-app.vercel.app]`
* 📹 **Video Walkthrough**: `[Video Link Placeholder - https://youtube.com/watch?v=your-demo]`
* 📦 **GitHub Repository**: `https://github.com/your-username/TouchGrass`

---

## 🎯 Challenge Alignment & Concept: "Touch Grass"

### The Problem
Modern digital applications are engineered around attention capture—maximizing screen time through infinite feeds, constant notifications, and passive scrolling. Even traditional nature apps often lock users into looking down at screens to read dense wiki entries.

### The Solution: NatureBuddy AI
NatureBuddy AI flips the digital paradigm upside down: **digital interactions are intentionally restricted to under 15 seconds**. 
The application acts as a light nudge to step outside, offering quick micro-missions, an ambient pocket timer to keep your phone away, and open-weight vision AI to analyze natural discoveries after your walk.

```
[Select Mission] ➔ ➔ ➔ [Put Phone in Pocket] ➔ ➔ ➔ [Observe & Explore Outside] ➔ ➔ ➔ [Snap Photo & Open AI Insights]
  (< 10 secs)            (Screen Off / Ambient Audio)       (Real World Experience)           (Quick Learning + Audio TTS)
```

---

## 💡 Why Open Innovation & Open-Weight AI Matter for Touch Grass

NatureBuddy AI is designed around **open-weight AI models** and open innovation principles rather than closed, proprietary API silos. Here is why open innovation is critical to this mission:

1. 🌲 **True Offline & Wilderness Capability**:
   Exploring nature frequently takes users to forests, mountain trails, and remote parks where 4G/5G cellular signals are weak or non-existent. Proprietary cloud LLMs fail without internet access. With browser-local WASM/WebGL open engines or self-hosted Ollama endpoints, vision inference runs **100% offline in the wild**.
   
2. 🔄 **Modularity & Zero Vendor Lock-in**:
   The application implements a unified `analyzeNatureImage()` strategy pattern. Developers can seamlessly swap models—ranging from Llama 3.2 Vision to Qwen2-VL or local BLIP—without rewriting any frontend component code.

3. 🛡️ **User Privacy & Data Sovereignty**:
   Personal photos taken outdoors (including garden views, backyard landmarks, or family outings) remain on the user's local device or private self-hosted server rather than being transmitted to proprietary cloud datasets.

4. 🌍 **Community Sovereignty & Accessibility**:
   Open weights enable naturalists, educators, and open-source developers worldwide to inspect model behavior, fine-tune models on local plant biodiversity, and host AI tools without incurring expensive API toll booths.

---

## 🤖 Open-Source / Open-Weight AI Architecture

NatureBuddy AI supports **5 execution strategies**, prioritizing client-side privacy and offline execution by default:

| Provider / Execution Target | Open-Weight Model | Parameters | Execution Environment | Best Used For |
| :--- | :--- | :--- | :--- | :--- |
| **Browser-Local Open Engine** *(Default)* | `BLIP / ViT-Vision` | ~300M | **100% In-Browser (WASM/WebGL)** | 0s Setup, 100% Offline, Zero Cloud Cost |
| **Groq LPU Open Vision** | `qwen/qwen3.8-27b` | 27 Billion | Remote Open LPU (&lt;500ms response) | Real-time high accuracy vision |
| **Hugging Face Serverless** | `Qwen/Qwen2-VL-7B-Instruct` | 7 Billion | Hugging Face Open Inference API | Multimodal serverless vision |
| **Local Ollama Endpoint** | `llava:latest` / `llama3.2-vision` | 7B - 11B | Self-Hosted `http://localhost:11434` | Local GPU/CPU acceleration |
| **Python FastAPI Backend** | `FastAPI Open Vision Proxy` | 7B - 11B | Local `http://localhost:8000` | Custom Python backend pipelines |

---

## ✨ Core Features

### 1. 📱 Touch Grass Pocket Mode
* **Screen-Free Outdoor Timer**: Choose duration (5, 10, 15, or 20 minutes) and place your device in your pocket.
* **Procedural Web Audio Ambient Soundscape**: Synthesizes relaxing **Forest Wind & Birds** ambient sound directly in the browser via the Web Audio API—no heavy audio files required.
* **Completion Chime**: Plays a soothing pentatonic chime alert when exploration time finishes.

### 2. 🌿 Dynamic Outdoor Mission Generator
* Interactive quest cards across multiple exploration categories:
  * 🚶 **15-Minute Outdoor Walk**
  * 🍃 **Trio of Leaves Scavenger**
  * 💨 **Nature in Motion**
  * 🔊 **Acoustic Sound Mapping**
  * 🔬 **Hidden Texture Micro-Hunt**
  * 👁️ **The Unnoticed Detail**
  * 💧 **Water & Light Reflection**
* Built-in mission filtering, hint previews, and random mission shuffling.

### 3. 📸 Photo Capture & Open AI Analysis
* **Multiple Input Sources**: Supports device camera capture, file drag-and-drop, and 4 pre-loaded nature sample presets (Alpine Lake, Sunlit Oak Leaf, Monarch Butterfly, Mossy Forest Path).
* **Open AI Multimodal Output**:
  * 🌿 **Likely Identification**: Species/element classification.
  * 💡 **Ecological Facts**: 2 concise, fascinating scientific insights.
  * 👁️ **Sensory Hint**: Encourages tactile, olfactory, or auditory observation.
  * 🎯 **Next Outdoor Challenge**: Actionable follow-up prompt.
  * 🔊 **Hands-Free Text-to-Speech**: Built-in Web Speech API audio reader for listening while exploring.

### 4. 🏆 Explorer Progress & Nature Journal
* **XP & Leveling System**: Earn +100 XP per completed mission and rank up levels (e.g., *Nature Pioneer*).
* **Outdoor Streak Tracking**: Tracks daily adventure streaks and total outdoor minutes.
* **Achievement Badges**: Unlock explorer milestones (*🌱 First Adventure*, *🚶 15-Minute Explorer*, *📸 Nature Observer*, *🌿 Flora Specialist*, *☀️ Touch Grass Master*).
* **LocalStorage Journal**: Persistent history of logged nature discoveries with timestamp tags and open model provenance badges.

### 5. 🔬 Open AI Spec Inspector Modal
* In-app configuration modal accessible from the navigation bar allowing users to inspect active AI provider settings, enter optional API keys dynamically, or switch providers on the fly.

---

## 🛠️ Technology Stack

### Frontend Architecture
* **Core Framework**: [React 19](https://react.dev/) with [TypeScript 6.0](https://www.typescriptlang.org/)
* **Build Tool**: [Vite 8.3](https://vitejs.dev/)
* **Styling & Theme**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite` plugin
* **UI Components & Icons**: [Lucide React](https://lucide.react.dev/) (`lucide-react`)
* **Visual Effects**: [Canvas Confetti](https://github.com/catdad/canvas-confetti)
* **Open AI SDK**: [`@huggingface/inference`](https://github.com/huggingface/huggingface.js)
* **Linter**: [Oxlint](https://oxc-project.github.io/) (`oxlint`)
* **Browser APIs**: Web Audio API (procedural audio synthesis), Web Speech API (speech synthesis), LocalStorage API.

### Backend Architecture (Optional)
* **Language**: Python 3.10+
* **Framework**: [FastAPI 0.100+](https://fastapi.tiangolo.com/)
* **ASGI Server**: [Uvicorn 0.22+](https://www.uvicorn.org/)
* **Data Validation**: [Pydantic 2.0+](https://docs.pydantic.dev/)

---

## 📁 Project Structure

```
TouchGrass/
├── .env.example                # Template for optional API keys & endpoint URLs
├── .gitignore                  # Git ignore rules for dependencies & secrets
├── .oxlintrc.json              # Oxlint code linter configuration
├── index.html                  # HTML entry point with meta tags & Google Fonts
├── package.json                # Frontend dependencies & npm scripts
├── README.md                   # Project documentation & hackathon submission details
├── requirements.txt            # Python dependencies for backend proxy
├── tsconfig.json               # TypeScript base configuration
├── vite.config.ts              # Vite configuration with Tailwind v4 plugin
├── backend/                    # Python FastAPI backend service
│   ├── app.py                  # FastAPI REST API endpoints & CORS middleware
│   └── requirements.txt        # Backend-specific Python requirements
├── public/                     # Static public web assets
└── src/                        # Frontend React source code
    ├── App.css                 # Custom CSS animations & utilities
    ├── App.tsx                 # Main application state & tab orchestration
    ├── index.css               # Global styles & Tailwind CSS imports
    ├── main.tsx                # React DOM render entry point
    ├── components/             # UI React Components
    │   ├── AIResultCard.tsx              # Multimodal AI analysis view & TTS reader
    │   ├── LandingPage.tsx               # Hero banner, feature highlights & CTA
    │   ├── MissionView.tsx               # Mission selector & sample presets
    │   ├── Navbar.tsx                    # Header navigation & XP display
    │   ├── OpenModelInspectorModal.tsx   # AI provider configuration modal
    │   ├── PhotoUploadModal.tsx          # Camera/file dropzone & preview modal
    │   ├── PocketModeModal.tsx           # Screen-free timer & Web Audio synth
    │   └── ProgressView.tsx              # User progress, badges & Nature Journal
    ├── data/                   # Application Datasets
    │   └── missions.ts         # Outdoor missions list, badges & sample images
    ├── services/               # AI Inference Engine
    │   └── aiInference.ts      # Strategy handler for Open AI models (Browser/Groq/HF/Ollama/FastAPI)
    ├── types/                  # TypeScript Interfaces
    │   └── index.ts            # Type definitions for missions, progress & AI results
    └── utils/                  # Helper Utilities
        └── storage.ts          # LocalStorage persistence for user progress & journal
```

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher
* **Python**: v3.10 or higher *(Optional: only needed if running the Python FastAPI backend)*

---

### Step 1: Install & Run Frontend

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/TouchGrass.git
   cd TouchGrass
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Start the Vite development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:5173`. 
   
   > 💡 **Note**: The application works immediately out-of-the-box using the **Browser-Local Open Model**. No API keys or backend servers are required to test!

---

### Step 2: (Optional) Run Python FastAPI Open Backend (With Groq Llama 3.2 Vision)

If you want to run the Python FastAPI backend proxy with Groq vision support:

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Set the Groq API key in your environment**:
   * On Linux/macOS:
     ```bash
     export GROQ_API_KEY="gsk_your_groq_api_key_here"
     ```
   * On Windows (PowerShell):
     ```powershell
     $env:GROQ_API_KEY="gsk_your_groq_api_key_here"
     ```
   * On Windows (CMD):
     ```cmd
     set GROQ_API_KEY=gsk_your_groq_api_key_here
     ```

4. **Start the FastAPI server**:
   ```bash
   python app.py
   ```
   *or using uvicorn directly:*
   ```bash
   uvicorn app:app --reload --port 8000
   ```

5. **Verify backend status**:
   Open `http://localhost:8000` in your browser. If `GROQ_API_KEY` is set, you will see `"groq_configured": true` and `"groq_model": "qwen/qwen3.8-27b"`.

6. **Connect frontend to Groq API / FastAPI**:
   In the NatureBuddy AI app, click **"Open AI Spec"** in the top navbar, select **"⚡ Groq Llama 3.2 Vision"** (or **"FastAPI Open Backend"**), and click **Save Open Model Settings**!

---

## ⚙️ Configuration & Optional API Providers

NatureBuddy AI requires **zero setup** by default, running the **BLIP / ViT Browser-Local Open Model** out-of-the-box. However, if you wish to configure external open model API keys:

1. **Backend Environment Variables (Recommended for Groq)**:
   Keep `GROQ_API_KEY` in the Python backend server environment (`GROQ_API_KEY=gsk_...`). The backend proxies vision requests to Groq using Meta's `qwen/qwen3.8-27b` model without exposing secrets to frontend code or browser storage.

2. **Frontend Environment (.env)**:
   Copy `.env.example` to `.env` in the root directory:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` for optional frontend API options:
   ```env
   # Hugging Face Serverless API (Qwen2-VL-7B-Instruct)
   VITE_HF_API_KEY=hf_your_huggingface_token_here

   # Local Ollama URL (Default: http://localhost:11434)
   VITE_OLLAMA_URL=http://localhost:11434

   # Python FastAPI Backend URL (Default: http://localhost:8000)
   VITE_FASTAPI_URL=http://localhost:8000
   ```

3. **Dynamic In-App Setup**:
   API keys and endpoint URLs can also be inspected live within the web app via the **Open AI Spec** modal (`Navbar -> Open AI Spec`). If an API provider fails or is unconfigured, the app gracefully falls back to the browser-local open model engine.

---

## 🔒 Security & Privacy

* **Zero Hardcoded Secrets**: No API keys or tokens are stored in source code.
* **Environment Protection**: `.env` is included in `.gitignore`.
* **Private Local Storage**: Dynamic user keys entered via UI reside strictly in local browser storage.
* **Privacy-First Inference**: Browser-local and Ollama execution modes ensure zero photo data leaves the user's machine.

---

## 📜 Available Scripts

In the project root, you can run:

* `npm run dev` – Runs Vite local development server with HMR.
* `npm run build` – Type-checks TypeScript code (`tsc -b`) and builds production assets into `dist/`.
* `npm run preview` – Locally previews the production build.
* `npm run lint` – Runs `oxlint` for high-speed JavaScript/TypeScript linting.

---

## 🤝 Contributing

Contributions are welcome for Hacktoberfest!
1. Fork the Repository.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is open-source and distributed under the **MIT License**. See `LICENSE` for details.

---

<p align="center">
  <i>Created with 🌿 for Hacktoberfest Open-Source AI Challenge: "Touch Grass"</i>
</p>
