import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput, Alert, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles, MUTED, GREEN } from "./styles";
import { router } from "expo-router";
import { GameBdd } from "@/src/models/game-model";
import { getAllGamesBdd } from "@/src/api/games";
import SelectSheet from "@/src/components/selectSheet";
import { getAllPlayers } from "@/src/api/player";
import { Player } from "@/src/models/player-model";
import { createMatch } from "@/src/api/match";
import { MatchCreatePayload } from "@/src/models/match-model";


export default function MatchCreateScreen() {
  const insets = useSafeAreaInsets();

  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [gameBddId, setGameBddId] = useState<number | null>(null);
  const [playersOpen, setOpenPlayers] = useState<boolean>(false);
  const [playersList, setListPlayers] = useState<Player[]>([]);
  const [gameOpen, setGameOpen] = useState(false);
  const [rounds, setRounds] = useState(1);
  const [showCalendar, setShowCalendar ] =useState<boolean>(false)
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [winner, setWinner] = useState<number | null>(null);
  const [winnerOpen, setWinnerOpen] = useState(false);
  const [description, setdescription] = useState("");
  const [gamesList, setGamesList] = useState<GameBdd[]>([]);
  const [date, setDate] = useState(new Date());
  const [monthCursor, setMonthCursor] = useState(new Date());
  const days = useMemo(() => buildMonthDays(monthCursor.getFullYear(), monthCursor.getMonth()), [monthCursor]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (winner && !selectedPlayers.includes(winner)) {
      setWinner(null);
    }
  }, [selectedPlayers, winner]);

  
  useEffect(() => {
    loadGamesBddData();
    loadPlayers();
  }, []);


  async function loadPlayers() {
    try {
      const playersData = await getAllPlayers();
      setListPlayers(playersData ?? []);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  }

  async function loadGamesBddData() {
    try {
      const gamesFromBdd = await getAllGamesBdd();
      setGamesList(gamesFromBdd ?? []);
    } catch (error) {
      console.error("Error fetching gamesList:", error);
    }
  }


  const selectedGameName = useMemo(
    () =>
      gamesList?.find((g: GameBdd) => g.id === selectedGame)?.translations?.[0]?.name ??
      "Selecciona juego",
    [selectedGame]
  );

  const togglePlayer = (id: number) => {
    setSelectedPlayers((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  };

  const canSave = !!selectedGame && selectedPlayers.length > 0 && rounds > 0 && !saving;

  async function saveMatch() {
    if (!canSave) {
      Alert.alert("Faltan datos", "Selecciona juego, jugadores y define las rondas.");
      return;
    }

if(!winner || !gameBddId ||!rounds||!selectedPlayers||!description){
  Alert.alert("Faltan datos", "Selecciona juego, jugadores y define las rondas.");
  return 
  
}


    const payload: MatchCreatePayload = {
      gameBddId: selectedGame as number,
      matchesNumber: rounds,
      playerIds: selectedPlayers,
      winnerId: winner ,
      description,
      matchDate: date,
    };

    try {
      setSaving(true);
      await createMatch(payload);
      Alert.alert("Partida guardada", "Tu registro se ha creado correctamente.");
      router.push("/(tabs)/home");
    } catch (error) {
      console.error("Error creando partida", error);
      Alert.alert("Error", "No se pudo guardar la partida. Intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable style={styles.backBtn} onPress={() => router.back()} hitSlop={10}>
            <Text style={styles.backText}>×</Text>
          </Pressable>
          <Text style={styles.title}>Registro de Partidas</Text>
          <View style={styles.spacer} />
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.label}>JUEGO SELECCIONADO</Text>
          <Pressable style={styles.input}onPress={() => setGameOpen(true)}>
            <Text style={{ color: selectedGame ? "#fff" : MUTED, fontWeight: "800" }}>{selectedGameName}</Text>
          </Pressable>
        </View>


        <View style={[styles.row, { gap: 12 }]}>
          <View style={styles.statCard}>
            <Text style={styles.label}>FECHA</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <View>

                <Text style={styles.dateValue}>{date.getDate()}</Text>
                <Text style={styles.dateSub}>
                  {date.toLocaleDateString("es-ES", { month: "long" })}
                </Text>

              </View>
              <Pressable style={styles.iconBtn} onPress={() => setShowCalendar(true)}>
                <Text style={styles.iconText}>📅</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.label}>RONDAS</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Pressable
                style={styles.iconBtn}
                onPress={() => setRounds((r) => Math.max(1, r - 1))}
              >
                <Text style={styles.iconText}>−</Text>
              </Pressable>
              <Text style={styles.statValue}>{rounds}</Text>
              <Pressable style={styles.iconBtn} onPress={() => setRounds((r) => r + 1)}>
                <Text style={[styles.iconText, { color: GREEN }]}>＋</Text>
              </Pressable>
            </View>
          </View>
        </View>


                {showCalendar == true &&  <View style={styles.calWrap}>
          <View style={styles.calHeader}>
            <Text style={styles.calMonth}>
              {monthCursor.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
            </Text>
            <View style={styles.calNav}>
              <Pressable
                onPress={() =>
                  setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth() - 1, 1),
                )
                }
              >
                <Text style={styles.calNavBtn}>‹</Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 1))
                }
              >
                <Text style={styles.calNavBtn}>›</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.weekdayRow}>
            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
              <Text key={d} style={styles.weekday}>
                {d}
              </Text>
            ))}
          </View>

          <View style={styles.grid}>
            {days.map((d, idx) => {
              const isSelected =
                d.date.getFullYear() === date.getFullYear() &&
                d.date.getMonth() === date.getMonth() &&
                d.date.getDate() === date.getDate();
              return (
                <Pressable
                  key={idx}
                  onPress={() => {setDate(d.date), setShowCalendar(false)}}
                  style={[styles.dayBtn, !d.inMonth && { opacity: 0.35 }, isSelected && styles.daySelected]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      !d.inMonth && styles.dayMuted,
                      isSelected && styles.daySelectedText,
                    ]}
                  >
                    {d.date.getDate()}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>}


        <View style={styles.sectionCard}>
          <View style={[styles.row, { justifyContent: "space-between" }]}>
            <Text style={styles.label}>JUGADORES</Text>

          </View>
          <View style={styles.playersWrap}>
            <Pressable style={styles.playerChip} onPress={() => setOpenPlayers(true)}>
              <Text style={styles.iconText}>＋</Text>
              <Text style={styles.playerName}>Añadir</Text>
            </Pressable>
            {playersList
              .filter((p) => selectedPlayers.includes(p.id))
              .map((p) => {
              const selected = selectedPlayers.includes(p.id);
              return (
                <Pressable
                  key={p.id}
                  style={[styles.playerChip, selected && styles.playerSelected]}
                  onPress={() => togglePlayer(p.id)}
                >
                  <View style={styles.avatar} />
                  <Text style={styles.playerName}>{p.name}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.label}>GANADOR</Text>
          <Pressable style={styles.dropdown} onPress={() => setWinnerOpen(true)}>
            <Text style={styles.dropdownText}>
              {winner
                ? playersList.find((p) => p.id === winner)?.name ?? "Seleccionar ganador..."
                : "Seleccionar ganador..."}
            </Text>
            <Text style={styles.iconText}>▾</Text>
          </Pressable>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.label}>NOTAS DE LA PARTIDA</Text>
          <TextInput
            placeholder="¿Quién hizo la mejor jugada? ¿Hubo algún momento épico?"
            placeholderTextColor={MUTED}
            value={description}
            onChangeText={setdescription}
            multiline
            style={styles.textarea}
          />
        </View>

        <Pressable
          style={[styles.cta, !canSave && { opacity: 0.6 }]}
          onPress={saveMatch}
          disabled={!canSave}
        >
          {saving ? (
            <ActivityIndicator color={"#052B1C"} />
          ) : (
            <>
              <Text style={styles.ctaText}>Guardar Partida</Text>
              <Text style={styles.ctaText}>→</Text>
            </>
          )}
        </Pressable>
      </ScrollView>


        <SelectSheet
              visible={gameOpen}
              title="Juego del usuario"
              selected={selectedGame}
              onClose={() => setGameOpen(false)}
              onSelect={(v) => {
                const selected = gamesList?.find((og) => og.id === Number(v));
                setSelectedGame(Number(v));
                setGameBddId(selected?.id ?? null);
              }}
              options={gamesList.map((og) => ({
                value: og.id,
                label: og.translations?.[0]?.name ?? `Juego #${og.id}`,
                subtitle: og.bestTranslation?.name ?? og.translations?.[0]?.name ?? "",
              }))}
              searchPlaceholder="Buscar juego..."
            />
        
        <SelectSheet

          visible={playersOpen}
          title="Añadir Jugadores"
          selected={selectedPlayers}
          onClose={() => setOpenPlayers(false)}
          onSelect={(v) => {
            const id = Number(v);
            togglePlayer(id);
          }}
          options={playersList.map((s) => ({ value: s.id, label: s.name, subtitle: s.name }))}
          searchPlaceholder="Buscar jugadores..."
        />

        <SelectSheet
          visible={winnerOpen}
          title="Seleccionar ganador"
          selected={winner}
          onClose={() => setWinnerOpen(false)}
          onSelect={(v) => {
            const id = Number(v);
            setWinner(id);
          }}
          options={playersList
            .filter((s) => selectedPlayers.includes(s.id))
            .map((s) => ({ value: s.id, label: s.name, subtitle: s.name }))}
          searchPlaceholder="Buscar ganador..."





        />
        
        </View>
  );
}

type CalendarDay = { date: Date; inMonth: boolean };

function buildMonthDays(year: number, month: number): CalendarDay[] {
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const leading = Array.from({ length: startWeekday }, (_, i) => ({
    date: new Date(year, month - 1, prevMonthDays - startWeekday + i + 1),
    inMonth: false,
  }));

  const current = Array.from({ length: daysInMonth }, (_, i) => ({
    date: new Date(year, month, i + 1),
    inMonth: true,
  }));

  const total = [...leading, ...current];
  const trailingCount = Math.ceil(total.length / 7) * 7 - total.length;
  const trailing = Array.from({ length: trailingCount }, (_, i) => ({
    date: new Date(year, month + 1, i + 1),
    inMonth: false,
  }));

  return [...total, ...trailing];
}
