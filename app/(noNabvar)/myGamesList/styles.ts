import { StyleSheet } from "react-native";
import { colors } from "@/src/theme/colors";

export const BG = colors.background;
export const CARD = colors.card;
export const BORDER = colors.border;
export const TEXT = colors.text;
export const MUTED = colors.muted;
export const GREEN = colors.primary;

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },

  headerRow: {
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  h1: { color: TEXT, fontSize: 22, fontWeight: "900" },

  plusBtn: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  plusText: { color: TEXT, fontSize: 20, fontWeight: "900", marginTop: -2 },
  iconText: { color: TEXT, fontSize: 16, fontWeight: "900" },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  searchWrap: {
    marginHorizontal: 18,
    height: 44,
    borderRadius: 999,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 10,
    marginBottom: 12,
  },
  searchIcon: { color: MUTED, fontSize: 14 },
  searchInput: { flex: 1, color: TEXT, fontSize: 13, fontWeight: "700" },

  toggleWrapper: {
    marginHorizontal: 18,
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 999,
    padding: 4,
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: 12,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleBtnActive: {
    backgroundColor: GREEN,
  },
  toggleText: { color: MUTED, fontSize: 12, fontWeight: "900" },
  toggleTextActive: { color: "#052B1C" },

  statsRow: {
    paddingHorizontal: 18,
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 12,
  },
  statLabel: { color: MUTED, fontSize: 10, fontWeight: "900", letterSpacing: 0.6 },
  statValue: { color: TEXT, fontSize: 22, fontWeight: "900", marginTop: 4 },

  sectionRow: {
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: { color: TEXT, fontSize: 14, fontWeight: "900" },
  sectionActionWrap: { paddingVertical: 6, paddingHorizontal: 8, borderRadius: 10 },
  sectionAction: { color: GREEN, fontSize: 12, fontWeight: "900" },

  list: { paddingHorizontal: 18, gap: 12, paddingBottom: 24 },

  card: {
    borderRadius: 22,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: "hidden",
  },
  cardHero: { height: 140, width: "100%" },
  cardHeroImg: { borderRadius: 22 },
  cardOverlay: { flex: 1, padding: 12, justifyContent: "flex-start" },

  tag: {
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  tagText: { color: TEXT, fontSize: 10, fontWeight: "900", letterSpacing: 0.4 },

  tagGreen: { backgroundColor: "rgba(34,197,94,0.16)", borderColor: "rgba(34,197,94,0.35)" },
  tagYellow: { backgroundColor: "rgba(251,191,36,0.14)", borderColor: "rgba(251,191,36,0.35)" },
  tagAmber: { backgroundColor: "rgba(245,158,11,0.14)", borderColor: "rgba(245,158,11,0.35)" },
  tagBlue: { backgroundColor: "rgba(56,189,248,0.14)", borderColor: "rgba(56,189,248,0.35)" },
  tagPurple: { backgroundColor: "rgba(168,85,247,0.14)", borderColor: "rgba(168,85,247,0.35)" },

  cardBody: { padding: 14, gap: 8 },

  cardTitle: { color: TEXT, fontSize: 16, fontWeight: "900" },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  metaText: { color: MUTED, fontSize: 12, fontWeight: "800" },
  metaDot: { color: "rgba(234,242,238,0.30)", fontWeight: "900" },

  subRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  subText: { color: MUTED, fontSize: 10, fontWeight: "900" },

  primaryBtn: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  primaryBtnText: { color: TEXT, fontSize: 12, fontWeight: "900" },

  primaryBtnAlt: {
    backgroundColor: "rgba(34,197,94,0.16)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.35)",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  primaryBtnAltText: { color: "#B7F7D0", fontSize: 12, fontWeight: "900" },

  secondaryBtn: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
  },
  secondaryBtnText: { color: TEXT, fontSize: 12, fontWeight: "900" },
});
