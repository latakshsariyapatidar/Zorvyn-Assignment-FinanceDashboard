export function loadStoredValue(key, fallback) {
  if (typeof window === 'undefined') {
    return fallback
  }

  const raw = window.localStorage.getItem(key)
  return raw ?? fallback
}
