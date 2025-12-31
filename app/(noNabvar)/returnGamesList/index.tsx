import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput, RefreshControl, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles, MUTED, GREEN } from "./styles";
import { completeRental, getReturnsToConfirm } from "@/src/api/rental";

import { getUserData } from "@/src/storage/authStorage";
import { RentalModel } from "@/src/models/rental";
import { UserModel } from "@/src/models/user-model";
import BasicHeader from "@/src/components/basicHeader/basicHeader";

type ReturnItem = {
  id: number;
  title: string;
  requesterName: string;
  requesterRole: string;
  type: "RETURN_TO_ME" | "RETURN_BY_ME";
  start: string;
  end: string;
  days: number;
  createdAgo?: string;
};

function mapApi(item: RentalModel, userLogged: UserModel | null, isOrg?:boolean): ReturnItem {
  console.log("data",
    isOrg,userLogged,item
  )
  const start = item?.rentDate;
  const end = item?.returnDate;
  const startDate = start ? new Date(start) : null;
  const endDate = end ? new Date(end) : null;
  const days =
    startDate && endDate
      ? Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
      : 0;
 const createdAgo = new Date (item?.createdAt) 
  // type heuristic: si soy owner -> espero devolución; si soy borrower -> debo devolver
  const type: "RETURN_TO_ME" | "RETURN_BY_ME" =
    userLogged && item?.userId === userLogged.id ?  "RETURN_BY_ME" : "RETURN_TO_ME";


  return {
    id: item?.id ?? Math.random(),
    title: item?.game.gameBdd?.translations[0].name ?? "Juego",
    requesterName: type === "RETURN_TO_ME" ? item?.user?.name ?? "no name" : isOrg ? item?.game.location?.name ?? "no name" : item?.game?.owner?.name ?? "no name",
    requesterRole: isOrg ? `ORG  ${item?.game.location?.name}` : "PERSONAL",
    type,
    start: startDate?.toLocaleDateString("es-ES", { day: "2-digit", month: "short" }) ?? "--",
    end: endDate?.toLocaleDateString("es-ES", { day: "2-digit", month: "short" }) ?? "--",
    days,
    createdAgo: createdAgo.toLocaleDateString("es-ES", { day: "2-digit", month: "short" }) ?? "--",
  };
}

export default function ReturnGamesListScreen() {
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState<ReturnItem[]>([]);
  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [approvedCount, setApprovedCount] = useState(0);
  const [userLogged, setUserLogged] = useState<UserModel | null>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((x) => x.title.toLowerCase().includes(q) || x.requesterName.toLowerCase().includes(q));
  }, [items, query]);


  const loadData = async () => {
    if (!userLogged) return;
    try {
      setRefreshing(true);
      const res = await getReturnsToConfirm();
      console.log(res)
            const mapped = [
        ...(res?.myOrgsReturns ?? []).map((item: any) => mapApi(item, userLogged,true)),
        ...(res?.myReturns ?? []).map((item: any) => mapApi(item, userLogged,false)),
        ...(res?.myOwnedGamesReturns ?? []).map((item: any) => mapApi(item, userLogged,false)),
      ];
      setItems(mapped);
      setApprovedCount(res?.approvedCount ?? 0);
    } catch (e) {
      console.error("Error fetching returns list", e);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      const u = await getUserData<UserModel>();
      if (!mounted) return;
      setUserLogged(u);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    loadData();
  }, [userLogged?.id]);

  const handleAction = async (id: number, type: ReturnItem["type"]) => {
    try {
      const action = type === "RETURN_BY_ME" ? "RETURN" : "CONFIRM";
       await completeRental(id, action);
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (e) {
      console.error("Error updating return", e);
      Alert.alert("Error", "No se pudo actualizar la devolución.");
    }
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 50 }]}>
    
    
       <BasicHeader
          headerText="DEVOLUCIONES"
          icon="SYNC"
          ></BasicHeader>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData} tintColor={GREEN} />}
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
            <Text style={styles.statValue}>{items.length}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Confirmadas</Text>
            <Text style={[styles.statValue, styles.statAccent]}>{approvedCount}</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recibidas</Text>
          <Text style={styles.sectionLink} onPress={loadData}>
            Refrescar
          </Text>
        </View>

        <View style={{ gap: 12 }}>
          {filtered.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.titleWrap}>
                  <View style={styles.badgeRow}>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {item.type === "RETURN_BY_ME" ? "Debes devolver" : "Te devolverán"}
                      </Text>
                    </View>
                    <View style={styles.typeTag}>
                      <Text style={styles.typeText}>{item.requesterRole}</Text>
                    </View>
                    <Text style={styles.metaText}>{item.createdAgo ?? "fechas"}</Text>
                  </View>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.metaText}>{item.requesterName}</Text>
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
                <Pressable style={styles.contactBtn} onPress={() => Alert.alert("Contactar", `Contactar con ${item.requesterName}`)}>
                  <Text style={styles.contactText}>Contactar</Text>
                </Pressable>
                <Pressable
                  style={styles.confirmBtn}
                  onPress={() => handleAction(item.id, item.type)}
                >
                  <Text style={styles.confirmText}>
                    {item.type === "RETURN_BY_ME" ? "Devolver" : "Confirmar"}
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
