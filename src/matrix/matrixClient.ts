import { Platform } from "react-native";

// Importante: usamos require condicional para que NO se evalúen dos entrypoints.
export function createMatrixClient(options: any) {
  if (Platform.OS === "web") {
    const { createClient } = require("matrix-js-sdk/lib/browser-index.js");
    return createClient(options);
  }

  // iOS/Android
  const { createClient } = require("matrix-js-sdk");
  return createClient(options);
}