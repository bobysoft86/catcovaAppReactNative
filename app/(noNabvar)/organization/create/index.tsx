import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { styles, MUTED } from "./styles";
import { createOrganization } from "@/src/api/organization";

import { getUserData } from "@/src/storage/authStorage";
import BasicHeader from "@/src/components/basicHeader/basicHeader";



type Weekday = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

const WEEKDAYS: { key: Weekday; label: string }[] = [
  { key: "MON", label: "Lunes" },
  { key: "TUE", label: "Martes" },
  { key: "WED", label: "Miércoles" },
  { key: "THU", label: "Jueves" },
  { key: "FRI", label: "Viernes" },
  { key: "SAT", label: "Sábado" },
  { key: "SUN", label: "Domingo" },
];

function isTimeHHMM(v: string) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(v);
}

export default function CreateOrganizationScreen() {
  const insets = useSafeAreaInsets();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  // opening rules
  const [weekday, setWeekday] = useState<Weekday>("MON");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("14:00");
  const [openingRules, setOpeningRules] = useState<
    { weekday: Weekday; startTime: string; endTime: string }[]
  >([]);

  // pickup config
  const [slotMinutes, setSlotMinutes] = useState("30");
  const [maxPickupsPerSlot, setMaxPickupsPerSlot] = useState("3");

  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => {
    if (!name.trim() || !address.trim() || !phone.trim()) return false;
    // opcional: permitir sin rules/config; si quieres obligarlas, valida aquí.
    return true;
  }, [name, address, phone]);




  function addRule() {
    if (!isTimeHHMM(startTime) || !isTimeHHMM(endTime)) {
      Alert.alert("Hora inválida", "Usa formato HH:MM, ejemplo 09:00");
      return;
    }

    const exists = openingRules.some((r) => r.weekday === weekday);
    const next = exists
      ? openingRules.map((r) =>
          r.weekday === weekday ? { weekday, startTime, endTime } : r
        )
      : [...openingRules, { weekday, startTime, endTime }];

    setOpeningRules(next);
  }

  function removeRule(day: Weekday) {
    setOpeningRules((prev) => prev.filter((r) => r.weekday !== day));
  }

  async function onCreate() {
    if (!canSubmit) return;

    // validaciones suaves
    if (openingRules.length === 0) {
      Alert.alert(
        "Sin horario",
        "No has añadido horarios de apertura. ¿Quieres crear igualmente?",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Crear", onPress: () => doCreate() },
        ]
      );
      return;
    }
    doCreate();
  }

  async function doCreate() {
    try {
      setLoading(true);
      
      const payload = {
        name: name.trim(),
        address: address.trim(),
        phone: phone.trim(),
        openingRules: openingRules.map((r) => ({
          weekday: r.weekday,
          startTime: r.startTime,
          endTime: r.endTime,
        })),
        pickupConfig: {
          slotMinutes: Number(slotMinutes) || 30,
          maxPickupsPerSlot: Number(maxPickupsPerSlot) || 3,
        },
      };
      
      const created = await createOrganization(payload);

      Alert.alert("OK", "Organización creada");
      router.back(); // o router.replace(`/organizations/${created.id}`)
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Error");
    } finally {
      setLoading(false);
    }
  }

  return (

<View>

  <BasicHeader
    headerText="CREAR ORGANIZACION"
    icon = "+"
          ></BasicHeader>

    <ScrollView
      style={[styles.screen, { paddingTop: insets.top + 50 }]}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 16 }]}
      keyboardShouldPersistTaps="handled"
    >

      {/* Card: datos básicos */}
      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Ej: Catcova Club"
          placeholderTextColor={MUTED}
          style={styles.input}
        />

        <Text style={styles.label}>Dirección</Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="C/ Ejemplo 123"
          placeholderTextColor={MUTED}
          style={styles.input}
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="+34 600 000 000"
          keyboardType="phone-pad"
          placeholderTextColor={MUTED}
          style={styles.input}
        />
      </View>

      {/* Card: horarios */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Horario de apertura</Text>

        {/* selector simple */}
        <View style={styles.chipRow}>
          {WEEKDAYS.map((d) => (
            <Pressable
              key={d.key}
              onPress={() => setWeekday(d.key)}
              style={[
                styles.chip,
                weekday === d.key ? styles.chipActive : null,
              ]}
            >
              <Text style={styles.chipText}>{d.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={[styles.timeRow, { marginTop: 12 }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Desde</Text>
            <TextInput value={startTime} onChangeText={setStartTime} style={styles.input} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Hasta</Text>
            <TextInput value={endTime} onChangeText={setEndTime} style={styles.input} />
          </View>
        </View>

        <Pressable onPress={addRule} style={[styles.button, styles.buttonSecondary, { marginTop: 12 }]}>
          <Text style={styles.buttonTextSecondary}>Añadir / Actualizar día</Text>
        </Pressable>

        {/* Lista rules */}
        <View style={[styles.ruleList, { marginTop: 12 }]}>
          {openingRules.length === 0 ? (
            <Text style={styles.helper}>Aún no has añadido reglas.</Text>
          ) : (
            openingRules
              .slice()
              .sort((a, b) => WEEKDAYS.findIndex(x => x.key === a.weekday) - WEEKDAYS.findIndex(x => x.key === b.weekday))
              .map((r) => (
                <View key={r.weekday} style={styles.ruleRow}>
                  <View style={styles.ruleLeft}>
                    <Text style={styles.ruleTitle}>
                      {WEEKDAYS.find((w) => w.key === r.weekday)?.label}
                    </Text>
                    <Text style={styles.ruleSub}>
                      {r.startTime} – {r.endTime}
                    </Text>
                  </View>
                  <Pressable onPress={() => removeRule(r.weekday)} style={styles.dangerBtn}>
                    <Text style={styles.dangerText}>×</Text>
                  </Pressable>
                </View>
              ))
          )}
        </View>
      </View>

      {/* Card: pickup config */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Configuración de recogidas</Text>

        <Text style={styles.label}>Minutos por slot</Text>
        <TextInput
          value={slotMinutes}
          onChangeText={setSlotMinutes}
          keyboardType="number-pad"
          placeholder="30"
          placeholderTextColor={MUTED}
          style={styles.input}
        />

        <Text style={styles.label}>Máx. recogidas por slot</Text>
        <TextInput
          value={maxPickupsPerSlot}
          onChangeText={setMaxPickupsPerSlot}
          keyboardType="number-pad"
          placeholder="3"
          placeholderTextColor={MUTED}
          style={styles.input}
        />
      </View>

      <Pressable
        onPress={onCreate}
        disabled={!canSubmit || loading}
        style={[
          styles.button,
          { marginTop: 8, opacity: !canSubmit || loading ? 0.6 : 1 },
        ]}
      >
        <Text style={styles.buttonText}>{loading ? "Creando..." : "Crear organización"}</Text>
      </Pressable>
    </ScrollView>
</View>

  );
}
