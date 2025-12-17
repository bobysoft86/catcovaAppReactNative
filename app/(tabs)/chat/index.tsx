import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BG = "#0B1713";
const CARD = "rgba(255,255,255,0.06)";
const BORDER = "rgba(255,255,255,0.10)";
const TEXT = "#EAF2EE";
const MUTED = "rgba(234,242,238,0.65)";
const GREEN = "#22C55E";

type ChatFilter = "Todos" | "Préstamos" | "Grupos";

type ChatRow = {
  id: string;
  type: "dm" | "group";
  title: string;
  subtitle: string;
  tag?: { label: string; color: string; bg: string };
  avatar?: string;
  time: string;
  unread?: boolean;
};

export default function ChatListScreen() {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<ChatFilter>("Todos");
  const [query, setQuery] = useState("");

  const chats = useMemo<ChatRow[]>(
    () => [
      {
        id: "1",
        type: "dm",
        title: "Sofía R.",
        subtitle: "Hey, ¿está disponible Catan para el…",
        tag: { label: "CATAN", color: "#B7F7D0", bg: "rgba(34,197,94,0.18)" },
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60",
        time: "10:30 AM",
        unread: true,
      },
      {
        id: "2",
        type: "dm",
        title: "Marco P.",
        subtitle: "Gracias por devolver Carcassonne …",
        tag: { label: "CARCASSONNE", color: "#C7D2FE", bg: "rgba(99,102,241,0.18)" },
        avatar:
          "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=200&q=60",
        time: "Ayer",
      },
      {
        id: "3",
        type: "group",
        title: "Noche de Juegos 🎲",
        subtitle: "Laura: Nos vemos a las 8 en mi casa.",
        tag: { label: "EVENTO", color: "#E9D5FF", bg: "rgba(168,85,247,0.18)" },
        avatar:
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=200&q=60",
        time: "Martes",
        unread: true,
      },
      {
        id: "4",
        type: "dm",
        title: "Alex D.",
        subtitle: "¡Perfecto! Nos vemos entonces.",
        tag: { label: "TICKET TO RIDE", color: "#FDE68A", bg: "rgba(245,158,11,0.16)" },
        avatar:
          "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=200&q=60",
        time: "Lun",
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return chats.filter((c) => {
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        (c.tag?.label?.toLowerCase().includes(q) ?? false);

      const matchesFilter =
        filter === "Todos"
          ? true
          : filter === "Grupos"
          ? c.type === "group"
          : c.tag?.label !== undefined; // "Préstamos": mock simple (los que tienen tag)

      return matchesQuery && matchesFilter;
    });
  }, [chats, query, filter]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 10 }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.h1}>Conversaciones</Text>
        <Text style={styles.h2}>3 nuevos mensajes</Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>🔎</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar chat o juego…"
          placeholderTextColor="rgba(234,242,238,0.45)"
          style={styles.searchInput}
        />
      </View>

      {/* Filters */}
      <View style={styles.pillsRow}>
        {(["Todos", "Préstamos", "Grupos"] as ChatFilter[]).map((f) => {
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

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ChatItem item={item} />}
        ListFooterComponent={<FooterCard />}
      />
    </View>
  );
}

function ChatItem({ item }: { item: ChatRow }) {
  return (
    <Pressable
      onPress={() => console.log("open chat", item.id)}
      style={({ pressed }) => [styles.rowCard, pressed && { opacity: 0.9 }]}
    >
      <Image
        source={{
          uri:
            item.avatar ??
            "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=60",
        }}
        style={styles.avatar}
      />

      <View style={{ flex: 1 }}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>

        {!!item.tag && (
          <View style={[styles.tagPill, { backgroundColor: item.tag.bg, borderColor: item.tag.bg }]}>
            <Text style={[styles.tagText, { color: item.tag.color }]}>{item.tag.label}</Text>
          </View>
        )}

        <Text style={styles.preview} numberOfLines={1}>
          {item.subtitle}
        </Text>
      </View>

      {/* unread dot */}
      {item.unread ? <View style={styles.unreadDot} /> : <View style={{ width: 10 }} />}
    </Pressable>
  );
}

function FooterCard() {
  return (
    <View style={styles.footerCard}>
      <View style={styles.footerIconCircle}>
        <Text style={{ fontSize: 16 }}>🎲</Text>
      </View>
      <Text style={styles.footerTitle}>¿Buscas algo nuevo?</Text>
      <Text style={styles.footerSub}>
        Explora los juegos disponibles cerca de ti para empezar a chatear.
      </Text>

      <Pressable onPress={() => console.log("explore")} style={styles.footerBtn}>
        <Text style={styles.footerBtnText}>Explorar juegos</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },

  header: { paddingHorizontal: 18, alignItems: "center", gap: 6, marginBottom: 10 },
  h1: { color: TEXT, fontSize: 18, fontWeight: "900" },
  h2: { color: MUTED, fontSize: 12, fontWeight: "700" },

  searchWrap: {
    marginHorizontal: 18,
    height: 46,
    borderRadius: 14,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 10,
  },
  searchIcon: { color: MUTED, fontSize: 14 },
  searchInput: { flex: 1, color: TEXT, fontSize: 14, fontWeight: "600" },

  pillsRow: { flexDirection: "row", gap: 10, paddingHorizontal: 18, marginTop: 12, marginBottom: 8 },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
  },
  pillActive: { backgroundColor: "rgba(34,197,94,0.20)", borderColor: "rgba(34,197,94,0.35)" },
  pillText: { color: MUTED, fontSize: 12, fontWeight: "800" },
  pillTextActive: { color: TEXT },

  list: { paddingHorizontal: 18, paddingTop: 8, paddingBottom: 120, gap: 12 },

  rowCard: {
    flexDirection: "row",
    gap: 12,
    padding: 14,
    borderRadius: 22,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
  },
  avatar: { width: 46, height: 46, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.06)" },

  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 },
  name: { color: TEXT, fontSize: 14, fontWeight: "900", flex: 1 },
  time: { color: "rgba(234,242,238,0.55)", fontSize: 11, fontWeight: "700" },

  tagPill: {
    alignSelf: "flex-start",
    marginTop: 6,
    marginBottom: 6,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
  },
  tagText: { fontSize: 10, fontWeight: "900", letterSpacing: 0.5 },

  preview: { color: MUTED, fontSize: 12, fontWeight: "600" },

  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 99,
    backgroundColor: GREEN,
    borderWidth: 2,
    borderColor: BG,
  },

  footerCard: {
    marginTop: 10,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.18)",
    backgroundColor: "rgba(0,0,0,0.14)",
    padding: 16,
    alignItems: "center",
    gap: 10,
    borderStyle: "dashed",
  },
  footerIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(34,197,94,0.18)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  footerTitle: { color: TEXT, fontSize: 14, fontWeight: "900" },
  footerSub: { color: MUTED, fontSize: 12, fontWeight: "600", textAlign: "center" },

  footerBtn: {
    marginTop: 4,
    backgroundColor: "rgba(34,197,94,0.14)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.35)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  footerBtnText: { color: "#B7F7D0", fontSize: 12, fontWeight: "900" },
});