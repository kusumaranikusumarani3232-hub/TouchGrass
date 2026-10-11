/**
 * Utility to resolve the Python FastAPI backend URL.
 *
 * In production (Vercel deployment):
 *   Uses `import.meta.env.VITE_FASTAPI_URL` if configured.
 *   Safely falls back to `https://touchgrass-g7bd.onrender.com`.
 *
 * In local development:
 *   Uses `import.meta.env.VITE_FASTAPI_URL` if configured.
 *   Falls back to `http://localhost:8000`.
 */

export const PRODUCTION_FASTAPI_URL = 'https://touchgrass-g7bd.onrender.com';
export const LOCAL_FASTAPI_URL = 'http://localhost:8000';

export function getFastApiUrl(configuredUrl?: string): string {
  // If a custom URL is configured and we're not running into a stale localhost in production:
  if (configuredUrl) {
    const isLocalhost =
      configuredUrl.includes('localhost') ||
      configuredUrl.includes('127.0.0.1');

    // Only allow localhost in development mode
    if (!isLocalhost || import.meta.env.DEV) {
      return configuredUrl.replace(/\/+$/, '');
    }
  }

  // Check Vite environment variable VITE_FASTAPI_URL
  const envUrl = import.meta.env.VITE_FASTAPI_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/+$/, '');
  }

  // Safe fallback based on environment
  const fallback = import.meta.env.DEV ? LOCAL_FASTAPI_URL : PRODUCTION_FASTAPI_URL;
  return fallback.replace(/\/+$/, '');
}
