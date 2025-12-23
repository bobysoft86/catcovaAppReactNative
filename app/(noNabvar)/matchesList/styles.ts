import { StyleSheet } from "react-native";
import { colors } from "@/src/theme/colors";

export const BG = colors.background;
export const CARD = colors.card;
export const BORDER = colors.border;
export const TEXT = colors.text;
export const MUTED = colors.muted;
export const GREEN = colors.primary;
export const GREEN_DARK = colors.greenDark;

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  content: { padding: 16, gap: 14, paddingBottom: 32 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  h1: { color: TEXT, fontSize: 24, fontWeight: "900" },
  refreshBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  refreshText: { color: TEXT, fontSize: 14, fontWeight: "900" },

  search: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: { color: TEXT, fontSize: 14, flex: 1 },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: { color: TEXT, fontSize: 16, fontWeight: "900" },
  sectionLink: { color: GREEN, fontSize: 13, fontWeight: "800" },

  card: {
    backgroundColor: CARD,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 12,
    gap: 8,
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  gameName: { color: TEXT, fontSize: 16, fontWeight: "900" },
  playerName: { color: MUTED, fontSize: 13, fontWeight: "800" },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: MUTED },
  metaText: { color: TEXT, fontSize: 13, fontWeight: "800" },
  metaSub: { color: MUTED, fontSize: 12, fontWeight: "700" },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(34,197,94,0.16)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.35)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: { color: "#B7F7D0", fontSize: 11, fontWeight: "900" },
});
