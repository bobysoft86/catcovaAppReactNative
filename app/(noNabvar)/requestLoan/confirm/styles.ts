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
  content: { padding: 16, gap: 14, paddingBottom: 30 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    paddingHorizontal: 4,
  },
  title: { color: TEXT, fontSize: 18, fontWeight: "900" },
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
  backText: { color: TEXT, fontSize: 16, fontWeight: "900" },

  gameCard: {
    backgroundColor: CARD,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cover: { width: 64, height: 64, borderRadius: 14, backgroundColor: colors.ink },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(34,197,94,0.16)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.35)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: { color: colors.mintSoft, fontSize: 11, fontWeight: "900" },
  gameTitle: { color: TEXT, fontSize: 16, fontWeight: "900", marginTop: 4 },
  gameSub: { color: MUTED, fontSize: 12, fontWeight: "600", marginTop: 2 },

  dateRow: { flexDirection: "row", gap: 10 },
  dateBox: {
    flex: 1,
    backgroundColor: CARD,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 12,
    gap: 6,
  },
  dateLabel: { color: MUTED, fontSize: 12, fontWeight: "700" },
  dateValue: { color: TEXT, fontSize: 20, fontWeight: "900" },

  calendarCard: {
    backgroundColor: CARD,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 12,
    gap: 12,
  },
  calHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  calMonth: { color: TEXT, fontSize: 15, fontWeight: "800" },
  calNav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  calNavBtn: { color: TEXT, fontSize: 16, fontWeight: "900" },
  weekdayRow: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 6 },
  weekday: { color: MUTED, fontSize: 12, fontWeight: "800", width: 28, textAlign: "center" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 2,
    rowGap: 8,
  },
  dayBtn: {
    width: "14.2857%",
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: { color: TEXT, fontWeight: "800" },
  dayMuted: { color: MUTED },
  daySelected: {
    backgroundColor: GREEN,
  },
  daySelectedText: { color: GREEN_DARK },
  dayInRange: {
    backgroundColor: "rgba(34,197,94,0.14)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.32)",
  },

  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  summaryLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: MUTED },
  summaryText: { color: MUTED, fontSize: 12, fontWeight: "700" },
  totalText: { color: TEXT, fontSize: 14, fontWeight: "900" },

  cta: {
    marginTop: 8,
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
