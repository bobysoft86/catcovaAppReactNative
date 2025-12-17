import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

const BG = "#0B1713";
const CARD = "rgba(255,255,255,0.06)";
const BORDER = "rgba(255,255,255,0.10)";
const TEXT = "#EAF2EE";
const MUTED = "rgba(234,242,238,0.65)";
const GREEN = "#22C55E";

type LocationItem =
  | {
      id: string;
      type: "store";
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
  | {
      id: string;
      type: "community";
      name: string;
      sub: string; // "Community Center"
      priceText: string; // "Free"
      distance: string;
      status: "available" | "back";
      statusText: string;
      notifyText: string; // "Notify when available"
    };

export default function RequestLoanScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [tab, setTab] = useState<"nearest" | "cheapest" | "stores">("nearest");

  // Mock del juego (luego API por id)
  const game = useMemo(
    () => ({
      title: "Catan: Seafarers",
      subtitle: "Expansion Pack · 3-4 Players",
      badge: "High Demand",
      cover:
        "https://images.unsplash.com/photo-1611371805429-8b5c1f3d7f9f?auto=format&fit=crop&w=1200&q=60",
      nearbyCount: 3,
    }),
    [id]
  );

  const locations = useMemo<LocationItem[]>(
    () => [
      {
        id: "l1",
        type: "store",
        name: "The Dice & Meeple",
        sub: "Game Store • Verified",
        priceText: "$5/day",
        distance: "1.2 km",
        status: "available",
        statusText: "Available Now",
        hours: "Open until 9PM",
        verified: true,
        ctaPrimaryText: "Reserve Now",
      },
      {
        id: "l2",
        type: "user",
        name: "Alex's Collection",
        sub: "Alex's Collection",
        priceText: "$3/day",
        distance: "0.5 km",
        rating: "4.9",
        reviews: "(24 reviews)",
        ctaLeft: "Details",
        ctaRight: "Request",
      },
      {
        id: "l3",
        type: "community",
        name: "Uptown Library",
        sub: "Community Center",
        priceText: "Free",
        distance: "2.4 km",
        status: "back",
        statusText: "Back in 2 days",
        notifyText: "Notify when available",
      },
    ],
    []
  );

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.iconBtn} hitSlop={10}>
          <Text style={styles.iconText}>←</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Local Availability</Text>

        <Pressable onPress={() => console.log("filters")} style={styles.iconBtn} hitSlop={10}>
          <Text style={styles.iconText}>⚙︎</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.heroWrap}>
          <ImageBackground source={{ uri: game.cover }} style={styles.hero} imageStyle={styles.heroImg}>
            <LinearGradient
              colors={["rgba(0,0,0,0.10)", "rgba(0,0,0,0.78)"]}
              style={styles.heroOverlay}
            >
              <View style={styles.badge}>
                <Text style={styles.badgeText}>⚡ {game.badge}</Text>
              </View>

              <Text style={styles.title}>{game.title}</Text>
              <Text style={styles.subtitle}>{game.subtitle}</Text>
            </LinearGradient>
          </ImageBackground>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TabButton label="Nearest" active={tab === "nearest"} onPress={() => setTab("nearest")} />
          <TabButton label="Cheapest" active={tab === "cheapest"} onPress={() => setTab("cheapest")} />
          <TabButton label="Stores" active={tab === "stores"} onPress={() => setTab("stores")} />
        </View>

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
          <Text style={styles.listTitle}>{game.nearbyCount} Locations Nearby</Text>
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

function LocationCard({ item }: { item: LocationItem }) {
  if (item.type === "store") {
    return (
      <View style={styles.locCard}>
        <View style={styles.locTopRow}>
          <View style={styles.locLeft}>
            <View style={styles.locIcon}>
              <Text style={{ fontSize: 14 }}>🏬</Text>
            </View>
            <View style={{ gap: 2 }}>
              <Text style={styles.locTitle}>{item.name}</Text>
              <Text style={styles.locSub}>{item.sub}</Text>
            </View>
          </View>

          <View style={styles.locRight}>
            <Text style={styles.price}>{item.priceText}</Text>
            <Text style={styles.perDay}>/day</Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaPill}>
            <View style={[styles.dot, { backgroundColor: GREEN }]} />
            <Text style={styles.metaText}>{item.statusText}</Text>
          </View>
          {item.hours ? (
            <View style={styles.metaPill}>
              <Text style={styles.metaText}>🕘 {item.hours}</Text>
            </View>
          ) : null}
          <View style={styles.metaPill}>
            <Text style={styles.metaText}>📍 {item.distance}</Text>
          </View>
        </View>

        <Pressable onPress={() => console.log("reserve")} style={styles.primaryCta}>
          <Text style={styles.primaryCtaText}>{item.ctaPrimaryText}</Text>
          <Text style={styles.primaryCtaArrow}>→</Text>
        </Pressable>
      </View>
    );
  }

  if (item.type === "user") {
    return (
      <View style={styles.locCard}>
        <View style={styles.locTopRow}>
          <View style={styles.locLeft}>
            <View style={styles.userAvatar}>
              <Text style={{ fontSize: 14 }}>🙂</Text>
            </View>
            <View style={{ gap: 2 }}>
              <Text style={styles.locTitle}>{item.name}</Text>
              <Text style={styles.locSub}>
                ⭐ {item.rating} {item.reviews}
              </Text>
            </View>
          </View>

          <View style={styles.locRight}>
            <Text style={styles.price}>{item.priceText}</Text>
            <Text style={styles.perDay}>/day</Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaPill}>
            <Text style={styles.metaText}>📍 {item.distance}</Text>
          </View>
        </View>

        <View style={styles.dualRow}>
          <Pressable onPress={() => console.log("details")} style={styles.secondaryBtn}>
            <Text style={styles.secondaryText}>{item.ctaLeft}</Text>
          </Pressable>
          <Pressable onPress={() => console.log("request")} style={styles.secondaryBtnActive}>
            <Text style={styles.secondaryTextActive}>{item.ctaRight}</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // community
  return (
    <View style={[styles.locCard, { opacity: item.status === "back" ? 0.75 : 1 }]}>
      <View style={styles.locTopRow}>
        <View style={styles.locLeft}>
          <View style={styles.locIcon}>
            <Text style={{ fontSize: 14 }}>🏛️</Text>
          </View>
          <View style={{ gap: 2 }}>
            <Text style={styles.locTitle}>{item.name}</Text>
            <Text style={styles.locSub}>{item.sub}</Text>
          </View>
        </View>

        <View style={styles.locRight}>
          <Text style={styles.price}>{item.priceText}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaPillDanger}>
          <Text style={styles.metaDangerText}>⏳ {item.statusText}</Text>
        </View>
        <View style={styles.metaPill}>
          <Text style={styles.metaText}>📍 {item.distance}</Text>
        </View>
      </View>

      <Pressable onPress={() => console.log("notify")} style={styles.notifyBtn}>
        <Text style={styles.notifyText}>🔔 {item.notifyText}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },

  header: {
    paddingHorizontal: 16,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: TEXT, fontSize: 16, fontWeight: "900" },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: { color: TEXT, fontSize: 16, fontWeight: "900" },

  content: { paddingHorizontal: 18, gap: 12 },

  heroWrap: { borderRadius: 26, overflow: "hidden", borderWidth: 1, borderColor: BORDER },
  hero: { height: 160, width: "100%" },
  heroImg: { borderRadius: 26 },
  heroOverlay: { flex: 1, padding: 16, justifyContent: "flex-end", gap: 6 },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(34,197,94,0.18)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.30)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: { color: "#B7F7D0", fontSize: 11, fontWeight: "900" },

  title: { color: TEXT, fontSize: 22, fontWeight: "900" },
  subtitle: { color: MUTED, fontSize: 12, fontWeight: "600" },

  tabs: { flexDirection: "row", gap: 10, marginTop: 6 },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
  },
  tabActive: { backgroundColor: GREEN, borderColor: "rgba(34,197,94,0.35)" },
  tabText: { color: MUTED, fontSize: 12, fontWeight: "900" },
  tabTextActive: { color: "#052B1C" },

  mapWrap: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 22,
    padding: 12,
    position: "relative",
    overflow: "hidden",
  },
  mapFake: {
    height: 150,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  mapText: { color: MUTED, fontWeight: "800" },
  expandMap: {
    position: "absolute",
    right: 14,
    bottom: 14,
    backgroundColor: "rgba(0,0,0,0.35)",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  expandMapText: { color: TEXT, fontSize: 11, fontWeight: "900" },
  expandMapArrow: { color: TEXT, fontSize: 16, marginTop: -2, fontWeight: "900" },

  listHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 },
  listTitle: { color: TEXT, fontSize: 14, fontWeight: "900" },
  viewAll: { color: GREEN, fontSize: 12, fontWeight: "900" },

  locCard: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 22,
    padding: 14,
    gap: 10,
  },
  locTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  locLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  locIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "rgba(34,197,94,0.14)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.30)",
    alignItems: "center",
    justifyContent: "center",
  },
  locTitle: { color: TEXT, fontSize: 14, fontWeight: "900" },
  locSub: { color: MUTED, fontSize: 12, fontWeight: "600" },

  locRight: { flexDirection: "row", alignItems: "baseline", gap: 3 },
  price: { color: GREEN, fontSize: 14, fontWeight: "900" },
  perDay: { color: MUTED, fontSize: 12, fontWeight: "800" },

  metaRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  metaPill: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: { color: MUTED, fontSize: 11, fontWeight: "800" },
  dot: { width: 7, height: 7, borderRadius: 99 },

  primaryCta: {
    marginTop: 4,
    backgroundColor: GREEN,
    borderRadius: 999,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  primaryCtaText: { color: "#052B1C", fontSize: 14, fontWeight: "900" },
  primaryCtaArrow: { color: "#052B1C", fontSize: 16, fontWeight: "900" },

  dualRow: { flexDirection: "row", gap: 10, marginTop: 4 },
  secondaryBtn: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryText: { color: TEXT, fontSize: 13, fontWeight: "900" },
  secondaryBtnActive: {
    flex: 1,
    backgroundColor: "rgba(34,197,94,0.16)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.30)",
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryTextActive: { color: "#B7F7D0", fontSize: 13, fontWeight: "900" },

  metaPillDanger: {
    backgroundColor: "rgba(255, 77, 77, 0.10)",
    borderWidth: 1,
    borderColor: "rgba(255, 77, 77, 0.22)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  metaDangerText: { color: "rgba(255, 150, 150, 0.95)", fontSize: 11, fontWeight: "900" },

  notifyBtn: {
    marginTop: 2,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
  },
  notifyText: { color: MUTED, fontSize: 12, fontWeight: "900" },
});