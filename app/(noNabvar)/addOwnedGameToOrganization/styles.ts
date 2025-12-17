import { colors } from "@/src/theme/colors";
import { StyleSheet } from "react-native";


export const BG = colors.background;
export const CARD = colors.card;
export const BORDER = colors.border;
export const TEXT = colors.text;
export const MUTED = colors.muted;
export const GREEN = colors.primary;

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BG,
  },


    /* layout helpers */
  row: {
    gap: 12,
  },
  rowTwoCols: {
    flexDirection: "row",
  },
  field: {
    flex: 1,
    gap: 6,
  },

  /* select (fake dropdown) */
  selectBtn: {
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectText: {
    color: TEXT,
    fontSize: 14,
    fontWeight: "600",
  },
  selectChevron: {
    color: MUTED,
    fontSize: 14,
    fontWeight: "900",
  },

  /* switches */
  switchRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  switchText: {
    color: TEXT,
    fontSize: 14,
    fontWeight: "600",
  },
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  back: {
    color: TEXT,
    fontSize: 22,
    fontWeight: "800",
  },
  title: {
    color: TEXT,
    fontSize: 18,
    fontWeight: "800",
  },
  content: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: CARD,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 16,
    gap: 10,
  },
  label: {
    color: MUTED,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 6,
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: TEXT,
    fontSize: 14,
  },
  saveButton: {
    marginTop: 16,
    backgroundColor: GREEN,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
  },
  saveText: {
    color: "#052B1C",
    fontSize: 16,
    fontWeight: "900",
  },
});
