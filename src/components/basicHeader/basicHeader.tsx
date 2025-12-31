import React from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "./basicHeader.styles";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type BasicHeaderProps = {
  headerText: string;
  icon?: string;
  onRightPress?: () => void;
};

export default function BasicHeader({
  headerText,
  icon,
  onRightPress,
}: BasicHeaderProps) {
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/(tabs)/home");
  };

  return (
    <View style={[styles.headerTop, { top: insets.top + 6 }]}>
      <Pressable onPress={handleBack} style={styles.iconBtn} hitSlop={10}>
        <Text style={styles.iconText}>←</Text>
      </Pressable>

      

      <Text style={styles.headerTitle}>{headerText}</Text>
      
      {icon  ?
      
      <Pressable
        onPress={onRightPress ?? (() => {})} 
        style={styles.iconBtn}
        hitSlop={10}
      >
        <Text style={styles.iconText}>{icon}</Text>
      </Pressable>
      :<Pressable><Text>         </Text></Pressable>
      }

    </View>
  );
}
