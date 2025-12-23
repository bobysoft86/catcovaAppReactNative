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

const sheetStyles = {
  backdrop: {
    position: "absolute" as const,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  wrapper: {
    flex: 1,
    justifyContent: "flex-end" as const,
  },
  sheet: {
    backgroundColor: "#0B1713",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    paddingHorizontal: 16,
    paddingTop: 14,
    maxHeight: "75%" as const,
  },
  header: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    paddingBottom: 10,
  },
  title: { color: "#EAF2EE", fontSize: 16, fontWeight: "900" as const },
  close: { color: "rgba(234,242,238,0.75)", fontSize: 18, fontWeight: "900" as const },

  searchWrap: {
    height: 44,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    flexDirection: "row" as const,
    alignItems: "center" as const,
    paddingHorizontal: 12,
    gap: 10,
    marginBottom: 12,
  },
  searchIcon: { color: "rgba(234,242,238,0.65)" as const },
  searchInput: { flex: 1, color: "#EAF2EE", fontSize: 14, fontWeight: "700" as const },

  item: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    backgroundColor: "rgba(255,255,255,0.04)",
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    marginBottom: 10,
  },
  itemActive: {
    borderColor: "rgba(34,197,94,0.45)",
    backgroundColor: "rgba(34,197,94,0.10)",
  },
  itemLabel: { color: "rgba(234,242,238,0.85)", fontSize: 14, fontWeight: "800" as const },
  itemSub: { color: "rgba(234,242,238,0.55)", fontSize: 12, fontWeight: "600" as const },
  check: { color: "#22C55E", fontSize: 16, fontWeight: "900" as const },
};
