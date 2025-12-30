import { StyleSheet } from "react-native";
import { colors } from "@/src/theme/colors";

const BG = colors.greenDark;
const BAR_BG = "rgba(255,255,255,0.06)";
const BORDER = "rgba(255,255,255,0.12)";
const ACTIVE = colors.primary;
const INACTIVE = "rgba(234,242,238,0.35)";

export const styles = StyleSheet.create({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  pill: {
    width: "88%",
    maxWidth: 420,
    height: 66,
    borderRadius: 999,
    backgroundColor: BAR_BG,
    borderWidth: 1,
    borderColor: BORDER,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  dotWrap: {
    width: 54,
    height: 54,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  dotWrapActive: {
    backgroundColor: ACTIVE,
  },
  dotWrapInactive: {
    backgroundColor: "transparent",
  },
  text: {
    color: colors.text,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 999,
  },
  dotActive: {
    backgroundColor: BG,
  },
  dotInactive: {
    backgroundColor: INACTIVE,
  },
});
