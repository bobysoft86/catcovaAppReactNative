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
  content: { paddingHorizontal: 18, paddingBottom: 20 },

  header: { alignItems: "center", gap: 6, marginBottom: 16 },

  avatarWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    borderColor: "rgba(34,197,94,0.35)",
    overflow: "hidden",
    marginBottom: 8,
  },
  avatar: { width: "100%", height: "100%" },

  name: { color: TEXT, fontSize: 22, fontWeight: "900" },
  handle: { color: GREEN, fontSize: 13, fontWeight: "800" },

  memberRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 },
  memberIcon: { fontSize: 12 },
  memberText: { color: MUTED, fontSize: 12, fontWeight: "600" },

   headerTop: {
    position: "absolute",
    left: 16,
    right: 16,
    zIndex: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
    headerTitle: {
      color: MUTED,
      fontSize: 11,
      letterSpacing: 1,
      fontWeight: "800",
    },
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
  iconText: { color: TEXT, fontSize: 16, fontWeight: "900" },


  statsRow: {
    marginTop: 14,
    width: "100%",
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 22,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statItem: { flex: 1, alignItems: "center", gap: 4 },
  statValue: { color: TEXT, fontSize: 18, fontWeight: "900" },
  statLabel: { color: MUTED, fontSize: 11, fontWeight: "700", letterSpacing: 0.4 },
  divider: { width: 1, height: 30, backgroundColor: BORDER },

  sectionTitle: { color: TEXT, fontSize: 16, fontWeight: "900", marginBottom: 12 },

  bigCardWrap: {
    borderRadius: 26,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: 12,
  },
  bigCardBg: { height: 170, width: "100%" },
  bigCardImg: { borderRadius: 26 },
  bigCardOverlay: { flex: 1, padding: 16, justifyContent: "flex-end" },
  bigCardKicker: { color: MUTED, fontSize: 12, fontWeight: "700" },
  bigCardTitle: { color: TEXT, fontSize: 22, fontWeight: "900", marginTop: 2 },

  fab: {
    position: "absolute",
    right: 14,
    bottom: 14,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(34,197,94,0.18)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  fabText: { fontSize: 18 },

  row: { flexDirection: "row", gap: 12, marginBottom: 14 },

  smallCard: {
    flex: 1,
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: BORDER,
    minHeight: 120,
  },
  smallBg: { flex: 1 },
  smallImg: { borderRadius: 22 },
  smallOverlay: { flex: 1, padding: 14, justifyContent: "flex-end", gap: 6 },

  smallPlain: {
    flex: 1,
    padding: 14,
    backgroundColor: CARD,
    justifyContent: "flex-end",
    gap: 6,
  },

  smallIconPill: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(34,197,94,0.14)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.30)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  smallIcon: { color: "#B7F7D0", fontSize: 16, fontWeight: "900" },
  smallTitle: { color: TEXT, fontSize: 16, fontWeight: "900" },
  smallSub: { color: MUTED, fontSize: 12, fontWeight: "600" },

  settingsCard: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 22,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingsLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  settingsIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsIconText: { fontSize: 18 },
  settingsTitle: { color: TEXT, fontSize: 14, fontWeight: "900" },
  settingsSub: { color: MUTED, fontSize: 12, fontWeight: "600" },
  chev: { color: MUTED, fontSize: 22, fontWeight: "900" },

  logout: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    paddingVertical: 10,
  },
  logoutIcon: { color: "#FF4D4D", fontSize: 16, fontWeight: "900" },
  logoutText: { color: "#FF4D4D", fontSize: 14, fontWeight: "900" },
});
