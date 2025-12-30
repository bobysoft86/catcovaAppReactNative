import { StyleSheet } from "react-native";
import { colors } from "@/src/theme/colors";



export const BG = colors.background;
export const CARD = colors.card;
export const BORDER = colors.border;
export const TEXT = colors.text;
export const MUTED = colors.muted;
export const GREEN = colors.primary;

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor:BG,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: BORDER,
  },
  iconText: { color: colors.textSoft, fontSize: 18, fontWeight: "900" },
  h1: { color: colors.textSoft, fontSize: 20, fontWeight: "900" },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    marginHorizontal: 16,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: 12,
  },
  searchIcon: { color: "rgba(234,242,238,0.65)", marginRight: 10 },
  searchInput: { flex: 1, color: colors.textSoft, fontSize: 14, fontWeight: "700" },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
  },
  cardImg: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
  },
  cardTitle: { color: colors.textSoft, fontSize: 15, fontWeight: "800" },
  cardSub: { color: "rgba(234,242,238,0.75)", marginTop: 4 },
  emptyWrap: {
    alignItems: "center",
    paddingVertical: 24,
  },
  emptyText: { color: "rgba(234,242,238,0.65)" },
});
