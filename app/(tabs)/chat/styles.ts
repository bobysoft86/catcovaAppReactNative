import { StyleSheet } from "react-native";
import { colors } from "@/src/theme/colors";

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },

  header: { paddingHorizontal: 18, alignItems: "center", gap: 6, marginBottom: 10 },
  h1: { color: colors.text, fontSize: 18, fontWeight: "900" },
  h2: { color: colors.muted, fontSize: 12, fontWeight: "700" },

  searchWrap: {
    marginHorizontal: 18,
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 10,
  },
  searchIcon: { color: colors.muted, fontSize: 14 },
  searchInput: { flex: 1, color: colors.text, fontSize: 14, fontWeight: "600" },

  pillsRow: { flexDirection: "row", gap: 10, paddingHorizontal: 18, marginTop: 12, marginBottom: 8 },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pillActive: { backgroundColor: "rgba(34,197,94,0.20)", borderColor: "rgba(34,197,94,0.35)" },
  pillText: { color: colors.muted, fontSize: 12, fontWeight: "800" },
  pillTextActive: { color: colors.text },

  list: { paddingHorizontal: 18, paddingTop: 8, paddingBottom: 120, gap: 12 },

  rowCard: {
    flexDirection: "row",
    gap: 12,
    padding: 14,
    borderRadius: 22,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },
  avatar: { width: 46, height: 46, borderRadius: 16, backgroundColor: colors.border },

  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 },
  name: { color: colors.text, fontSize: 14, fontWeight: "900", flex: 1 },
  time: { color: colors.muted, fontSize: 11, fontWeight: "700" },

  tagPill: {
    alignSelf: "flex-start",
    marginTop: 6,
    marginBottom: 6,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
  },
  tagText: { fontSize: 10, fontWeight: "900", letterSpacing: 0.5 },

  preview: { color: colors.muted, fontSize: 12, fontWeight: "600" },

  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 99,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.background,
  },

  footerCard: {
    marginTop: 10,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.18)",
    backgroundColor: "rgba(0,0,0,0.14)",
    padding: 16,
    alignItems: "center",
    gap: 10,
    borderStyle: "dashed",
  },
  footerIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(34,197,94,0.18)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  footerTitle: { color: colors.text, fontSize: 14, fontWeight: "900" },
  footerSub: { color: colors.muted, fontSize: 12, fontWeight: "600", textAlign: "center" },

  footerBtn: {
    marginTop: 4,
    backgroundColor: "rgba(34,197,94,0.14)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.35)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  footerBtnText: { color: colors.mintSoft, fontSize: 12, fontWeight: "900" },

  loadingWrap: {
    marginTop: 30,
    alignItems: "center",
    gap: 10,
  },
  loadingText: { color: colors.muted, fontSize: 12, fontWeight: "700" },
  errorText: { color: colors.muted, fontSize: 12, fontWeight: "700" },
  retryBtn: {
    marginTop: 8,
    backgroundColor: "rgba(34,197,94,0.14)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.35)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  retryText: { color: colors.mintSoft, fontSize: 12, fontWeight: "900" },
});
