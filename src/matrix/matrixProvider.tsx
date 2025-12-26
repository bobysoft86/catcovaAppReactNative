import React, { createContext, useContext, useEffect, useState } from "react";
import { createMatrixClient } from "./matrixClient";

const MatrixContext = createContext<{ client: any | null }>({ client: null });

export function MatrixProvider({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    console.log("🔌 Initializing Matrix client...");

    const mx = createMatrixClient({
      baseUrl: "http://localhost:8008",
      accessToken: "syt_dXNlcjE_vHxgYkugOpImvSiABZCN_2an2PE",
      userId: "@user1:localhost",
    });

    (mx as any).on("sync", (state: string) => {
      console.log("🔄 Matrix sync:", state);
    });

    mx.startClient({ initialSyncLimit: 10 });
    setClient(mx);

    return () => {
      try {
        mx.stopClient();
      } catch {}
    };
  }, []);

  return <MatrixContext.Provider value={{ client }}>{children}</MatrixContext.Provider>;
}

export const useMatrix = () => useContext(MatrixContext);