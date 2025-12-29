import { MatrixProvider } from "@/src/matrix/matrixProvider";
import CustomTabBar from "@/src/navigation/CustomBar";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (

    <MatrixProvider>

    <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home/index" />
      <Tabs.Screen name="games/index" />
      <Tabs.Screen name="chat/index" />
      <Tabs.Screen name="profile/index" />
      {/* Ocultar rutas que no quieras como tab */}
      <Tabs.Screen name="posts" options={{ href: null }} />
    </Tabs>
    </MatrixProvider>
  );
}
