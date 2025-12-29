import "react-native-reanimated";
import "react-native-get-random-values";

import { Buffer } from "buffer";
global.Buffer = global.Buffer || Buffer;

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MatrixProvider } from "@/src/matrix/matrixProvider";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (

      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(noNabvar)" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>

  );
}
