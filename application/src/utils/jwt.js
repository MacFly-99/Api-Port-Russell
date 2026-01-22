export function decodeJWT(token) {
  if (!token || typeof token !== 'string') return null;

  try {
    // Sépare le token en 3 parties
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // Prend la partie payload (2ème partie)
    const base64Url = parts[1];

    // Convertit base64url
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    // Décodage base64
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error('Erreur lors du décodage du JWT:', err);
    return null;
  }
}