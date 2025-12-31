import { StyleSheet } from "react-native";

import { colors } from "@/src/theme/colors";
import { BORDER, TEXT } from "../EditNameModal.styles";

export const MUTED = colors.muted;

export const styles = StyleSheet.create({


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
        
})

   