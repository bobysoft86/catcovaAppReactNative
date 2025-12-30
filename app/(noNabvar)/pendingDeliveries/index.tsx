import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput, RefreshControl, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles, MUTED, GREEN } from "./styles";
import { getDeliveriesToConfirm } from "@/src/api/rental";
import { activeRentalDeliveriStatus } from "@/src/api/booking";
import { createRentalchatRoom } from "@/src/api/chat";
import { router } from "expo-router";


type DeliveryAction = "DELIVER" | "CONFIRM";

type DeliveryItem = {
  id: number;
  title: string;
  requesterName: string;
  requesterLabel: string;
  requesterId: number;
  start: string;
  end: string;
  days: number;
  createdAgo?: string;
  action: DeliveryAction;
};

function mapApiToCard(item: any, action: DeliveryAction): DeliveryItem {
  const start = item?.rentDate ?? item?.startDate ?? item?.rent_date;
  const end = item?.returnDate ?? item?.endDate ?? item?.return_date;
  const startDate = start ? new Date(start) : null;
  const endDate = end ? new Date(end) : null;
  const days =
    startDate && endDate
      ? Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
      : 0;

  return {
    id: item?.id,
    title: item?.game?.name ?? item?.game?.gameBdd?.translations?.[0]?.name ?? "Juego",
    requesterName: item?.user?.name ?? item?.requester?.name ?? "Usuario",
    requesterId: item?.user?.id ?? item?.requester?.id ?? 0,
    requesterLabel: item?.game?.location?.name ?? item?.game?.owner?.name ?? "Personal",
    start: startDate?.toLocaleDateString("es-ES", { day: "2-digit", month: "short" }) ?? "--",
    end: endDate?.toLocaleDateString("es-ES", { day: "2-digit", month: "short" }) ?? "--",
    days,
    createdAgo: item?.createdAgo,
    action,
  };
}

export default function PendingDeliveriesScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [deliveries, setDeliveries] = useState<DeliveryItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [approvedCount, setApprovedCount] = useState(0);

  const filtered = useMemo(() => {
    if (!query.trim()) return deliveries;
    const q = query.toLowerCase();
    return deliveries.filter(
      (p) => p.title.toLowerCase().includes(q) || p.requesterName.toLowerCase().includes(q)
    );
  }, [deliveries, query]);

  const loadData = async () => {
    try {
      setRefreshing(true);
      const res = await getDeliveriesToConfirm();
      const items = [
        ...(res?.myOrgsDeliveries ?? []).map((item: any) => mapApiToCard(item, "DELIVER")),
        ...(res?.myDeliveries ?? []).map((item: any) => mapApiToCard(item, "CONFIRM")),
      ];
      setDeliveries(items);
      setApprovedCount(res?.approvedCount ?? 0);
    } catch (e) {
      console.error("Error fetching pending deliveries", e);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);


  async function goToRentalChat(data: DeliveryItem) {
    try {
      console.log(data)

      const room = await createRentalchatRoom(data.requesterId, data.id)
      console.log(room)
      router.push({
        pathname: "/(noNabvar)/conversationChat/[id]",
        params: { id: room.id, title: data.title, roomId: room.roomId },
      })

    } catch (error) {
      console.error("Error getting rental roolm", error);

    }
    return
  }

  const handleAction = async (item: DeliveryItem) => {
    try {
      await activeRentalDeliveriStatus(item.id);
      setDeliveries((prev) => prev.filter((p) => p.id !== item.id));
    } catch (e) {
      console.error("Error updating delivery", e);
      Alert.alert("Error", "No se pudo actualizar la entrega.");
    }
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData} tintColor={GREEN} />}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.h1}>Entregas</Text>
          <Pressable style={styles.bell} onPress={loadData}>
            <Text style={styles.bellText}>SYNC</Text>
          </Pressable>
        </View>

        <View style={styles.search}>
          <Text style={{ color: MUTED }}>🔍</Text>
          <TextInput
            placeholder="Buscar entrega..."
            placeholderTextColor={MUTED}
            value={query}
            onChangeText={setQuery}
            style={styles.searchText}
          />
        </View>

        <View style={styles.statRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Pendientes</Text>
            <Text style={styles.statValue}>{deliveries.length}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Confirmadas</Text>
            <Text style={[styles.statValue, styles.statAccent]}>{approvedCount}</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recibidas</Text>
          <Text style={styles.sectionLink} onPress={loadData}>
            Ver todas
          </Text>
        </View>

        <View style={{ gap: 12 }}>
          {filtered.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={{ gap: 6, flex: 1 }}>
                  <View style={styles.badgeRow}>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {item.action === "DELIVER" ? "Debes entregar" : "Confirmar recepción"}
                      </Text>
                    </View>
                    <View style={styles.typeTag}>
                      <Text style={styles.typeText}>{item.requesterLabel}</Text>
                    </View>
                    <Text style={styles.timeText}>{item.createdAgo ?? ""}</Text>
                  </View>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.requester}>{item.requesterName}</Text>
                </View>
              </View>

              <View style={styles.dateRow}>
                <View style={styles.dot} />
                <Text style={styles.dateText}>
                  {item.start} - {item.end}
                </Text>
                <Text style={styles.dateSub}>({item.days} días)</Text>
              </View>

              <View style={styles.actions}>
                <Pressable
                  style={styles.rejectBtn}
                  onPress={() => goToRentalChat(item)}
                >
                  <Text style={styles.rejectText}>Contactar</Text>
                </Pressable>
                <Pressable style={styles.confirmBtn} onPress={() => handleAction(item)}>
                  <Text style={styles.confirmText}>
                    {item.action === "DELIVER" ? "Entregar" : "Confirmar"}
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
