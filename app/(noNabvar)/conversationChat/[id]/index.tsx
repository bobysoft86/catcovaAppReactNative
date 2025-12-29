import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/src/theme/colors";
import { useMatrix } from "@/src/matrix/matrixProvider";

type EventLike = any;

function isMessageEvent(ev: EventLike) {
  return ev?.getType?.() === "m.room.message" && !!ev?.getContent?.()?.body;
}

export default function ChatDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ id?: string; title?: string; roomId?: string }>();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<EventLike[]>([]);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const listRef = useRef<FlatList<EventLike>>(null);
  const { client } = useMatrix();

  const title = useMemo(() => {

    if (params?.title && String(params.title).trim().length) return String(params.title);
    return params?.roomId ?? "Chat";
  }, [params?.title, params?.roomId]);
  const roomId = typeof params?.roomId === "string" ? params.roomId : "";

  useEffect(() => {
    if (!client || !roomId) return;

    let mounted = true;
    setLoadingMsgs(true);

    const loadInitial = () => {
      try {
        const room = client.getRoom?.(roomId);
        const evs = room?.getLiveTimeline?.()?.getEvents?.() ?? [];
        const msgEvs = evs.filter(isMessageEvent);
        if (mounted) setMessages(msgEvs);
      } catch (e) {
        console.warn("Error loadInitial messages:", e);
      } finally {
        if (mounted) setLoadingMsgs(false);
      }
    };

    loadInitial();

    const onTimeline = (event: any, room: any, toStartOfTimeline: boolean) => {
      if (!mounted) return;
      if (toStartOfTimeline) return;
      if (!room || room.roomId !== roomId) return;
      if (!isMessageEvent(event)) return;

      setMessages((prev) => {
        const id = event.getId?.();
        if (id && prev.some((p) => p.getId?.() === id)) return prev;
        return [...prev, event];
      });
    };

    client.on?.("Room.timeline", onTimeline);

    return () => {
      mounted = false;
      try {
        client.removeListener?.("Room.timeline", onTimeline);
      } catch {}
    };
  }, [client, roomId]);

  useEffect(() => {
    if (loadingMsgs) return;
    const id = setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 0);
    return () => clearTimeout(id);
  }, [messages.length, loadingMsgs]);

  const send = async () => {
    if (!client || !roomId) return;
    const body = text.trim();
    if (!body) return;
    setText("");
    try {
      await client.sendEvent?.(roomId, "m.room.message", {
        msgtype: "m.text",
        body,
      });
    } catch (e) {
      console.warn("sendEvent error:", e);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { paddingTop: insets.top }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>Volver</Text>
        </Pressable>
        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {roomId}
          </Text>
        </View>
      </View>

      {!client ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Conectando a Matrix…</Text>
        </View>
      ) : loadingMsgs ? (
        <View style={styles.empty}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item, idx) => item.getId?.() ?? String(idx)}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          renderItem={({ item }) => {
            const content = item.getContent?.() ?? {};
            const sender = item.getSender?.() ?? "";
            const body = content.body ?? "";
            const mine = !!sender && sender === client.getUserId?.();
            return (
              <View style={[styles.bubble, mine ? styles.bubbleMine : styles.bubbleOther]}>
                <Text style={styles.sender}>{sender}</Text>
                <Text style={styles.body}>{body}</Text>
              </View>
            );
          }}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>Escribe el primer mensaje.</Text>
            </View>
          }
        />
      )}

      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Escribe un mensaje…"
          placeholderTextColor={colors.muted}
          style={styles.input}
        />
        <Pressable onPress={send} style={styles.sendBtn}>
          <Text style={styles.sendText}>Enviar</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backBtn: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.greenDark,
  },
  backText: { color: colors.text, fontWeight: "700", fontSize: 12 },
  headerText: { flex: 1 },
  title: { color: colors.text, fontSize: 16, fontWeight: "800" },
  subtitle: { color: colors.muted, fontSize: 12, marginTop: 2 },
  list: { padding: 16, gap: 10 },
  bubble: {
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
  },
  bubbleMine: {
    alignSelf: "flex-end",
    borderColor: colors.primary,
    backgroundColor: colors.greenDark,
  },
  bubbleOther: {
    alignSelf: "flex-start",
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  sender: { color: colors.accent, fontSize: 11, fontWeight: "700", marginBottom: 4 },
  body: { color: colors.text, fontSize: 14 },
  empty: { alignItems: "center", marginTop: 40 },
  emptyText: { color: colors.muted, fontSize: 12, fontWeight: "600" },
  inputRow: {
    flexDirection: "row",
    gap: 8,
    padding: 12,
    borderTopWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.text,
    backgroundColor: colors.background,
  },
  sendBtn: {
    paddingHorizontal: 14,
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  sendText: { fontWeight: "800", color: colors.background },
});
