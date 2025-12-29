import React, { createContext, useContext, useEffect, useState } from "react";
import { createMatrixClient } from "./matrixClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMatrixData } from "../storage/authStorage";
import { MATRIX_SERVER_BASE_URL } from "../config/api";
import { getPathWithConventionsCollapsed } from "expo-router/build/fork/getPathFromState-forks";


const MatrixContext = createContext<{ client: any | null }>({ client: null });


export function MatrixProvider({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<any>(null);


  useEffect(() => {
    const initializeClient = async () => {
      console.log("🔌 Initializing Matrix client...");

      const matrixData = await getMatrixData()
      console.log(MATRIX_SERVER_BASE_URL)

      const mx = createMatrixClient({
        baseUrl: MATRIX_SERVER_BASE_URL,
        accessToken: matrixData?.matrixAccessToken,
        userId: matrixData?.matrixUserId,
      });

      (mx as any).on("sync", (state: string) => {
        console.log("🔄 Matrix sync:", state);
      });

      mx.startClient({ initialSyncLimit: 10 });
      setClient(mx);
    };

    initializeClient();

    return () => {
      try {
        client?.stopClient();
      } catch {}
    };
  }, []);

  return (
    <MatrixContext.Provider value={{ client }}>{children}</MatrixContext.Provider>
  );
}

export const useMatrix = () => useContext(MatrixContext);