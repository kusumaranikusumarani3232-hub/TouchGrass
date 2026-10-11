/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FASTAPI_URL?: string;
  readonly VITE_HF_API_KEY?: string;
  readonly VITE_OLLAMA_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
