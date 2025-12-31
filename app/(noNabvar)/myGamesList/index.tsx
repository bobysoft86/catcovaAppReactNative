import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ImageBackground,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { styles, GREEN, MUTED } from "./styles";
import { OwnedGame } from "@/src/models/game-model";
import { myOwnedGamesList } from "@/src/api/ownedGames";
import { getMyWishedGames } from "@/src/api/wishedGame";
import { RentalModel } from "@/src/models/rental";
import { WishedGameModel } from "@/src/models/wishedGameModel";
import BasicHeader from "@/src/components/basicHeader/basicHeader";

type Mode = "owned" | "wishlist";
type Status = "available" | "rented" | "booked" | "pending";

const { screen, headerRow, iconBtn } = styles;

type MyGameCard = {
  id: string;
  title: string;
  image: string;
  playersText: string; // "3-4 Jugadores"
  durationText: string; // "60-90 min"
  tagLabel: string; // "DISPONIBLE", "PRESTADO", etc.
  tagVariant: Status;
  // Owned-only
  location?: string; // "Estantería A"
  lender?: string; // "María G."revisa 
  // Wishlist-only
  priceText?: string; // "45€"
  releaseText?: string; // "NOV 2024"
};

export default function MyGamesScreen() {
  const insets = useSafeAreaInsets();

  const [mode, setMode] = useState<Mode>("owned");
  const [query, setQuery] = useState("");
  const [ownedGames, setOwnedGames] = useState<OwnedGame[]>()
  const [wishedGames, setwishedGames] = useState<WishedGameModel[]>()

  const isOwned = mode === "owned";
  useEffect(() => {

    const fetchOwnedGamesData = async () => {
      try {
        const OwnedGamesData = await myOwnedGamesList()
        setOwnedGames(OwnedGamesData)
      } catch (error) {

      }
    }
    fetchOwnedGamesData();
  }, []);


  useEffect(() => {

    const fetchWishedGamesData = async () => {
      try {
        const WishedGamesData = await getMyWishedGames()
        setwishedGames(WishedGamesData)
      } catch (error) {

      }
    }
    fetchWishedGamesData();
  }, []);

  const raw = isOwned ? ownedGames : wishedGames;


  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return raw;
    return raw?.filter((g) => g.gameBdd?.translations[0].name.toLowerCase().includes(q));
  }, [raw, query]);

  // stats simples (luego con API real)
  const stats = useMemo(() => {
    if (isOwned) {
      const total = ownedGames?.length;
      const loaned = checkGameStatus(ownedGames)
      return { aLabel: "TOTAL", aValue: String(total), bLabel: "PRESTADOS", bValue: String(loaned) };
    }
    const total = wishedGames?.length;
    const tradable = wishedGames?.length;
    return { aLabel: "TOTAL DESEADOS", aValue: String(total), bLabel: "CAMBIO DISPONIBLE", bValue: String(tradable) };
  }, [isOwned, ownedGames, wishedGames]);

  return (
    <View style={[screen, { paddingTop: insets.top + 60 }]}>
      {/* Header */}
      <BasicHeader
      headerText="MIS JUEGOS"
      icon = "+"
      onRightPress={() => router.push("/(noNabvar)/games/createOwnGame")}

            ></BasicHeader>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>🔎</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={isOwned ? "Buscar en mi colección..." : "Buscar en deseados..."}
          placeholderTextColor="rgba(234,242,238,0.45)"
          style={styles.searchInput}
        />
      </View>

      {/* Toggle Tengo / Deseados */}
      <View style={styles.toggleWrapper}>
        <Pressable
          onPress={() => setMode("owned")}
          style={[styles.toggleBtn, isOwned && styles.toggleBtnActive]}
        >
          <Text style={[styles.toggleText, isOwned && styles.toggleTextActive]}>Tengo</Text>
        </Pressable>

        <Pressable
          onPress={() => setMode("wishlist")}
          style={[styles.toggleBtn, !isOwned && styles.toggleBtnActive]}
        >
          <Text style={[styles.toggleText, !isOwned && styles.toggleTextActive]}>Deseados</Text>
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
          <Text style={styles.statLabel}>{stats.aLabel}</Text>
          <Text style={styles.statValue}>{stats.aValue}</Text>
        </LinearGradient>

        <LinearGradient
          colors={["rgba(255,255,255,0.08)", "rgba(255,255,255,0.03)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.statCard}
        >
          <Text style={styles.statLabel}>{stats.bLabel}</Text>
          <Text style={[styles.statValue, { color: GREEN }]}>{stats.bValue}</Text>
        </LinearGradient>
      </View>

      {/* Section header */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>{isOwned ? "Mi Biblioteca" : "Lista de Deseos"}</Text>

        <Pressable onPress={() => console.log("filter/sort")} style={styles.sectionActionWrap}>
          <Text style={styles.sectionAction}>{isOwned ? "Filtrar" : "Ordenar"}</Text>
        </Pressable>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <GameRowCard
            item={item}
            mode={mode}
            onPrimary={() => {
              if (mode === "owned") {
                // ejemplo: prestar
                console.log("Detalle", item.id);
              } else {
                console.log("Añadir tengo / Avisar", item.id);
              }
            }}
            onSecondary={() => {
              // detalle
              router.push(`/gamesDetail?id=${item.id}`);
            }}
          />
        )}
        ListFooterComponent={<View style={{ height: 120 }} />}
      />
    </View>
  );
}

function GameRowCard({
  item,
  mode,
  onPrimary,
  onSecondary,
}: {
  item: OwnedGame;
  mode: Mode;
  onPrimary: () => void;
  onSecondary: () => void;
}) {
  const tagStyle = checkTagVariant(item);
  
  // item.tagVariant === "available"
    //   ? styles.tagGreen
    //   : item.tagVariant === "loaned"
    //     ? styles.tagYellow
    //     : item.tagVariant === "booked"
    //       ? styles.tagAmber
    //       : item.tagVariant === "expansion"
    //         ? styles.tagBlue
    //         : styles.tagPurple;

  const primaryLabel =
    mode === "owned"
      ? "Detalle"
      : item.tagVariant === "soon"
        ? "Avisar"
        : "Añadir a Tengo";

  const showSecondary = mode === "owned" || checkTagVariant(item) === styles.tagGreen;

  return (
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: item?.gameBdd?.image || "" }}
        style={styles.cardHero}
        imageStyle={styles.cardHeroImg}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.05)", "rgba(0,0,0,0.70)"]}
          style={styles.cardOverlay}
        >
          <View style={[styles.tag, tagStyle]}>
            <Text style={styles.tagText}>{"check Rented"}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.gameBdd?.translations[0].name}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>👥  {item.gameBdd?.minPlayers} - {item.gameBdd?.maxPlayers}</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.metaText}>⏱ {item.gameBdd?.playTime}</Text>
        </View>

        {mode === "owned" ? (
          <View style={styles.subRow}>
            {item.location ? (
              <Text style={styles.subText}>UBICACIÓN{"\n"}{item.location.name}</Text>
            ) : (
              <Text style={styles.subText}>TIENE{"\n"}{  "-"}</Text>
            )}

            <Pressable onPress={onPrimary} style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>{primaryLabel}</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.subRow}>
            <Text style={styles.subText}>
              {item.value ? `${item.value}` : item.value ?? "?????????"}
            </Text>

            <Pressable onPress={onPrimary} style={styles.primaryBtnAlt}>
              <Text style={styles.primaryBtnAltText}>{primaryLabel}</Text>
            </Pressable>

            {showSecondary ? (
              <Pressable onPress={onSecondary} style={styles.secondaryBtn}>
                <Text style={styles.secondaryBtnText}>Detalles</Text>
              </Pressable>
            ) : null}
          </View>
        )}
      </View>
    </View>
  );
}

function checkGameStatus(ownedGames: OwnedGame[] | undefined) {
  let result = ownedGames?.filter((x: OwnedGame) => x?.rentals?.find((x: RentalModel) => x.rentalStatusId === 1)).length ?? 0;
  return result

}

function checkTagVariant(item: OwnedGame) {
  let checkRental = item.rentals
  if (checkRental) {
    if (checkRental.find((x: RentalModel) => x.rentalStatusId === 1)) return styles.tagYellow
    if (checkRental.find((x: RentalModel) => x.rentalStatusId === 2)) return styles.tagAmber
    if (checkRental.find((x: RentalModel) => x.rentalStatusId === 4)) return  styles.tagBlue
  }
  return styles.tagGreen
}

