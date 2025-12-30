import React, { useMemo, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { sheetStyles } from "./selectSheet.styles";

type Option<T extends string | number> = {
  value: T;
  label: string;
  subtitle?: string;
};

type Props<T extends string | number> = {
  visible: boolean;
  title: string;
  options: Option<T>[];
  selected?: T | number[] | null;
  onClose: () => void;
  onSelect: (value: T) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
};

export default function SelectSheet<T extends string | number>({
  visible,
  title,
  options,
  selected,
  onClose,
  onSelect,
  searchable = true,
  searchPlaceholder = "Buscar...",
}: Props<T>) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return options;
    return options.filter((o) => {
      const a = o.label.toLowerCase();
      const b = (o.subtitle ?? "").toLowerCase();
      return a.includes(qq) || b.includes(qq);
    });
  }, [q, options]);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable onPress={onClose} style={sheetStyles.backdrop} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={sheetStyles.wrapper}
      >
        <View style={sheetStyles.sheet}>
          <View style={sheetStyles.header}>
            <Text style={sheetStyles.title}>{title}</Text>
            <Pressable onPress={onClose} hitSlop={10}>
              <Text style={sheetStyles.close}>✕</Text>
            </Pressable>
          </View>

          {searchable && (
            <View style={sheetStyles.searchWrap}>
              <Text style={sheetStyles.searchIcon}>🔎</Text>
              <TextInput
                value={q}
                onChangeText={setQ}
                placeholder={searchPlaceholder}
                placeholderTextColor="rgba(234,242,238,0.45)"
                style={sheetStyles.searchInput}
              />
            </View>
          )}

          <FlatList
            data={filtered}
            keyExtractor={(item) => String(item.value)}
            keyboardShouldPersistTaps="handled"
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 18 }}
            renderItem={({ item }) => {
              const active = Array.isArray(selected)
                ? selected.includes(item.value)
                : selected === item.value;
              return (
                <Pressable
                  onPress={() => {
                    onSelect(item.value);
                    setQ("");
                    onClose();
                  }}
                  style={[sheetStyles.item, active && sheetStyles.itemActive]}
                >
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text style={[sheetStyles.itemLabel, active && { color: "#EAF2EE" }]}>
                      {item.label}
                    </Text>
                    {!!item.subtitle && (
                      <Text style={sheetStyles.itemSub}>{item.subtitle}</Text>
                    )}
                  </View>
                  {active && <Text style={sheetStyles.check}>✓</Text>}
                </Pressable>
              );
            }}
            ListEmptyComponent={
              <View style={{ paddingVertical: 18 }}>
                <Text style={{ color: "rgba(234,242,238,0.65)", textAlign: "center" }}>
                  No hay resultados
                </Text>
              </View>
            }
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
