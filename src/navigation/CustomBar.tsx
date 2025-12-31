import React from "react";
import { View, Pressable } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./CustomBar.styles";
import { Text } from "@react-navigation/elements";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

function getRouteName(direction: string) {
  const base = direction.split("/").filter(Boolean)[0] ?? "";
  const routeLabels: Record<string, string> = {
    home: "Inicio",
    games: "Juegos",
    chat: "Chats",
    profile: "Perfil",
  };
  return routeLabels[base] ?? base.toUpperCase();
}

  return (
    <View style={[styles.root, { paddingBottom: Math.max(insets.bottom, 10) }]} pointerEvents="box-none">
      <View style={styles.pill} pointerEvents="auto">
        {state.routes.map((route, index) => {

          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={[styles.dotWrap, isFocused ? styles.dotWrapActive : styles.dotWrapInactive]}
              hitSlop={12}
            >

              <Text style={[styles.text, isFocused ? styles.textActive : styles.textInactive]}>{getRouteName(route.name)}</Text>

            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
