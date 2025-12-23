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
    paddingHorizontal: 4,
    height: 56,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: { color: TEXT, fontSize: 18, fontWeight: "900" },
  title: { color: TEXT, fontSize: 18, fontWeight: "900" },
  spacer: { width: 38, height: 38 },

  sectionCard: {
    backgroundColor: CARD,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 14,
    gap: 10,
  },
  label: { color: MUTED, fontSize: 12, fontWeight: "800", letterSpacing: 0.3 },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  input: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.18)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: TEXT,
    fontSize: 14,
  },
  dateValue: { color: TEXT, fontSize: 20, fontWeight: "900" },
  dateSub: { color: MUTED, fontSize: 12, fontWeight: "700" },
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
  calWrap: {
    backgroundColor: CARD,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 12,
    gap: 10,
  },
  calHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  calMonth: { color: TEXT, fontSize: 15, fontWeight: "800" },
  calNav: { flexDirection: "row", alignItems: "center", gap: 12 },
  calNavBtn: { color: TEXT, fontSize: 16, fontWeight: "900" },
  weekdayRow: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 4 },
  weekday: { color: MUTED, fontSize: 12, fontWeight: "800", width: 28, textAlign: "center" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    rowGap: 8,
    columnGap: 8,
  },
  dayBtn: {
    width: "13.6%",
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  dayText: { color: TEXT, fontWeight: "800" },
  dayMuted: { color: MUTED },
  daySelected: {
    backgroundColor: GREEN,
    borderColor: "rgba(34,197,94,0.35)",
  },
  daySelectedText: { color: GREEN_DARK },

  statCard: {
    flex: 1,
    backgroundColor: CARD,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 14,
    gap: 6,
  },
  statValue: { color: TEXT, fontSize: 22, fontWeight: "900" },
  statLabelSmall: { color: MUTED, fontSize: 12, fontWeight: "700" },

  playersWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 4,
  },
  playerChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  playerSelected: {
    backgroundColor: "rgba(34,197,94,0.18)",
    borderColor: "rgba(34,197,94,0.35)",
  },
  avatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.08)" },
  playerName: { color: TEXT, fontSize: 13, fontWeight: "800" },

  dropdown: {
    backgroundColor: "rgba(0,0,0,0.18)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownText: { color: TEXT, fontSize: 14, fontWeight: "800" },

  textarea: {
    backgroundColor: "rgba(0,0,0,0.18)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 14,
    color: TEXT,
    fontSize: 14,
    minHeight: 110,
    textAlignVertical: "top",
  },

  cta: {
    marginTop: 4,
    backgroundColor: GREEN,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  ctaText: { color: GREEN_DARK, fontSize: 16, fontWeight: "900" },
});
