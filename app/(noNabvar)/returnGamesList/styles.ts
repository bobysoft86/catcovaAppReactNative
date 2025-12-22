import { StyleSheet } from "react-native";
import { colors } from "@/src/theme/colors";

export const BG = colors.background;
export const CARD = colors.card;
export const BORDER = colors.border;
export const TEXT = colors.text;
export const MUTED = colors.muted;
export const GREEN = colors.primary;
export const GREEN_DARK = "#052B1C";

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  content: { padding: 16, gap: 14, paddingBottom: 32 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  h1: { color: TEXT, fontSize: 24, fontWeight: "900" },
  bell: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  bellText: { color: TEXT, fontSize: 16, fontWeight: "900" },

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
  searchText: { color: TEXT, fontSize: 14, flex: 1 },

  statRow: { flexDirection: "row", gap: 12 },
  statCard: {
    flex: 1,
    backgroundColor: CARD,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 12,
    gap: 6,
  },
  statLabel: { color: MUTED, fontSize: 12, fontWeight: "700" },
  statValue: { color: TEXT, fontSize: 20, fontWeight: "900" },
  statAccent: { color: GREEN },

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
    gap: 10,
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  titleWrap: { flex: 1, gap: 6 },
  cardTitle: { color: TEXT, fontSize: 18, fontWeight: "900" },
  metaText: { color: MUTED, fontSize: 12, fontWeight: "700" },
  badgeRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  badge: {
    backgroundColor: "rgba(34,197,94,0.16)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.35)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: { color: "#B7F7D0", fontSize: 11, fontWeight: "900" },
  typeTag: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  typeText: { color: MUTED, fontSize: 11, fontWeight: "800" },

  dateRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: MUTED },
  dateText: { color: TEXT, fontSize: 13, fontWeight: "800" },
  dateSub: { color: MUTED, fontSize: 12, fontWeight: "700" },

  actions: { flexDirection: "row", gap: 10, marginTop: 6 },
  contactBtn: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
  },
  contactText: { color: TEXT, fontSize: 14, fontWeight: "900" },
  confirmBtn: {
    flex: 1,
    backgroundColor: GREEN,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
  },
  confirmText: { color: GREEN_DARK, fontSize: 14, fontWeight: "900" },
});
