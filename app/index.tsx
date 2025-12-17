import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { getToken } from "@/src/storage/authStorage"; // ajusta import

export default function Index() {
  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (token) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/(auth)");
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
}
