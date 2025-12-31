import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles, MUTED, GREEN } from "./styles";
import { cancelBooking, confirmBooking, getBookingsToConfirm } from "@/src/api/booking";
import { Image } from "react-native";
import BasicHeader from "@/src/components/basicHeader/basicHeader";

type BookingItem = {
  id: number;
  title: string;
  cover?: string | null;
  requesterName: string;
  requesterType: "ORG" | "PERS";
  requesterLabel: string;
  start: string;
  end: string;
  days: number;
  createdAgo?: string;
};

type APIResponse = {
  rentalsOrgToConfirm?: any[];
  myOwnedGamesBookingToCofirm?: any[];
};

function mapApiToCard(item: any): BookingItem {
  const start = item?.rentDate ?? item?.startDate ?? item?.rent_date;
  const end = item?.returnDate ?? item?.endDate ?? item?.return_date;
  const startDate = start ? new Date(start) : null;
  const endDate = end ? new Date(end) : null;
  const days =
    startDate && endDate
      ? Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
      : 0;
console.log(item)
  return {
    id: item?.id ,
    title: item?.game?.name ?? item?.game.gameBdd?.translations[0].name ?? "Juego",
    cover: item?.game?.gameBdd.thumbnail ?? item?.gameBdd?.thumbnail ?? null,
    requesterName: item?.user?.name ?? item?.requester?.name ?? "Usuario",
    requesterType: item?.game?.locationId ? "ORG" : "PERS",
    requesterLabel: item?.game?.locationId ? item?.game?.location?.name : item?.game?.owner?.name,
    start: startDate?.toLocaleDateString("es-ES", { day: "2-digit", month: "short" }) ?? "--",
    end: endDate?.toLocaleDateString("es-ES", { day: "2-digit", month: "short" }) ?? "--",
    days,
    createdAgo: item?.createdAgo,
  };
}

export default function PendingLoanRequestScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [pending, setPending] = useState<BookingItem[]>([]);
  const [approvedCount, setApprovedCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const filtered = useMemo(() => {
    if (!query.trim()) return pending;
    const q = query.toLowerCase();
    return pending.filter((p) => p.title.toLowerCase().includes(q) || p.requesterName.toLowerCase().includes(q));
  }, [pending, query]);

  const loadData = async () => {
    try {
      setRefreshing(true);
      const res: APIResponse = await getBookingsToConfirm();
      const items = [
        ...(res.rentalsOrgToConfirm ?? []).map(mapApiToCard),
        ...(res.myOwnedGamesBookingToCofirm ?? []).map(mapApiToCard),
      ];
      setPending(items);
      setApprovedCount(0);
    } catch (e) {
      console.error("Error fetching pending loans", e);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAction = async (id: number, action: "CONFIRM" | "REJECT") => {
    
      if(action == "REJECT"){
    try {
      await cancelBooking(id);
      setPending((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      console.error("Error updating booking", e);
    }

      }else{
         try {
      await confirmBooking(id);
      setPending((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      console.error("Error updating booking", e);
    }
      }
    
    
    
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top +50 }]}>
      <BasicHeader
      headerText="SOLICITUDES"
      icon="SYNC"
      ></BasicHeader>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData} tintColor={GREEN} />}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.search}>
          <Text style={{ color: MUTED }}>🔍</Text>
          <TextInput
            placeholder="Buscar solicitud..."
            placeholderTextColor={MUTED}
            value={query}
            onChangeText={setQuery}
            style={styles.searchText}
          />
        </View>

        <View style={styles.statRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Pendientes</Text>
            <Text style={styles.statValue}>{pending.length}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Aprobadas</Text>
            <Text style={[styles.statValue, styles.statAccent]}>{approvedCount}</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recibidas</Text>
          <Text style={styles.sectionLink} onPress={() => loadData()}>
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
                      <Text style={styles.badgeText}>{item.requesterType === "ORG" ? "Organización" : "Personal"}</Text>
                    </View>
                    


                    <View style={styles.typeTag}>
                      <Text style={styles.typeText}>{item.requesterLabel}</Text>
                    </View>
                    <Text style={styles.timeText}>{item.createdAgo ?? ""}</Text>
                  </View>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.requester}>
                    {item.requesterName} solicita préstamo
                  </Text>
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
                <Pressable style={styles.rejectBtn} onPress={() => handleAction(item.id, "REJECT")}>
                  <Text style={styles.rejectText}>Rechazar</Text>
                </Pressable>
                <Pressable style={styles.confirmBtn} onPress={() => handleAction(item.id, "CONFIRM")}>
                  <Text style={styles.confirmText}>Confirmar</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
