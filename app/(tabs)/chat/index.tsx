import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, FlatList, Image, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getUserData } from "@/src/storage/authStorage";
import { styles } from "./styles";
import { router, useRouter } from "expo-router";
import { getUserChats } from "@/src/api/chat";
import { ApiChat, ApiChatMember } from "@/src/models/chat-model";


type ChatFilter = "Todos" | "Préstamos" | "Grupos" |"Personal";

type ChatRow = {
  id: string;
  roomId: string;
  type: "dm" | "group" | "rental";
  title: string;
  subtitle: string;
  tag?: { label: string; color: string; bg: string };
  avatar?: string;
  time: string;
  unread?: boolean;
  unreadCount?: number;
};

export default function ChatListScreen() {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<ChatFilter>("Todos");
  const [query, setQuery] = useState("");
  const [chats, setChats] = useState<ChatRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadTick, setReloadTick] = useState(0);

  useEffect(() => {
    let mounted = true;

    const loadChats = async () => {
      try {
        setLoading(true);
        setError(null);

        const user = await getUserData<{ id?: number }>();
        const res = await getUserChats();
        const rows = mapChats(res ?? [], user?.id ?? null);

        if (mounted) setChats(rows);
      } catch (e) {
        if (mounted) setError("No se pudieron cargar los chats.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadChats();

    return () => {
      mounted = false;
    };
  }, [reloadTick]);

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
          : c.type === "rental";

      return matchesQuery && matchesFilter;
    });
  }, [chats, query, filter]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 10 }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.h1}>Conversaciones</Text>
        <Text style={styles.h2}>{getUnreadLabel(chats)}</Text>
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
      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator />
          <Text style={styles.loadingText}>Cargando chats…</Text>
        </View>
      ) : error ? (
        <View style={styles.loadingWrap}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable onPress={() => setReloadTick((n) => n + 1)} style={styles.retryBtn}>
            <Text style={styles.retryText}>Reintentar</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <ChatItem item={item} />}
          ListFooterComponent={<FooterCard />}
        />
      )}
    </View>
  );
}

function mapChats(chats: ApiChat[], currentUserId: number | null): ChatRow[] {
  return chats.map((chat) => {
    const other = getOtherMember(chat.members, currentUserId);
    const title = other?.user?.name || other?.user?.email || other?.user?.phone || chat.roomId;
    const subtitle = chat.lastMessage?.body ?? "Sin mensajes";
    const time = formatTime(chat.lastMessage?.ts ?? Date.parse(chat.createdAt));
    const type = toChatRowType(chat.type, chat.members.length);
    const tag = toTag(chat.type);

    return {
      id: String(chat.id),
      roomId: chat.roomId,
      type,
      title,
      subtitle,
      tag,
      time,
      unread: !!chat.unread,
      unreadCount: chat.unreadCount ?? 0,
    };
  });
}

function toChatRowType(type: string, membersCount: number): ChatRow["type"] {
  if (type === "RENTAL") return "rental";
  if (type === "GROUP") return "group";
  if (type === "DIRECT") return "dm";
  if (membersCount > 2) return "group";
  return "dm";
}

function toTag(type: string): ChatRow["tag"] | undefined {
  if (type === "RENTAL") {
    return { label: "PRÉSTAMO", color: "#B7F7D0", bg: "rgba(34,197,94,0.18)" };
  }
  if (type === "GROUP") {
    return { label: "GRUPO", color: "#C7D2FE", bg: "rgba(99,102,241,0.18)" };
  }
  return undefined;
}

function getOtherMember(members: ApiChatMember[], currentUserId: number | null) {
  if (!members?.length) return null;
  if (!currentUserId) return members[0] ?? null;
  return members.find((m) => m.userId !== currentUserId) ?? members[0] ?? null;
}

function formatTime(ts: number) {
  if (!Number.isFinite(ts)) return "";
  const date = new Date(ts);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getUnreadLabel(chats: ChatRow[]) {
  const total = chats.reduce((acc, c) => acc + (c.unreadCount ?? (c.unread ? 1 : 0)), 0);
  if (total <= 0) return "Sin mensajes nuevos";
  return `${total} nuevos mensajes`;
}

function ChatItem({ item }: { item: ChatRow }) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(noNabvar)/conversationChat/[id]",
          params: { id: item.id, title: item.title, roomId: item.roomId },
        })
      }
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
            {item.title} / {}
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
      {item.unread || (item.unreadCount ?? 0) > 0 ? <View style={styles.unreadDot} /> : <View style={{ width: 10 }} />}
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

      <Pressable onPress={() => router.push({pathname:'/games'})} style={styles.footerBtn}>
        <Text style={styles.footerBtnText}>Explorar juegos</Text>
      </Pressable>
    </View>
  );
}
