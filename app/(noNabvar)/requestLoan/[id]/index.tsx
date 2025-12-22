import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, ImageBackground, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { styles, GREEN } from "./styles";
import { GameBdd, OwnedGame } from "@/src/models/game-model";
import { getGameRentalAvibility } from "@/src/api/rental";
import { OrganizationModel } from "@/src/models/organization-model";


type LocationItem =
  | {
      id: string;
      type: "organization";
      name: string;
      sub: string;
      priceText: string; // "$5/day" o "Free"
      distance: string; // "1.2 km"
      status: "available" | "back";
      statusText: string; // "Available Now" o "Back in 2 days"
      hours?: string; // "Open until 9PM"
      verified?: boolean;
      ctaPrimaryText: string; // "Reserve Now"
    }
  | {
      id: string;
      type: "user";
      name: string;
      sub: string; // "Alex's Collection"
      priceText: string; // "$3/day"
      distance: string;
      rating?: string; // "4.9"
      reviews?: string; // "(24 reviews)"
      ctaLeft: string; // "Details"
      ctaRight: string; // "Request"
    }


export default function RequestLoanScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [tab, setTab] = useState<"nearest" | "cheapest" | "stores">("nearest");
  const [game, setGame] =  useState<GameBdd| null>(null)
  const [locations, setLocations] =  useState<OwnedGame[] >([])

  // Mock del juego (luego API por id)
  //  game = useMemo(
  //   () => ({
  //     title: "Catan: Seafarers",
  //     subtitle: "Expansion Pack · 3-4 Players",
  //     badge: "High Demand",
  //     cover:
  //       "https://images.unsplash.com/photo-1611371805429-8b5c1f3d7f9f?auto=format&fit=crop&w=1200&q=60",
  //     nearbyCount: 3,
  //   }),
  //   [id]
  // );

  // const locations = useMemo<LocationItem[]>(
  //   () => [
  //     {
  //       id: "l1",
  //       type: "organization",
  //       name: "The Dice & Meeple",
  //       sub: "Game Store • Verified",
  //       priceText: "$5/day",
  //       distance: "1.2 km",
  //       status: "available",
  //       statusText: "Available Now",
  //       hours: "Open until 9PM",
  //       verified: true,
  //       ctaPrimaryText: "Reserve Now",
  //     },
  //     {
  //       id: "l2",
  //       type: "user",
  //       name: "Alex's Collection",
  //       sub: "Alex's Collection",
  //       priceText: "$3/day",
  //       distance: "0.5 km",
  //       rating: "4.9",
  //       reviews: "(24 reviews)",
  //       ctaLeft: "Details",
  //       ctaRight: "Request",
  //     },
  //     {
  //       id: "l3",
  //       type: "community",
  //       name: "Uptown Library",
  //       sub: "Community Center",
  //       priceText: "Free",
  //       distance: "2.4 km",
  //       status: "back",
  //       statusText: "Back in 2 days",
  //       notifyText: "Notify when available",
  //     },
  //   ],
  //   []
  // );



useEffect(()=>{
  const fetchAllData = async () =>{
    try {
      
      const getAllData = await getGameRentalAvibility(id)
       setGame(getAllData.gameBDD)
      setLocations(getAllData.aviavilities)
console.log(getAllData)
    } catch (error) {
      
    }
  }
fetchAllData();
},[]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.iconBtn} hitSlop={10}>
          <Text style={styles.iconText}>←</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Disponibilidad</Text>

        <Pressable onPress={() => console.log("filters")} style={styles.iconBtn} hitSlop={10}>
          <Text style={styles.iconText}>⚙︎</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.heroWrap}>
          <ImageBackground source={{ uri: game?.image || "" }} style={styles.hero} imageStyle={styles.heroImg}>
            <LinearGradient
              colors={["rgba(0,0,0,0.10)", "rgba(0,0,0,0.78)"]}
              style={styles.heroOverlay}
            >


              <Text style={styles.title}>{game?.translations[0].name}</Text>
              {/* <Text style={styles.subtitle}>{game.subtitle}</Text> */}
            </LinearGradient>
          </ImageBackground>
        </View>


      {/* 
        Tabs 
        <View style={styles.tabs}>
          <TabButton label="Nearest" active={tab === "nearest"} onPress={() => setTab("nearest")} />
          <TabButton label="Cheapest" active={tab === "cheapest"} onPress={() => setTab("cheapest")} />
          <TabButton label="Stores" active={tab === "stores"} onPress={() => setTab("stores")} />
        </View> 
        
        */}

        {/* Map placeholder */}
        <View style={styles.mapWrap}>
          <View style={styles.mapFake}>
            <Text style={styles.mapText}>🗺️ Map preview</Text>
          </View>

          <Pressable onPress={() => console.log("expand map")} style={styles.expandMap}>
            <Text style={styles.expandMapText}>Expand Map</Text>
            <Text style={styles.expandMapArrow}>›</Text>
          </Pressable>
        </View>

        {/* List header */}
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>{locations?.length} Localizaciones disponibles</Text>
          <Pressable onPress={() => console.log("view all")}>
            <Text style={styles.viewAll}>View all</Text>
          </Pressable>
        </View>

        {/* Locations */}
        <View style={{ gap: 12 }}>
          {locations.map((loc) => (
            <LocationCard key={loc.id} item={loc} />
          ))}
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>
    </View>
  );
}

function TabButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.tab, active && styles.tabActive]}>
      <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
    </Pressable>
  );
}

function LocationCard({ item }: { item: OwnedGame }) {
  if (item.location ) {
    return (
      <View style={styles.locCard}>
        <View style={styles.locTopRow}>
          <View style={styles.locLeft}>
            <View style={styles.locIcon}>
              <Text style={{ fontSize: 14 }}>🏬</Text>
            </View>
            <View style={{ gap: 2 }}>
              <Text style={styles.locTitle}>{item.location.name.toLocaleUpperCase()}</Text>
              <Text style={styles.locSub}>{item.owner?.name}</Text>
            </View>
          </View>

          <View style={styles.locRight}>
            <Text style={styles.price}>FREE</Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaPill}>
            <View style={[styles.dot, { backgroundColor: GREEN }]} />
            <Text style={styles.metaText}>{item.status?.name}</Text>
          </View>
          {item.location.openingRules ? (
            <View style={styles.metaPill}>
              <Text style={styles.metaText}>🕘 {item?.location?.openingRules[0]?.weekday}</Text>
            </View>
          ) : null}
          {/* <View style={styles.metaPill}>
            <Text style={styles.metaText}>📍 {item.distance}</Text>
          </View> */}
        </View>

        <Pressable
          onPress={() =>
            router.push({
              pathname: "/(noNabvar)/requestLoan/confirm",
              params: {
                id: item.id,
                openingRules: JSON.stringify(item.location?.openingRules ?? []),
              },
            })
          }
          style={styles.primaryCta}
        >
          <Text style={styles.primaryCtaText}>Reservar</Text>
          <Text style={styles.primaryCtaArrow}>→</Text>
        </Pressable>
      </View>
    );
  }

  if (!item.location) {
    return (
      <View style={styles.locCard}>
        <View style={styles.locTopRow}>
          <View style={styles.locLeft}>
            <View style={styles.userAvatar}>
              <Text style={{ fontSize: 14 }}>🙂</Text>
            </View>
            <View style={{ gap: 2 }}>
              <Text style={styles.locTitle}>{item.owner?.name}</Text>
              <Text style={styles.locSub}>
                Espacio para ratings de Usuario
                {/* ⭐ {item.rating} {item.reviews} */}
              </Text>
            </View>
          </View>

          <View style={styles.locRight}>
            <Text style={styles.price}>FREE</Text>
            <Text style={styles.perDay}></Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaPill}>
             <Text style={styles.metaText}>📍 espacio para distancia</Text> 
            {/* <Text style={styles.metaText}>📍 {item.distance}</Text> */}
          </View>
        </View>

        <View style={styles.dualRow}>
          <Pressable onPress={() => console.log("details")} style={styles.secondaryBtn}>
            <Text style={styles.secondaryText}>Detalles</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/(noNabvar)/requestLoan/confirm",
                params: {
                  id: item.id,
                  openingRules: JSON.stringify(item.location?.openingRules ?? []),
                },
              })
            }
            style={styles.secondaryBtnActive}
          >
            <Text style={styles.secondaryTextActive}>Reservar</Text>
          </Pressable>
        </View>
      </View>
    );
  }


}
