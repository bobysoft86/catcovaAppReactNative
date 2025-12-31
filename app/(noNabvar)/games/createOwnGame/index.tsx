import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Switch,
  useWindowDimensions,
  Alert,
} from "react-native";
import SelectSheet from "@/src/components/selectSheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { styles, MUTED, GREEN } from "./styles";
import { getUserData } from "@/src/storage/authStorage";
import { createOwnedGameBdd } from "@/src/api/ownedGames";
import { GameBdd, OwnedGameCreatePayload } from "@/src/models/game-model";
import { getAllGamesBdd } from "@/src/api/games";
import { UserModel } from "@/src/models/user-model";
import BasicHeader from "@/src/components/basicHeader/basicHeader";

// Esto en realidad es “crear mi copia (OwnedGame)”
type GameOption = { id: number; name: string };

type Condition = "NEW" | "LIKE_NEW" | "GOOD" | "OK" | "BAD";

export default function CreateOwnedGameScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [gameOpen, setGameOpen] = useState(false);
  const [gamesList, setGamesList] = useState<GameBdd[]>([]);
  const [gameBddId, setGameBddId] = useState<number | null>(null);
  const [maxRentDays, setMaxRentDays] = useState("7");
  const [isActiveToRent, setisActiveToRent] = useState(true);
  const [isActiveToChange, setisActiveToChange] = useState(true);
  const [user, setUser] = useState<UserModel | null>(null);
  
  const twoCols = width >= 420;


 useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesFromBdd = await getAllGamesBdd();

        setGamesList(gamesFromBdd ?? []);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {

      }
    };

    fetchGames();
  }, []);


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
  
  const gameLabel =
    gamesList.find((g) => g.id === gameBddId)?.bestTranslation?.name ??
    gamesList.find((g) => g.id === gameBddId)?.translations?.[0]?.name ??
    "Selecciona un juego";

  const canSave =
    !!gameBddId &&
    Number.isFinite(Number(maxRentDays)) &&
    Number(maxRentDays) > 0;


  const handleSave = async () => {
    if (!canSave) {
      Alert.alert("Faltan datos", "Revisa los campos obligatorios (*)");
      return;
    }
    if (!user?.id) {
      Alert.alert("Usuario no disponible", "No se pudo obtener tu sesión. Intenta de nuevo.");
      return;
    }
    if (!gameBddId) return;


    const payload: OwnedGameCreatePayload = {
      ownerId: user.id,
      gameBddId,
      isActiveToRent,
      maxRentTime: Number(maxRentDays),
      isActiveToChange,
    };

    try {
      await createOwnedGameBdd(payload);
      router.replace("/(tabs)/games");
    } catch (error) {
      console.error("Error creating OwnedGame:", error);
    }
  };



  return (
    <View style={[styles.screen, { paddingTop: insets.top + 50 }]}>
      {/* Header */}

    <BasicHeader
    
    headerText="AÑADIR JUEGO">

    </BasicHeader>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>


          {/* Row 2: Juego (GameBdd)* */}
          <Field style={{ marginTop: 14 }}>
            <Label text="Juego (GameBdd)" required />
                <Pressable onPress={() => setGameOpen(true)} style={styles.selectBtn}>
                <Text style={styles.selectText}>{gameLabel}</Text>
                <Text style={styles.selectChevron}>▾</Text>
              </Pressable>

          </Field>


          {/* Row 4: Valor (€)* + Tiempo máximo alquiler (días)* */}
          <View style={[styles.row, twoCols && styles.rowTwoCols, { marginTop: 14 }]}>

            <Field>
              <Label text="Tiempo máximo alquiler (días)" required />
              <TextInput
                value={maxRentDays}
                onChangeText={setMaxRentDays}
                placeholder="7"
                placeholderTextColor={MUTED}
                keyboardType="numeric"
                style={styles.input}
              />
            </Field>
          </View>

          {/* Checkboxes */}
          <View style={styles.switchRow}>
            <Switch
              value={isActiveToRent}
              onValueChange={setisActiveToRent}
              thumbColor={isActiveToRent ? GREEN : undefined}
              trackColor={{ true: "rgba(34,197,94,0.30)", false: "rgba(255,255,255,0.10)" }}
            />
            <Text style={styles.switchText}>Disponible para alquiler</Text>
          </View>

          <View style={styles.switchRow}>
            <Switch
              value={isActiveToChange}
              onValueChange={setisActiveToChange}
              thumbColor={isActiveToChange ? GREEN : undefined}
              trackColor={{ true: "rgba(34,197,94,0.30)", false: "rgba(255,255,255,0.10)" }}
            />
            <Text style={styles.switchText}>Disponible para intercambio</Text>
          </View>
        </View>

        <Pressable
          style={[styles.saveButton, !canSave && { opacity: 0.55 }]}
          disabled={!canSave}
          onPress={handleSave}
        >
          <Text style={styles.saveText}>Guardar</Text>
        </Pressable>

        <View style={{ height: 40 }} />
      </ScrollView>

      <SelectSheet
        visible={gameOpen}
        title="Juego (GameBdd)"
        selected={gameBddId ?? null}
        onClose={() => setGameOpen(false)}
        onSelect={(v) => setGameBddId(Number(v))}
        options={gamesList.map((g) => ({ value: g.id, label: g.translations[0].name }))}
        searchPlaceholder="Buscar juego..."
      />

    </View>

  );
}

/* ---------- tiny UI helpers ---------- */

function Field({ children, style }: { children: React.ReactNode; style?: any }) {
  return <View style={[styles.field, style]}>{children}</View>;
}

function Label({ text, required }: { text: string; required?: boolean }) {
  return (
    <Text style={styles.label}>
      {text}
      {required ? <Text style={{ color: "rgba(234,242,238,0.55)" }}> *</Text> : null}
    </Text>
  );
}

function SelectButton({ value, onPress }: { value: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.selectBtn}>
      <Text style={[styles.selectText, !value?.includes("Selecciona") ? null : { opacity: 0.8 }]}>
        {value}
      </Text>
      <Text style={styles.selectChevron}>▾</Text>
    </Pressable>
  );
}