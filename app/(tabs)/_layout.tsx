import CustomTabBar from "@/src/navigation/CustomBar";
import { Tabs } from "expo-router";


export default function TabsLayout() {
  
  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      console.log(props)
      <Tabs.Screen name="home" />
      <Tabs.Screen name="games" />
      <Tabs.Screen name="chat" />
      <Tabs.Screen name="profile" />
      {/* Ocultar rutas que no quieras como tab */}
      <Tabs.Screen name="posts" options={{ href: null }} />
    </Tabs>
  );
}