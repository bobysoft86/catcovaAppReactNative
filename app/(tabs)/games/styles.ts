import { Dimensions, StyleSheet } from "react-native";
import { colors } from "@/src/theme/colors";

export const BG = colors.background;
export const CARD = colors.card;
export const BORDER = colors.border;
export const TEXT = colors.text;
export const MUTED = colors.muted;
export const GREEN = colors.primary;

const { width } = Dimensions.get("window");
const GAP = 12;
const H_PADDING = 18;
const CARD_W = (width - H_PADDING * 2 - GAP) / 2;

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },

  top: { paddingHorizontal: 18, gap: 12, marginBottom: 12 },

  searchWrap: {
    height: 46,
    borderRadius: 14,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 10,
  },
  searchIcon: { color: MUTED, fontSize: 14 },
  searchInput: { flex: 1, color: TEXT, fontSize: 14, fontWeight: "600" },
  filterBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  filterIcon: { color: MUTED, fontSize: 14, fontWeight: "900" },

  pillsRow: { flexDirection: "row", gap: 10 },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
  },
  pillActive: {
    backgroundColor: "rgba(34,197,94,0.22)",
    borderColor: "rgba(34,197,94,0.35)",
  },
  pillText: { color: MUTED, fontSize: 12, fontWeight: "800" },
  pillTextActive: { color: TEXT },

  list: { paddingHorizontal: 18, gap: 12 },

  cardOuter: {
    width: CARD_W,
    height: 210,
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: CARD,
    marginBottom: 12,
  },
  cardBg: { flex: 1 },
  cardImg: { borderRadius: 22 },
  cardOverlay: { flex: 1, padding: 12, justifyContent: "flex-end", gap: 8 },

  ratingPill: {
    position: "absolute",
    right: 10,
    top: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(0,0,0,0.35)",
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  star: { color: "#FBBF24", fontSize: 12 },
  ratingText: { color: TEXT, fontSize: 12, fontWeight: "900" },

  catPill: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  catText: { color: TEXT, fontSize: 10, fontWeight: "900", letterSpacing: 0.6 },

  gameTitle: { color: TEXT, fontSize: 16, fontWeight: "900" },

  statusRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  dot: { width: 7, height: 7, borderRadius: 99 },
  statusText: { color: MUTED, fontSize: 12, fontWeight: "700" },
});
