import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { radius, spacing } from "../theme/layout";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    marginBottom: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
});
