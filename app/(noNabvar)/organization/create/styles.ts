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
  content: { padding: 16, gap: 14 },

  title: { color: TEXT, fontSize: 22, fontWeight: "800" },

  card: {
    backgroundColor: CARD,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 16,
    gap: 12,
  },
  cardTitle: { color: TEXT, fontSize: 16, fontWeight: "800" },

  label: { color: MUTED, fontSize: 12, fontWeight: "700", marginTop: 4 },
  input: {
    backgroundColor: "rgba(0,0,0,0.18)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: TEXT,
    fontSize: 14,
  },

  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: BORDER,
  },
  chipActive: {
    backgroundColor: "rgba(34,197,94,0.16)",
    borderColor: "rgba(34,197,94,0.35)",
  },
  chipText: { color: TEXT, fontWeight: "800", fontSize: 12 },

  timeRow: { flexDirection: "row", gap: 10 },

  button: {
    backgroundColor: GREEN,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSecondary: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: BORDER,
  },
  buttonText: { color: GREEN_DARK, fontWeight: "900", fontSize: 15 },
  buttonTextSecondary: { color: TEXT, fontWeight: "900", fontSize: 14 },

  ruleList: { gap: 8 },
  ruleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: BORDER,
    padding: 12,
    borderRadius: 14,
  },
  ruleLeft: { gap: 2 },
  ruleTitle: { color: TEXT, fontWeight: "800" },
  ruleSub: { color: MUTED, fontWeight: "700", fontSize: 12 },
  dangerBtn: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,77,77,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,77,77,0.28)",
  },
  dangerText: { color: "rgba(255,150,150,0.95)", fontWeight: "900" },

  helper: { color: MUTED, fontSize: 12, fontWeight: "600" },
});
