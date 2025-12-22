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

  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  back: { color: TEXT, fontSize: 22, fontWeight: "800" },
  title: { color: TEXT, fontSize: 18, fontWeight: "800" },

  content: { padding: 16, gap: 16 },

  card: {
    backgroundColor: CARD,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 16,
    gap: 12,
  },
  label: { color: MUTED, fontSize: 12, fontWeight: "700" },
  pill: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    padding: 12,
  },
  pillTitle: { color: TEXT, fontSize: 14, fontWeight: "800" },
  pillSub: { color: MUTED, fontSize: 12, fontWeight: "600", marginTop: 4 },
  input: {
    backgroundColor: "rgba(0,0,0,0.22)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: TEXT,
    fontSize: 14,
  },
  helper: { color: MUTED, fontSize: 12, fontWeight: "600" },

  saveButton: {
    marginTop: 8,
    backgroundColor: GREEN,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonDisabled: { opacity: 0.55 },
  saveText: { color: GREEN_DARK, fontSize: 16, fontWeight: "900" },
});
