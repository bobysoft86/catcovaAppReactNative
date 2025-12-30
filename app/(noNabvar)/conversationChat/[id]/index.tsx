import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
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
import { styles } from "./styles";

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
  const lastReadEventIdRef = useRef<string | null>(null);
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

    const markAsRead = async (event: EventLike) => {
      const eventId = event?.getId?.();
      if (!eventId || lastReadEventIdRef.current === eventId) return;
      lastReadEventIdRef.current = eventId;

      try {
        if (client.sendReadReceipt) {
          await client.sendReadReceipt(event, "m.read");
        }
        if (client.setRoomReadMarkers) {
          await client.setRoomReadMarkers(roomId, eventId);
        }
      } catch (e) {
        console.warn("sendReadReceipt error:", e);
      }
    };

    const loadInitial = () => {
      try {
        const room = client.getRoom?.(roomId);
        const evs = room?.getLiveTimeline?.()?.getEvents?.() ?? [];
        const msgEvs = evs.filter(isMessageEvent);
        if (mounted) setMessages(msgEvs);
        const last = msgEvs[msgEvs.length - 1];
        if (last) markAsRead(last);
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

      const sender = event?.getSender?.();
      if (sender && sender === client.getUserId?.()) return;
      markAsRead(event);
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
