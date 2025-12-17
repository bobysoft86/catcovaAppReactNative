import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, FlatList, ImageBackground, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { styles, GREEN } from "./styles";
import { getAllGamesBdd } from "@/src/api/games";
import type { GameBdd } from "@/src/models/game-model";

type UiGame = {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  rating: number;
  cover: string;
  status: "available" | "back";
  backText?: string;
};

const FILTERS = ["All", "Strategy", "Family", "Party"] as const;
type Filter = (typeof FILTERS)[number];

export default function GamesScreen() {
  const insets = useSafeAreaInsets();

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const [gamesList, setGamesList] = useState<GameBdd[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesFromBdd = await getAllGamesBdd();
        setGamesList(gamesFromBdd ?? []);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // 1) Mapeo GameBdd -> UI
  const gamesUi = useMemo<UiGame[]>(() => {
    const pickCategory = (g: GameBdd) => {
      // según tu payload: categories: [{...}]
      const c0: any = (g as any)?.categories?.[0];
      // intenta leer name (depende de tu backend)
      const name = c0?.name || c0?.translations?.[0]?.name || "Other";
      return String(name);
    };

    const pickTitle = (g: GameBdd) => {
      const t0: any = (g as any)?.translations?.[0];
      return (t0?.name || (g as any)?.name || "No name") as string;
    };

    const colorForCategory = (cat: string) => {
      const c = cat.toLowerCase();
      if (c.includes("strategy")) return "rgba(34,197,94,0.18)";
      if (c.includes("family")) return "rgba(255,180,84,0.16)";
      if (c.includes("party")) return "rgba(255, 92, 156, 0.16)";
      return "rgba(148,163,184,0.16)";
    };

    return (gamesList || []).map((g: any) => {
      const category = pickCategory(g);
      const cover = g.image || g.thumbnail || "";

      return {
        id: String(g.id),
        title: pickTitle(g),
        category,
        categoryColor: colorForCategory(category),
        // si tu backend no trae rating, pon 0 o random; aquí 0
        rating: typeof g.rating === "number" ? g.rating : 0,
        cover,
        // si tu backend no trae disponibilidad, por ahora lo marcamos available
        status: "available",
        backText: undefined,
      };
    });
  }, [gamesList]);

  // 2) Filtrado (search + pills)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return gamesUi.filter((g) => {
      const matchesQuery = !q || g.title.toLowerCase().includes(q);

      // Tus filtros son Strategy/Family/Party, pero tu API puede traer categorías distintas.
      // Hacemos match por "includes" para que funcione con categorías más largas.
      const matchesFilter =
        filter === "All"
          ? true
          : g.category.toLowerCase().includes(filter.toLowerCase());

      return matchesQuery && matchesFilter;
    });
  }, [gamesUi, query, filter]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 10 }]}>
      {/* Search */}
      <View style={styles.top}>
        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>🔎</Text>

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search board games..."
            placeholderTextColor="rgba(234,242,238,0.45)"
            style={styles.searchInput}
          />

          <Pressable onPress={() => console.log("filters")} style={styles.filterBtn}>
            <Text style={styles.filterIcon}>⚙︎</Text>
          </Pressable>
        </View>

        {/* Pills */}
        <View style={styles.pillsRow}>
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <Pressable
                key={f}
                onPress={() => setFilter(f)}
                style={[styles.pill, active && styles.pillActive]}
              >
                <Text style={[styles.pillText, active && styles.pillTextActive]}>{f}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Loading */}
      {loading ? (
        <View style={{ paddingTop: 40, alignItems: "center" }}>
          <ActivityIndicator />
          <Text style={{ color: "rgba(234,242,238,0.65)", marginTop: 10, fontWeight: "700" }}>
            Loading games...
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={{ gap: 12 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <GameCard
              game={item}
            onPress={() => router.push(`/gamesDetail?id=${item.id} `)}

            />
          )}
          ListFooterComponent={<View style={{ height: 120 }} />}
          ListEmptyComponent={
            <View style={{ paddingTop: 40, alignItems: "center" }}>
              <Text style={{ color: "rgba(234,242,238,0.65)", fontWeight: "800" }}>
                No games found
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

function GameCard({ game, onPress }: { game: UiGame; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.cardOuter}>
      <ImageBackground source={{ uri: game.cover }} style={styles.cardBg} imageStyle={styles.cardImg}>
        <LinearGradient colors={["rgba(0,0,0,0.00)", "rgba(0,0,0,0.72)"]} style={styles.cardOverlay}>
          {/* rating (si es 0 lo oculto para que quede mejor) */}
          {game.rating > 0 ? (
            <View style={styles.ratingPill}>
              <Text style={styles.star}>★</Text>
              <Text style={styles.ratingText}>{game.rating.toFixed(1)}</Text>
            </View>
          ) : null}

          {/* category */}
          <View style={[styles.catPill, { backgroundColor: game.categoryColor }]}>
            <Text style={styles.catText}>{game.category.toUpperCase()}</Text>
          </View>

          <Text style={styles.gameTitle} numberOfLines={1}>
            {game.title}
          </Text>

          <View style={styles.statusRow}>
            <View
              style={[
                styles.dot,
                { backgroundColor: game.status === "available" ? GREEN : "rgba(234,242,238,0.35)" },
              ]}
            />
            <Text style={styles.statusText}>
              {game.status === "available" ? "Available" : game.backText ?? "Back soon"}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}