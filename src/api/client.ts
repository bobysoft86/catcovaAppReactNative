// src/api/client.ts
import axios from "axios";
import { API_BASE_URL } from "@/src/config/api";
import { getToken } from "@/src/storage/authStorage";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// ✅ REQUEST: token + log
api.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    config.headers = config.headers ?? {};
    if (token) config.headers.Authorization = `Bearer ${token}`;

    // 🔎 LOG (muy útil)
    const fullUrl = `${config.baseURL ?? ""}${config.url ?? ""}`;
    // console.log("➡️ AXIOS", (config.method || "GET").toUpperCase(), fullUrl);

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ RESPONSE: log ok + log error con URL final
api.interceptors.response.use(
  (res) => {
    // console.log("✅ AXIOS", res.status, `${res.config.baseURL ?? ""}${res.config.url ?? ""}`);
    return res;
  },
  (error) => {
    const cfg = error.config || {};
    const fullUrl = `${cfg.baseURL ?? ""}${cfg.url ?? ""}`;

    // console.log("❌ AXIOS ERROR:", error.message);
    // console.log("   URL:", fullUrl);
    // console.log("   METHOD:", (cfg.method || "GET").toUpperCase());
    // console.log("   TIMEOUT:", cfg.timeout);
    // console.log("   HAS_TOKEN:", !!cfg.headers?.Authorization);

    return Promise.reject(error);
  }
);

export default api;