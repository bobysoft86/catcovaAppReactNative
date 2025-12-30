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
import { styles } from "./EditNameModal.styles";

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
export { BG, CARD, BORDER, TEXT, MUTED, GREEN } from "./EditNameModal.styles";
