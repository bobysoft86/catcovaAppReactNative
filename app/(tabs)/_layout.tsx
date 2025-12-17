import CustomTabBar from "@/src/navigation/CustomBar";
import { Tabs } from "expo-router";


export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
    </Tabs>
  );
}