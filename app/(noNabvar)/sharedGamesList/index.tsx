import React, { useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, FlatList, ImageBackground } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { styles, GREEN } from "./styles";

type Mode = "lent" | "borrowed";
type LoanStatus = "ontime" | "late" | "soon" | "long";

type LoanCard = {
  id: string;
  title: string;
  image: string;
  status: LoanStatus;
  statusLabel: string; // "A TIEMPO", "ATRASADO", etc.
  line1: string; // "Prestado a Juan Pérez" / "Tomado de María G."
  dueLabel: string; // "DEVOLUCIÓN" / "VENCIDO"
  dueText: string; // "12 Oct"
  // para CTA
  primaryLabel: string; // "Detalles" / "Contactar"
  primaryAction: "details" | "contact";
};

export default function LoansScreen() {
  const insets = useSafeAreaInsets();

  const [mode, setMode] = useState<Mode>("lent");
  const [query, setQuery] = useState("");

  const isLent = mode === "lent";

  // Mock (cámbialo luego por API)
  const lentData = useMemo<LoanCard[]>(
    () => [
      {
        id: "l1",
        title: "Catan",
        image:
          "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=60",
        status: "ontime",
        statusLabel: "A TIEMPO",
        line1: "Prestado a Juan Pérez",
        dueLabel: "DEVOLUCIÓN",
        dueText: "12 Oct",
        primaryLabel: "Detalles →",
        primaryAction: "details",
      },
      {
        id: "l2",
        title: "Ticket to Ride",
        image:
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=60",
        status: "soon",
        statusLabel: "PRONTO",
        line1: "Prestado a Alex R.",
        dueLabel: "DEVOLUCIÓN",
        dueText: "20 Oct",
        primaryLabel: "Detalles →",
        primaryAction: "details",
      },
      {
        id: "l3",
        title: "Scythe",
        image:
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=60",
        status: "long",
        statusLabel: "LARGO PLAZO",
        line1: "Prestado a Carlos",
        dueLabel: "DEVOLUCIÓN",
        dueText: "15 Nov",
        primaryLabel: "Detalles",
        primaryAction: "details",
      },
    ],
    []
  );

  const borrowedData = useMemo<LoanCard[]>(
    () => [
      {
        id: "b1",
        title: "Wingspan",
        image:
          "https://images.unsplash.com/photo-1520975958225-6b0f74b4b2b0?auto=format&fit=crop&w=1200&q=60",
        status: "late",
        statusLabel: "ATRASADO",
        line1: "Tomado de María G.",
        dueLabel: "VENCIDO",
        dueText: "10 Oct",
        primaryLabel: "Contactar",
        primaryAction: "contact",
      },
    ],
    []
  );

  const raw = isLent ? lentData : borrowedData;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return raw;
    return raw.filter((x) => x.title.toLowerCase().includes(q) || x.line1.toLowerCase().includes(q));
  }, [raw, query]);

  const stats = useMemo(() => {
    const active = raw.length;
    const late = raw.filter((x) => x.status === "late").length;
    return { active, late };
  }, [raw]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8 }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        
          <Pressable onPress={() => router.back()} style={styles.iconBtn} hitSlop={10}>
                  <Text style={styles.iconText}>←</Text>
                </Pressable>
        
        <Text style={styles.h1}>Préstamos</Text>

        <Pressable onPress={() => console.log("filters")} style={styles.iconBtn} hitSlop={10}>
          <Text style={styles.iconText}>≡</Text>
        </Pressable>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>🔎</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar juego o amigo..."
          placeholderTextColor="rgba(234,242,238,0.45)"
          style={styles.searchInput}
        />
      </View>

      {/* Toggle Prestados / Tomados */}
      <View style={styles.toggleWrapper}>
        <Pressable
          onPress={() => setMode("lent")}
          style={[styles.toggleBtn, isLent && styles.toggleBtnActive]}
        >
          <Text style={[styles.toggleText, isLent && styles.toggleTextActive]}>Prestados</Text>
        </Pressable>

        <Pressable
          onPress={() => setMode("borrowed")}
          style={[styles.toggleBtn, !isLent && styles.toggleBtnActive]}
        >
          <Text style={[styles.toggleText, !isLent && styles.toggleTextActive]}>Tomados</Text>
        </Pressable>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <LinearGradient
          colors={["rgba(255,255,255,0.08)", "rgba(255,255,255,0.03)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.statCard}
        >
          <Text style={styles.statLabel}>TOTAL ACTIVOS</Text>
          <Text style={styles.statValue}>{stats.active}</Text>
        </LinearGradient>

        <LinearGradient
          colors={["rgba(255,255,255,0.08)", "rgba(255,255,255,0.03)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.statCard}
        >
          <Text style={styles.statLabel}>ATRASADOS</Text>
          <Text style={[styles.statValue, { color: "#EF4444" }]}>{stats.late}</Text>
        </LinearGradient>
      </View>

      {/* Section header */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>En Curso</Text>

        <Pressable onPress={() =>console.log("pendiente")} style={styles.sectionActionWrap}>
          <Text style={styles.sectionAction}>Ver historial</Text>
        </Pressable>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <LoanCardItem
            item={item}
            onPress={() => {
              if (item.primaryAction === "details") {
               console.log("pendiente");
              } else {
                console.log("pendiente"); // o lo que uses para contactar
              }
            }}
          />
        )}
        ListFooterComponent={<View style={{ height: 120 }} />}
        ListEmptyComponent={
          <View style={{ paddingTop: 30, alignItems: "center" }}>
            <Text style={{ color: "rgba(234,242,238,0.65)", fontWeight: "900" }}>
              No hay préstamos
            </Text>
          </View>
        }
      />
    </View>
  );
}

function LoanCardItem({ item, onPress }: { item: LoanCard; onPress: () => void }) {
  const tagStyle =
    item.status === "ontime"
      ? styles.tagGreen
      : item.status === "late"
      ? styles.tagRed
      : item.status === "soon"
      ? styles.tagAmber
      : styles.tagGray;

  const dueIcon = item.dueLabel === "VENCIDO" ? "⛔" : "🗓";

  return (
    <View style={styles.card}>
      <ImageBackground source={{ uri: item.image }} style={styles.cardHero} imageStyle={styles.cardHeroImg}>
        <LinearGradient colors={["rgba(0,0,0,0.05)", "rgba(0,0,0,0.72)"]} style={styles.cardOverlay}>
          <View style={[styles.tag, tagStyle]}>
            <Text style={styles.tagText}>{item.statusLabel}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardLine}>{item.line1}</Text>

        <View style={styles.bottomRow}>
          <View style={styles.dueWrap}>
            <Text style={styles.dueLabel}>{item.dueLabel}</Text>
            <View style={styles.dueRow}>
              <Text style={styles.dueIcon}>{dueIcon}</Text>
              <Text style={styles.dueText}>{item.dueText}</Text>
            </View>
          </View>

          <Pressable onPress={onPress} style={item.primaryAction === "contact" ? styles.ctaAlt : styles.cta}>
            <Text style={item.primaryAction === "contact" ? styles.ctaAltText : styles.ctaText}>
              {item.primaryLabel}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}