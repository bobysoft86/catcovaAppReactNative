import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { colors } from "@/src/theme/colors";

type Props = {
  visible: boolean;
  initialName: string;
  onClose: () => void;
  onSave: (newName: string) => Promise<void> | void;
  loading?: boolean;
};

export default function EditNameModal({
  visible,
  initialName,
  onClose,
  onSave,
  loading = false,
}: Props) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    // cada vez que se abre, resetea el valor
    if (visible) setName(initialName);
  }, [visible, initialName]);

  const canSave = name.trim().length >= 2 && name.trim() !== initialName.trim();

  const handleSave = async () => {
    const cleaned = name.trim();
    if (cleaned.length < 2) {
      Alert.alert("Nombre inválido", "Debe tener al menos 2 caracteres.");
      return;
    }
    await onSave(cleaned);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.wrapper}
      >
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Editar nombre</Text>
            <Pressable onPress={onClose} hitSlop={10}>
              <Text style={styles.close}>✕</Text>
            </Pressable>
          </View>

          <Text style={styles.label}>Nombre</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Tu nombre"
            placeholderTextColor="rgba(234,242,238,0.45)"
            style={styles.input}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="done"
          />

          <View style={styles.actions}>
            <Pressable onPress={onClose} style={styles.btnSecondary} disabled={loading}>
              <Text style={styles.btnSecondaryText}>Cancelar</Text>
            </Pressable>

            <Pressable
              onPress={handleSave}
              style={[styles.btnPrimary, (!canSave || loading) && { opacity: 0.6 }]}
              disabled={!canSave || loading}
            >
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.btnPrimaryText}>Guardar</Text>
              )}
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export const BG = colors.background;
export const CARD = colors.card;
export const BORDER = colors.border;
export const TEXT = colors.text;
export const MUTED = colors.muted;
export const GREEN = colors.primary;

const styles = {
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
    backgroundColor: BG,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  header: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    paddingBottom: 10,
  },
  title: { color: TEXT, fontSize: 16, fontWeight: "900" as const },
  close: { color: MUTED, fontSize: 18, fontWeight: "900" as const },

  label: { color: MUTED, fontSize: 12, fontWeight: "700" as const, marginTop: 6 },
  input: {
    marginTop: 6,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: TEXT,
    fontSize: 14,
    fontWeight: "700" as const,
  },

  actions: {
    flexDirection: "row" as const,
    gap: 12,
    marginTop: 14,
  },
  btnSecondary: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: "center" as const,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: CARD,
  },
  btnSecondaryText: { color: TEXT, fontSize: 14, fontWeight: "900" as const },

  btnPrimary: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: "center" as const,
    backgroundColor: GREEN,
  },
  btnPrimaryText: { color: "#052B1C", fontSize: 14, fontWeight: "900" as const },
};