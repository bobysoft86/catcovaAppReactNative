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
  content: { paddingHorizontal: 18, paddingBottom: 24, gap: 16 },

  headerContainer: {
    display: "flex",
    flexDirection:"row",
    justifyContent:"space-between",

  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  kicker: { color: MUTED, fontSize: 12, marginBottom: 4 },
  h1: { color: TEXT, fontSize: 28, fontWeight: "800" },

  avatarWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "rgba(34,197,94,0.35)",
    overflow: "hidden",
    position: "relative",
  },
  avatar: { width: "100%", height: "100%" },
  onlineDot: {
    position: "absolute",
    right: 2,
    bottom: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: GREEN,
    borderWidth: 2,
    borderColor: BG,
  },

  statsCard: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  statsTitle: { color: MUTED, fontSize: 11, letterSpacing: 0.6 },
  statsRow: { flexDirection: "row", alignItems: "flex-end", gap: 10 },
  statsNumber: { color: TEXT, fontSize: 28, fontWeight: "800" },
  delta: {
    backgroundColor: "rgba(34,197,94,0.12)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.25)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 3,
  },
  deltaText: { color: GREEN, fontSize: 12, fontWeight: "700" },
  bars: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
    paddingRight: 2,
  },
  bar: { width: 12, borderRadius: 4 },

  heroCard: {
    borderRadius: 26,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: BORDER,
  },
  heroBg: { height: 200, width: "100%" },
  heroBgImg: { borderRadius: 26 },
  heroOverlay: {
    flex: 1,
    padding: 18,
    justifyContent: "flex-end",
    gap: 6,
  },
  pill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(34,197,94,0.20)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.35)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 6,
  },
  pillText: { color: colors.mintSoft, fontSize: 12, fontWeight: "800" },
  heroTitle: { color: TEXT, fontSize: 22, fontWeight: "900" },
  heroSub: { color: MUTED, fontSize: 13 },
  heroLink: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  heroLinkText: { color: TEXT, fontSize: 13, fontWeight: "700" },
  heroLinkArrow: { color: TEXT, fontSize: 16, fontWeight: "900" },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  sectionTitle: { color: TEXT, fontSize: 16, fontWeight: "800" },
  sectionAction: { color: GREEN, fontSize: 13, fontWeight: "800" },

  loanCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 22,
    padding: 14,
  },
  loanImg: { width: 46, height: 46, borderRadius: 16, backgroundColor: colors.ink },
  loanTitle: { color: TEXT, fontSize: 14, fontWeight: "800" },
  loanMeta: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 },
  clock: { fontSize: 12 },
  loanMetaText: { color: MUTED, fontSize: 12, fontWeight: "600" },
  chev: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  chevText: { color: MUTED, fontSize: 22, marginTop: -2 },

  actionsRow: { flexDirection: "row", gap: 12, marginTop: 10 },
  actionBig: {
    flex: 1,
    borderRadius: 26,
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER,
    minHeight: 140,
    justifyContent: "space-between",
  },
  actionAdd: { backgroundColor: GREEN },
  actionScan: { backgroundColor: "rgba(255,255,255,0.06)" },
  actionIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(0,0,0,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  actionIconDark: {
    backgroundColor: GREEN_DARK,
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.30)",
  },
  actionIconText: { fontSize: 24, fontWeight: "900", color: colors.greenDark },
  actionText: { fontSize: 18, fontWeight: "900", color: colors.greenDark },
});
