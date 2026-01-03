const rawApiUrl = process.env.EXPO_PUBLIC_API_URL;
const rawMatrixUrl = process.env.EXPO_PUBLIC_MATRIX_SERVER_BASE_URL;

// Guard against stale bundles pointing at localhost in release builds.
const isLocalhost = (value?: string) => !!value && value.includes("localhost");

export const API_BASE_URL =
  !__DEV__ && isLocalhost(rawApiUrl)
    ? "http://i0kswcoogow4oo4okwg4g0s4.88.1.200.105.sslip.io/"
    : rawApiUrl;

export const MATRIX_SERVER_BASE_URL =
  !__DEV__ && isLocalhost(rawMatrixUrl)
    ? "http://matrix-akgs8gck4ggko48c0kwos48c.88.1.200.105.sslip.io"
    : rawMatrixUrl;
