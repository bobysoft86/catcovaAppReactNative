import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles, MUTED, GREEN } from "./styles";
import { getAllPlayers } from "@/src/api/player";
import { Player } from "@/src/models/player-model";
import { getAllUserMatches } from "@/src/api/match";
import { MatchModel } from "@/src/models/match-model";

type MatchCard = {
  id: number;
  gameName: string;
  playerName: string;
  dateText: string;
  rounds: number;
  winnerName?: string;
};

function mapMatches(matches: MatchModel[]): MatchCard[] {
  const cards: MatchCard[] = [];

  matches.forEach((match) => {

      if (!match?.id) return;
      const date = match.matchDate ? new Date(match.matchDate) : null;
      cards.push({
        id: match.id,
        gameName: match.gameBdd?.translations?.[0]?.name ?? "Juego",
        playerName: "falta encontrar el nopmnte",
        dateText:
          date?.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }) ?? "--",
        rounds: match.matchesNumber ?? 1,
        winnerName: match.winner?.name,
      });
  });

  return cards;
}

export default function MatchesListScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const filtered = useMemo(() => {
    if (!query.trim()) return cards;
    const q = query.toLowerCase();
    return cards.filter(
      (c) => c.gameName.toLowerCase().includes(q) || c.playerName.toLowerCase().includes(q)
    );
  }, [cards, query]);

  const loadData = async () => {
    try {
      setRefreshing(true);
      const matches = await getAllUserMatches();
      setCards(mapMatches(matches ?? []));
    } catch (e) {
      console.error("Error fetching matches list", e);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData} tintColor={GREEN} />}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.h1}>Mis Partidas</Text>
          <Pressable style={styles.refreshBtn} onPress={loadData}>
            <Text style={styles.refreshText}>↻</Text>
          </Pressable>
        </View>

        <View style={styles.search}>
          <Text style={{ color: MUTED }}>🔍</Text>
          <TextInput
            placeholder="Buscar partida..."
            placeholderTextColor={MUTED}
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Partidas jugadas</Text>
          <Text style={styles.sectionLink} onPress={loadData}>
            Refrescar
          </Text>
        </View>

        <View style={{ gap: 12 }}>
          {filtered.map((item) => (
            <View key={`${item.id}-${item.playerName}`} style={styles.card}>
              <View style={styles.cardTop}>
                <View>
                  <Text style={styles.gameName}>{item.gameName}</Text>
                  <Text style={styles.playerName}>Jugador: {item.playerName}</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.rounds} rondas</Text>
                </View>
              </View>

              <View style={styles.metaRow}>
                <View style={styles.dot} />
                <Text style={styles.metaText}>{item.dateText}</Text>
                {item.winnerName ? (
                  <>
                    <View style={styles.dot} />
                    <Text style={styles.metaSub}>Ganó: {item.winnerName}</Text>
                  </>
                ) : null}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
