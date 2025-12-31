import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, FlatList, Image, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { getOrganizationGameList } from "@/src/api/organization";
import { styles } from "./styles";
import { OwnedGame } from "@/src/models/game-model";
import BasicHeader from "@/src/components/basicHeader/basicHeader";



export default function OrganizationGamesList() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();

  const idParam = params.id as string | string[] | undefined;
  const orgId = Array.isArray(idParam) ? Number(idParam[0]) : Number(idParam);

  const [query, setQuery] = useState("");
  const [games, setGames] = useState<OwnedGame[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted]=useState(true); 


  useEffect(() => {
    if (!Number.isFinite(orgId) || orgId <= 0) {
      setError("Organización no válida");
      return;
    }

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const org = await getOrganizationGameList(orgId);
        console.log("org games:",org );


        if (isMounted) setGames(org.gamesOnDeposit ?? []);
      } catch (err) {
        console.error("Error fetching organization games", err);
        if (isMounted) setError("No se pudieron cargar los juegos");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      setIsMounted(false);
    };
  }, [orgId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return games;
    return games.filter((g: OwnedGame) => g.gameBdd?.translations[0]?.name.toLowerCase().includes(q));
  }, [games, query]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 50 }]}>
         {/* Header */}
            <BasicHeader
            headerText="JUEGOS EN DEPOSITO"

            ></BasicHeader>

      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>🔎</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar en la organización..."
          placeholderTextColor="rgba(234,242,238,0.45)"
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          loading ? (
            <View style={styles.emptyWrap}>
              <ActivityIndicator color="#22C55E" />
            </View>
          ) : error ? (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyText}>{error}</Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{
                uri:
                  item?.gameBdd?.thumbnail ??
                  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=60",
              }}
              style={styles.cardImg}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.gameBdd?.translations[0]?.name}</Text>
              {!!item.code && <Text style={styles.cardSub}>Código: {item.code}</Text>}
              <Text style={styles.cardSub}>Propietario: {item?.owner?.name} </Text>
              <Text style={styles.cardSub}>Status: {item?.status?.name} </Text>

            </View>
          </View>
        )}
        ListEmptyComponent={
          !loading && !error ? (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyText}>No hay juegos en depósito</Text>
            </View>
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
