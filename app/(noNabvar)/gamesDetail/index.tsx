import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, ImageBackground, Pressable, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { styles, GREEN } from "./styles";

import type { GameBdd } from "@/src/models/game-model";
import { getGameByIdBdd } from "@/src/api/games";

export default function GameDetailsScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState<GameBdd | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        const data = await getGameByIdBdd(id);
        setGame(data);
      } catch (e) {
        console.error("Error fetching game detail:", e);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchGame();
  }, [id]);

  // Helpers para traducir según lo que te llega (bestTranslation / translations)
  const ui = useMemo(() => {
    if (!game) return null;

    const best: any = (game as any).bestTranslation ?? (game as any).translations?.[0];
    const title = best?.name ?? "No name";
    const description = best?.description ?? "";
    const lang = best?.lang ?? "en";

    const categories = ((game as any).categories ?? [])
      .map((c: any) => c?.translations?.[0]?.name)
      .filter(Boolean) as string[];

    const mechanics = ((game as any).mechanics ?? [])
      .map((m: any) => m?.translations?.[0]?.name)
      .filter(Boolean) as string[];

    const year = (game as any).yearPublished ? String((game as any).yearPublished) : "-";
    const players = `${(game as any).minPlayers ?? "?"}-${(game as any).maxPlayers ?? "?"}`;
    const duration = `${(game as any).playTime ?? (game as any).maxplaytime ?? "?"}m`;
    const age = `${(game as any).suggestedAge ?? (game as any).minAge ?? "?"}+`;

    // Pill principal: usamos la primera categoría si existe
    const categoryPill = (categories[0] ?? "BOARD GAME").toUpperCase();

    return {
      title,
      description,
      lang,
      categories,
      mechanics,
      cover: (game as any).image || (game as any).thumbnail || "",
      categoryPill,
      year,
      players,
      duration,
      age,
    };
  }, [game]);

  const shortText = ui?.description ? ui.description.slice(0, 160) : "";

  // Loading / error simple
  if (loading) {
    return (
      <View style={[styles.screen, { paddingTop: insets.top, justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator />
        <Text style={{ color: "rgba(234,242,238,0.65)", marginTop: 10, fontWeight: "700" }}>
          Loading game...
        </Text>
      </View>
    );
  }

  if (!ui) {
    return (
      <View style={[styles.screen, { paddingTop: insets.top, justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: "rgba(234,242,238,0.65)", fontWeight: "800" }}>
          Game not found
        </Text>
        <Pressable onPress={() => router.back()} style={{ marginTop: 12 }}>
          <Text style={{ color: GREEN, fontWeight: "900" }}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header (floating) */}
      <View style={[styles.header, { top: insets.top + 6 }]}>
        <Pressable onPress={() => router.back()} style={styles.iconBtn} hitSlop={10}>
          <Text style={styles.iconText}>←</Text>
        </Pressable>

        <Text style={styles.headerTitle}>GAME DETAILS</Text>

        <Pressable onPress={() => console.log("share")} style={styles.iconBtn} hitSlop={10}>
          <Text style={styles.iconText}>⤴</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.heroWrap}>
          <ImageBackground source={{ uri: ui.cover }} style={styles.hero} imageStyle={styles.heroImg}>
            <LinearGradient colors={["rgba(0,0,0,0.0)", "rgba(0,0,0,0.72)"]} style={styles.heroOverlay}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{ui.categoryPill}</Text>
              </View>

              <Text style={styles.title}>{ui.title}</Text>
              <Text style={styles.subtitle}>
                {ui.year} · {ui.players} players · {ui.duration}
              </Text>

              <View style={styles.heart}>
                <Text style={{ fontSize: 16 }}>♥</Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <StatPill big={ui.players} small="PLAYERS" icon="👥" />
          <StatPill big={ui.duration} small="DURATION" icon="⏱" />
          <StatPill big={ui.age} small="AGE" icon="🎯" accent />
        </View>

        {/* Description */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Description</Text>
            <View style={styles.langPill}>
              <Text style={styles.langText}>{ui.lang.toUpperCase()}</Text>
            </View>
          </View>

          <Text style={styles.desc}>
            {expanded ? ui.description : ui.description ? `${shortText}...` : "No description"}
          </Text>

          {ui.description ? (
            <Pressable onPress={() => setExpanded((v) => !v)} style={styles.readMore}>
              <Text style={styles.readMoreText}>{expanded ? "Read less" : "Read more"}</Text>
              <Text style={styles.readMoreArrow}>›</Text>
            </Pressable>
          ) : null}
        </View>

        {/* Categories */}
        {ui.categories.length > 0 ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Categories</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
              {ui.categories.slice(0, 8).map((c) => (
                <View key={c} style={styles.tag}>
                  <Text style={styles.tagText}>{c}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {/* Mechanics */}
        {ui.mechanics.length > 0 ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Mechanics</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
              {ui.mechanics.slice(0, 10).map((m) => (
                <View key={m} style={styles.tagMuted}>
                  <Text style={styles.tagTextMuted}>{m}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottom, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <Pressable onPress={() => router.push(`/requestLoan/${id}`)} style={styles.cta}>
          <Text style={styles.ctaText}>Solicitar Préstamo</Text>
          <Text style={styles.ctaArrow}>→</Text>
        </Pressable>
      </View>
    </View>
  );
}

function StatPill({
  big,
  small,
  icon,
  accent,
}: {
  big: string;
  small: string;
  icon: string;
  accent?: boolean;
}) {
  return (
    <View style={[styles.statPill, accent && styles.statPillAccent]}>
      <Text style={styles.statIcon}>{icon}</Text>
      <View style={{ gap: 2 }}>
        <Text style={[styles.statBig, accent && { color: GREEN }]}>{big}</Text>
        <Text style={styles.statSmall}>{small}</Text>
      </View>
    </View>
  );
}