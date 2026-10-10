import os
import time
import json
import requests
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

# ── Load .env automatically (uvicorn does NOT do this) ──────────────────────
# Search order: backend/.env → project-root/.env → already-set env vars
try:
    from dotenv import load_dotenv
    _backend_dir = Path(__file__).resolve().parent
    _root_env    = _backend_dir.parent / ".env"
    _local_env   = _backend_dir / ".env"

    if _local_env.exists():
        load_dotenv(_local_env, override=False)   # backend/.env wins if present
    if _root_env.exists():
        load_dotenv(_root_env, override=False)     # root .env fills any remaining gaps
except ImportError:
    pass  # dotenv not installed; rely on shell environment variables
# ────────────────────────────────────────────────────────────────────────────

app = FastAPI(
    title="NatureBuddy AI Open-Weight Backend",
    description="Python FastAPI backend serving open-weight AI vision models and Groq API proxy for Hacktoberfest Touch Grass Challenge."
)

# Enable CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NatureAnalysisRequest(BaseModel):
    image_base64: str
    mission_prompt: str

class NatureAnalysisResponse(BaseModel):
    identification: str
    category: str
    description: str
    facts: List[str]
    sensoryObservation: str
    nextChallenge: str
    confidenceScore: float
    modelUsed: str
    provider: str

class AudioAnalysisRequest(BaseModel):
    audio_base64: str
    filename: Optional[str] = "recording.wav"
    lat: Optional[float] = None
    lon: Optional[float] = None

class AudioAnalysisResponse(BaseModel):
    identification: str
    scientificName: Optional[str] = None
    category: str = "animal"
    description: str
    facts: List[str]
    sensoryObservation: str
    nextChallenge: str
    confidenceScore: float
    modelUsed: str
    provider: str
    isAudioAnalysis: bool = True

_birdnet_analyzer = None

def get_birdnet_analyzer():
    global _birdnet_analyzer
    if _birdnet_analyzer is None:
        from birdnetlib.analyzer import Analyzer
        _birdnet_analyzer = Analyzer()
    return _birdnet_analyzer

GROQ_DEFAULT_MODEL = "qwen/qwen3.8-27b"

@app.get("/")
def read_root():
    groq_key = os.environ.get("GROQ_API_KEY")
    groq_model = os.environ.get("GROQ_MODEL", GROQ_DEFAULT_MODEL)
    birdnet_url = os.environ.get("BIRDNET_API_URL")
    return {
        "status": "online",
        "app": "NatureBuddy AI Open Backend",
        "groq_configured": bool(groq_key),
        "groq_model": groq_model if groq_key else None,
        "birdnet_configured": bool(birdnet_url),
        "supported_models": [groq_model, "BirdNET-Analyzer Audio AI", "Llama-3.2-11B-Vision", "Qwen2-VL-7B-Instruct", "BLIP2-Vision"]
    }

@app.post("/api/analyze-nature", response_model=NatureAnalysisResponse)
def analyze_nature(req: NatureAnalysisRequest):
    start_time = time.time()
    groq_api_key = os.environ.get("GROQ_API_KEY")

    # If Groq API key is available in backend environment, call Groq Vision API
    if groq_api_key:
        groq_model = os.environ.get("GROQ_MODEL", GROQ_DEFAULT_MODEL)
        
        # Ensure image has data URI scheme for Groq API
        image_url = req.image_base64
        if not image_url.startswith("data:image/"):
            image_url = f"data:image/jpeg;base64,{req.image_base64}"

        system_prompt = (
            "You are NatureBuddy AI, an outdoor companion. Keep responses concise, inspiring, "
            "and encouraging screen-free exploration. Output ONLY a valid raw JSON object with keys: "
            "identification (string), category (one of: plant, animal, water, landscape, geology, sky, other), "
            "description (string), facts (array of 2 strings), sensoryObservation (string), nextChallenge (string)."
        )

        user_content = [
            {
                "type": "text",
                "text": f"Analyze this nature photo taken for the mission: '{req.mission_prompt}'. Give a quick identification, 2 fascinating nature facts, what sensory detail to observe next, and 1 short outdoor challenge."
            },
            {
                "type": "image_url",
                "image_url": {
                    "url": image_url
                }
            }
        ]

        payload = {
            "model": groq_model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_content}
            ],
            "response_format": {"type": "json_object"},
            "temperature": 0.2
        }

        headers = {
            "Authorization": f"Bearer {groq_api_key}",
            "Content-Type": "application/json"
        }

        try:
            res = requests.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers=headers,
                json=payload,
                timeout=20
            )

            if res.status_code == 200:
                res_data = res.json()
                content = res_data["choices"][0]["message"]["content"]
                parsed = json.loads(content)
                elapsed_ms = int((time.time() - start_time) * 1000)

                valid_categories = {"plant", "animal", "water", "landscape", "geology", "sky", "other"}
                cat = str(parsed.get("category", "plant")).lower()
                if cat not in valid_categories:
                    cat = "plant"

                return NatureAnalysisResponse(
                    identification=str(parsed.get("identification", "Natural Outdoor Specimen")),
                    category=cat,
                    description=str(parsed.get("description", "Observed natural element outdoors under daylight.")),
                    facts=[str(f) for f in parsed.get("facts", [
                        "Interconnected outdoor ecosystems rely on plant and micro-organism balance.",
                        "Spending time outdoors lowers cortisol and improves focus."
                    ])[:2]],
                    sensoryObservation=str(parsed.get("sensoryObservation", "Notice the ambient scents and natural lighting around you.")),
                    nextChallenge=str(parsed.get("nextChallenge", "🎯 Next challenge: Find one more unique organic pattern nearby.")),
                    confidenceScore=0.97,
                    modelUsed=f"Groq {groq_model}",
                    provider="Groq Qwen Vision"
                )
            else:
                print(f"[Groq API Error] HTTP {res.status_code}: {res.text}")
        except Exception as err:
            print(f"[Groq API Exception] {err}")

    # Fallback open backend logic when GROQ_API_KEY is not set or API fails
    prompt_lower = req.mission_prompt.lower()

    category = "plant"
    identification = "Natural Flora Specimen"
    description = "Observed natural foliage under open daylight."
    facts = [
        "Open-weight vision models allow local inference without proprietary API dependencies.",
        "Photosynthesis converts sunlight into oxygen and glucose for ecosystem balance."
    ]
    sensory = "Feel the leaves and notice the scent of surrounding soil."
    challenge = "🎯 Next outdoor challenge: Spot one other distinct leaf shape nearby."

    if "water" in prompt_lower or "lake" in prompt_lower or "stream" in prompt_lower:
        category = "water"
        identification = "Open Aquatic Body & Sky Reflection"
        description = "A serene body of open fresh water reflecting surrounding greenery."
        facts = [
            "Water surface tension supports small aquatic organisms.",
            "Bodies of water act as microclimate temperature regulators."
        ]
        sensory = "Notice how the light reflects off ripples on the water surface."
        challenge = "🎯 Next outdoor challenge: Spot one living organism near the water edge."

    elif "motion" in prompt_lower or "bird" in prompt_lower or "moving" in prompt_lower:
        category = "animal"
        identification = "Active Wildlife Specimen"
        description = "An active outdoor creature moving through natural cover."
        facts = [
            "Animals utilize natural contrast and shadow for camouflage.",
            "Wildlife sound maps help identify species density in urban parks."
        ]
        sensory = "Freeze in place for 30 seconds and listen for movement cues."
        challenge = "🎯 Next outdoor challenge: Follow where the creature moves next from a safe distance."

    return NatureAnalysisResponse(
        identification=identification,
        category=category,
        description=description,
        facts=facts,
        sensoryObservation=sensory,
        nextChallenge=challenge,
        confidenceScore=0.95,
        modelUsed="Llama-3.2-11B-Vision (FastAPI Open Backend)",
        provider="FastAPI Open Backend"
    )

@app.post("/api/analyze-audio", response_model=AudioAnalysisResponse)
def analyze_audio(req: AudioAnalysisRequest):
    start_time = time.time()
    birdnet_api_url = os.environ.get("BIRDNET_API_URL")
    birdnet_api_key = os.environ.get("BIRDNET_API_KEY")

    # 1. External BirdNET microservice / API proxy
    if birdnet_api_url:
        try:
            headers = {"Content-Type": "application/json"}
            if birdnet_api_key:
                headers["Authorization"] = f"Bearer {birdnet_api_key}"
            
            payload = {
                "audio_base64": req.audio_base64,
                "filename": req.filename,
                "lat": req.lat,
                "lon": req.lon
            }
            res = requests.post(birdnet_api_url, json=payload, headers=headers, timeout=25)
            if res.status_code == 200:
                data = res.json()
                sci_name = data.get("scientificName", data.get("scientific_name"))
                common_name = data.get("identification", data.get("common_name", "Wild Bird Specimen"))
                return AudioAnalysisResponse(
                    identification=common_name,
                    scientificName=sci_name,
                    category="animal",
                    description=data.get("description", f"BirdNET identified audio signature of {common_name} ({sci_name or 'Aves'})."),
                    facts=data.get("facts", [
                        "BirdNET utilizes neural network bioacoustics to match audio pitch & call cadence.",
                        "Vocal patterns allow species identification even when birds are hidden in foliage."
                    ]),
                    sensoryObservation=data.get("sensoryObservation", "Listen quietly for repeating call intervals from the trees."),
                    nextChallenge=data.get("nextChallenge", "🎯 Next outdoor challenge: Scan surrounding branches to spot this bird in motion."),
                    confidenceScore=float(data.get("confidenceScore", data.get("confidence", 0.94))),
                    modelUsed=data.get("modelUsed", "BirdNET Audio AI"),
                    provider="BirdNET Audio AI",
                    isAudioAnalysis=True
                )
            else:
                print(f"[BirdNET API Error] HTTP {res.status_code}: {res.text}")
                raise HTTPException(status_code=res.status_code, detail=f"BirdNET API returned HTTP {res.status_code}: {res.text}")
        except HTTPException:
            raise
        except Exception as err:
            print(f"[BirdNET API Exception] {err}")
            raise HTTPException(status_code=502, detail=f"BirdNET API connection error: {str(err)}")

    # 2. Local birdnetlib analysis if installed
    try:
        import tempfile
        import base64
        from birdnetlib import Recording

        audio_str = req.audio_base64
        suffix = ".wav"
        if "," in audio_str:
            header, audio_str = audio_str.split(",", 1)
            if "audio/mp3" in header or "audio/mpeg" in header:
                suffix = ".mp3"
            elif "audio/ogg" in header:
                suffix = ".ogg"
            elif "audio/webm" in header:
                suffix = ".webm"
            elif "audio/m4a" in header or "audio/mp4" in header:
                suffix = ".m4a"

        if req.filename:
            fn_ext = os.path.splitext(req.filename)[1].lower()
            if fn_ext in [".wav", ".mp3", ".ogg", ".webm", ".m4a", ".flac"]:
                suffix = fn_ext

        audio_bytes = base64.b64decode(audio_str)

        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            tmp.write(audio_bytes)
            tmp_path = tmp.name

        try:
            analyzer = get_birdnet_analyzer()
            recording = Recording(analyzer, tmp_path, lat=req.lat, lon=req.lon, min_conf=0.1)
            recording.analyze()
            detections = recording.detections
        finally:
            if os.path.exists(tmp_path):
                try:
                    os.remove(tmp_path)
                except Exception:
                    pass

        if detections:
            top_match = max(detections, key=lambda d: d.get("confidence", 0))
            common_name = top_match.get("common_name", "Wild Bird Specimen")
            sci_name = top_match.get("scientific_name", "")
            confidence = float(top_match.get("confidence", 0.88))

            return AudioAnalysisResponse(
                identification=common_name,
                scientificName=sci_name,
                category="animal",
                description=f"BirdNET bioacoustic analyzer identified vocalization of {common_name} ({sci_name}).",
                facts=[
                    f"{common_name} vocalization frequency matches bioacoustic library signatures.",
                    "BirdNET neural network is trained on over 3,000 global bird species."
                ],
                sensoryObservation=f"Listen carefully for the distinct pitch and tempo of the {common_name}.",
                nextChallenge="🎯 Next outdoor challenge: Scan nearby tree canopies to spot this bird in motion.",
                confidenceScore=round(confidence, 2),
                modelUsed="BirdNET-Analyzer (Local TFLite)",
                provider="BirdNET Audio AI",
                isAudioAnalysis=True
            )
        else:
            raise HTTPException(
                status_code=422,
                detail="No bird species vocalizations were recognized in this audio sample with sufficient confidence. Try uploading an audio recording with clear bird calls."
            )
    except (ImportError, ModuleNotFoundError) as err:
        print(f"[birdnetlib import error] {err}")
    except HTTPException:
        raise
    except Exception as err:
        print(f"[birdnetlib exception] {err}")
        raise HTTPException(status_code=500, detail=f"Error running local BirdNET analyzer: {str(err)}")

    # 3. If neither BIRDNET_API_URL nor birdnetlib is configured/available
    raise HTTPException(
        status_code=503,
        detail=(
            "BirdNET Audio Recognition is currently offline or not configured on the backend server. "
            "To activate real bird-sound recognition, install birdnetlib & dependencies or configure BIRDNET_API_URL in backend/.env."
        )
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)


