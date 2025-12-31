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
import { styles, GREEN, MUTED, TEXT } from "./styles";
import { getUserData } from "@/src/storage/authStorage";

import { getOwnedGamesMeta, listOwnedGames, updateOwnedGame } from "@/src/api/ownedGames";
import { GameBdd, OwnedGame } from "@/src/models/game-model";
import { getAllGamesBdd } from "@/src/api/games";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserModel, UserTypeItem } from "@/src/models/user-model";
import BasicHeader from "@/src/components/basicHeader/basicHeader";


export default function addOwnedGameToOrganization() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [gameOpen, setGameOpen] = useState(false);
  const [ownerOpen, setOwnerOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [gamesList, setGamesList] = useState<GameBdd[]>([]);
  const [ownedGames, setOwnedGames] = useState<OwnedGame[]>([]);
  const [gameBddId, setGameBddId] = useState<number | null>(null);
  const [ownedGameId, setOwnedGameId] = useState<number | null>(null);
  const [ownerId, setOwnerId] = useState<number | null>(null);
  const [owners, setOwners] = useState<{ id: number; name?: string; email?: string }[]>([]);
  const [statuses, setStatuses] = useState<{ id: number; name: string }[]>([]);
  const [maxRentDays, setMaxRentDays] = useState("7");
  const [isActiveToRent, setisActiveToRent] = useState(true);
  const [isActiveToChange, setisActiveToChange] = useState(true);
  const [statusId, setStatusId] = useState<number | null>(null);
  const [valueEur, setValueEur] = useState("0");
  const [userTypeSelected, setUserType] = useState<UserTypeItem | null>(null);
  const [user, setUser] = useState<UserModel | null>(null);
  
  const twoCols = width >= 420;

const USER_TYPE_SELECTED_KEY = "user_type_selected";

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
        try {
                const stored = await AsyncStorage.getItem(USER_TYPE_SELECTED_KEY);
                if (stored) setUserType(JSON.parse(stored));
            } catch (e) {
                console.error("Error leyendo UserTypeSelected", e);
            }
    })();
    return () => {
      mounted = false;
    };
  }, []);
  
  useEffect(() => {
    (async () => {
      try {
        const meta = await getOwnedGamesMeta();
        setStatuses(meta.statuses ?? []);
        setOwners(meta.users ?? []);
      } catch (err) {
        console.error("Error fetching ownedGames meta", err);
      }
    })();
  }, []);

  useEffect(() => {
    if (!ownerId) return;
    (async () => {
      try {
        const allOwned = await listOwnedGames();
        setOwnedGames(allOwned.filter((og) => og.ownerId === ownerId));
      } catch (err) {
        console.error("Error fetching owned games", err);
      }
    })();
  }, [ownerId]);

  const gameLabel =
    ownedGames.find((og) => og.id === ownedGameId)
      ? ownedGames.find((og) => og.id === ownedGameId)?.code ??
        gamesList.find((g) => g.id === gameBddId)?.bestTranslation?.name ??
        gamesList.find((g) => g.id === gameBddId)?.translations?.[0]?.name
      : "Selecciona un juego";
  const ownerLabel =
    owners.find((o) => o.id === ownerId)?.name ??
    owners.find((o) => o.id === ownerId)?.email ??
    "Selecciona un usuario";
  const statusLabel = statuses.find((s) => s.id === statusId)?.name ?? "Selecciona estado";

  const canSave =
    !!ownedGameId &&
    !!statusId &&
    !!ownerId &&
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


    if (!ownedGameId || !statusId) return;

    if (!userTypeSelected)return;
    if (userTypeSelected.type !== "ORG" && userTypeSelected.role !== "OWNER") return
    try {
      await updateOwnedGame(ownedGameId, {
        statusId,
        value: Number(valueEur || 0),
        isActiveToRent,
        isActiveToChange,
        maxRentTime: Number(maxRentDays),
        locationId: userTypeSelected.originalId
      });
      router.replace("/(tabs)/games");
    } catch (error) {
      console.error("Error updating OwnedGame:", error);
    }
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top +50 }]}>
      {/* Header */}
      <BasicHeader
      headerText="AÑADIR JUEGO A ORGANIZACION"
      ></BasicHeader>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Field style={{ marginTop: 14 }}>
            <Label text="Usuario (owner)" required />
            <Pressable onPress={() => setOwnerOpen(true)} style={styles.selectBtn}>
              <Text style={styles.selectText}>{ownerLabel}</Text>
              <Text style={styles.selectChevron}>▾</Text>
            </Pressable>
          </Field>

          <Field style={{ marginTop: 14 }}>
            <Label text="Juego del usuario" required />
            <Pressable onPress={() => setGameOpen(true)} style={styles.selectBtn} disabled={!ownerId}>
              <Text style={styles.selectText}>{gameLabel}</Text>
              <Text style={styles.selectChevron}>▾</Text>
            </Pressable>
          </Field>

          <View style={[styles.row, twoCols && styles.rowTwoCols, { marginTop: 14 }]}>
            <Field>
              <Label text="Estado" required />
              <Pressable onPress={() => setStatusOpen(true)} style={styles.selectBtn}>
                <Text style={styles.selectText}>{statusLabel}</Text>
                <Text style={styles.selectChevron}>▾</Text>
              </Pressable>
            </Field>
            <Field>
              <Label text="Valor (€)" required />
              <TextInput
                value={valueEur}
                onChangeText={setValueEur}
                placeholder="0"
                placeholderTextColor={MUTED}
                keyboardType="numeric"
                style={styles.input}
              />
            </Field>
          </View>

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
        visible={ownerOpen}
        title="Usuario"
        selected={ownerId}
        onClose={() => setOwnerOpen(false)}
        onSelect={(v) => {
          setOwnerId(Number(v));
          setGameBddId(null);
          setOwnedGameId(null);
          setStatusId(null);
        }}
        options={owners.map((o) => ({
          value: o.id,
          label: o.name ?? o.email ?? `Usuario ${o.id}`,
        }))}
        searchPlaceholder="Buscar usuario..."
      />

      <SelectSheet
        visible={gameOpen}
        title="Juego del usuario"
        selected={ownedGameId}
        onClose={() => setGameOpen(false)}
        onSelect={(v) => {
          const selected = ownedGames.find((og) => og.id === Number(v));
          setOwnedGameId(Number(v));
          setGameBddId(selected?.gameBddId ?? null);
          if (selected?.value != null) setValueEur(String(selected.value));
          if (selected?.statusId) setStatusId(selected.statusId);
          if (selected?.maxRentTime) setMaxRentDays(String(selected.maxRentTime));
          setisActiveToRent(selected?.isActiveToRent ?? true);
          setisActiveToChange(selected?.isActiveToChange ?? true);
        }}
        options={ownedGames.map((og) => ({
          value: og.id,
          label: `#${og.id} · ${og.code ?? "sin código"}`,
          subtitle: gamesList.find((g) => g.id === og.gameBddId)?.translations?.[0]?.name,
        }))}
        searchPlaceholder="Buscar juego..."
      />

      <SelectSheet
        visible={statusOpen}
        title="Estado"
        selected={statusId}
        onClose={() => setStatusOpen(false)}
        onSelect={(v) => setStatusId(Number(v))}
        options={statuses.map((s) => ({ value: s.id, label: s.name }))}
        searchPlaceholder="Buscar estado..."
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
