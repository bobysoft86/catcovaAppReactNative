import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { getUserData } from "@/src/storage/authStorage";


import { styles, MUTED } from "./styles";
import { createPlayer } from "@/src/api/player";
import BasicHeader from "@/src/components/basicHeader/basicHeader";
import { UserModel } from "@/src/models/user-model";

export default function CreatePlayerScreen() {
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState<UserModel | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const u = await getUserData<UserModel>();
      if (mounted) setUser(u);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const canSave = !!name.trim() && !!user?.id && !loading;

  const handleSave = async () => {
    if (!canSave) {
      Alert.alert("Faltan datos", "Completa el nombre del player.");
      return;
    }
    if (!user?.id) return;

    const payload = { ownerId: user.id, name: name.trim(),mainPlayer:false };

    try {
      setLoading(true);
  
      await createPlayer(payload);
      router.back();
    } catch (error) {
      console.error("Error creating player:", error);
      Alert.alert("Error", "No se pudo crear el player. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 50 }]}>
  <BasicHeader
  headerText="CREAR JUGADOR"
  >

  </BasicHeader>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.label}>Propietario</Text>
          <View style={styles.pill}>
            <Text style={styles.pillTitle}>{user?.name ?? "Cargando usuario..."}</Text>
            <Text style={styles.pillSub}>ID: {user?.id ?? "—"}</Text>
          </View>

          <Text style={styles.label}>Nombre del player *</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Ej. Player secundario"
            placeholderTextColor={MUTED}
            style={styles.input}
            autoCapitalize="words"
            returnKeyType="done"
          />
          <Text style={styles.helper}>Este será el nombre visible para el player.</Text>
        </View>

        <Pressable
          style={[styles.saveButton, !canSave && styles.saveButtonDisabled]}
          disabled={!canSave}
          onPress={handleSave}
        >
          <Text style={styles.saveText}>{loading ? "Guardando..." : "Crear player"}</Text>
        </Pressable>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}
