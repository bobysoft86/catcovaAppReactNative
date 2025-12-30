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
  badgeText: { color: colors.mintSoft, fontSize: 11, fontWeight: "900" },

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
  tabTextActive: { color: GREEN_DARK },

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
  primaryCtaText: { color: GREEN_DARK, fontSize: 14, fontWeight: "900" },
  primaryCtaArrow: { color: GREEN_DARK, fontSize: 16, fontWeight: "900" },

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
  secondaryTextActive: { color: colors.mintSoft, fontSize: 13, fontWeight: "900" },

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