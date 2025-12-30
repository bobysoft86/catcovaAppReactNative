// src/components/AppCard.tsx
import React, { ReactNode } from "react";
import { View, Text, ViewStyle } from "react-native";
import { styles } from "./appCard.styles";

interface AppCardProps {
  title?: string;
  subtitle?: string;
  style?: ViewStyle;
  children?: ReactNode;
}

export default function AppCard({ title, subtitle, style, children }: AppCardProps) {
  return (
    <View style={[styles.card, style]}>
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      {children}
    </View>
  );
}
