import React from "react";
import { View, Pressable } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./CustomBar.styles";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
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
              <View style={[styles.dot, isFocused ? styles.dotActive : styles.dotInactive]} />
{/*
              <View>
                (route.name === "Home" ? "🏠" : route.name)
                <h3 style={styles.text}>

                </h3>

              </View>
 */}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
