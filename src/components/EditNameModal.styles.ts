import { StyleSheet } from "react-native";
import { colors } from "@/src/theme/colors";

export const BG = colors.background;
export const CARD = colors.card;
export const BORDER = colors.border;
export const TEXT = colors.text;
export const MUTED = colors.muted;
export const GREEN = colors.primary;

export const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: BG,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  title: { color: TEXT, fontSize: 16, fontWeight: "900" },
  close: { color: MUTED, fontSize: 18, fontWeight: "900" },
  label: { color: MUTED, fontSize: 12, fontWeight: "700", marginTop: 6 },
  input: {
    marginTop: 6,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: TEXT,
    fontSize: 14,
    fontWeight: "700",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
  },
  btnSecondary: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: "center",
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: CARD,
  },
  btnSecondaryText: { color: TEXT, fontSize: 14, fontWeight: "900" },
  btnPrimary: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: "center",
    backgroundColor: GREEN,
  },
  btnPrimaryText: { color: colors.greenDark, fontSize: 14, fontWeight: "900" },
});
