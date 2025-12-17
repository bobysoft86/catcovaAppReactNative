import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BG = "#0B1713";
const BAR_BG = "rgba(255,255,255,0.06)";
const BORDER = "rgba(255,255,255,0.12)";
const ACTIVE = "#22C55E";
const INACTIVE = "rgba(234,242,238,0.35)";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  console.log("CustomTabBar state:", state);
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

              {/* <View>
                (route.name === "Home" ? "🏠" : route.name)
                <h3 style={styles.text}>

                </h3>


              </View> */}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  pill: {
    width: "88%",
    maxWidth: 420,
    height: 66,
    borderRadius: 999,
    backgroundColor: BAR_BG,
    borderWidth: 1,
    borderColor: BORDER,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,

    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },

  dotWrap: {
    width: 54,
    height: 54,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  dotWrapActive: {
    backgroundColor: ACTIVE,
  },
  dotWrapInactive: {
    backgroundColor: "transparent",
  },

  text:{
    color: "white",
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 999,
  },
  dotActive: {
    backgroundColor: BG, // círculo oscuro dentro del verde (como tu mock)
  },
  dotInactive: {
    backgroundColor: INACTIVE, // círculo gris claro
  },
});