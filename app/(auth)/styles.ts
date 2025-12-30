import { StyleSheet } from "react-native";
import { colors } from "@/src/theme/colors";
import { spacing } from "@/src/theme/layout";

const CARD_BG = colors.cardDeep;
const CARD_GRADIENT = colors.backgroundDeep;

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors?.background || CARD_GRADIENT,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
    justifyContent: "center",
  },
  card: {
    borderRadius: 32,
    padding: spacing.lg,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.15)",
    shadowColor: "#000",
    shadowOpacity: 0.45,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  header: {
    marginBottom: spacing.lg,
  },
  betaBadge: {
    alignSelf: "flex-end",
    backgroundColor: colors.greenBadge,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 999,
  },
  betaText: {
    color: colors.mintBright,
    fontSize: 10,
    fontWeight: "600",
  },
  brandBlock: {
    marginTop: spacing.md,
    flexDirection: "row",
    alignItems: "center",
  },
  logoCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.greenDarker,
    justifyContent: "center",
    alignItems: "center",
  },
  logoDice: {
    fontSize: 24,
  },
  brand: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
  toggleWrapper: {
    flexDirection: "row",
    backgroundColor: colors.backgroundDeep,
    borderRadius: 999,
    padding: 4,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.25)",
  },
  toggleButton: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleButtonActive: {
    backgroundColor: colors.card,
  },
  toggleText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "500",
  },
  toggleTextActive: {
    color: colors.text,
    fontWeight: "600",
  },
  form: {
    gap: spacing.md,
  },
  inputGroup: {},
  label: {
    color: colors.textSubtle,
    fontSize: 12,
    marginBottom: 4,
  },
  inputWrapper: {
    backgroundColor: colors.backgroundDeep,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: "rgba(55, 65, 81, 0.9)",
  },
  input: {
    color: colors.text,
    fontSize: 14,
  },
  forgotWrapper: {
    marginTop: 4,
    alignSelf: "flex-end",
  },
  forgotText: {
    color: colors.muted,
    fontSize: 12,
  },
  primaryButton: {
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingVertical: spacing.sm + 4,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: colors.greenDarker,
    fontSize: 16,
    fontWeight: "700",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  socialButton: {
    flex: 1,
    height: 46,
    borderRadius: 999,
    backgroundColor: colors.backgroundDeep,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  socialText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "600",
  },
  termsText: {
    color: colors.mutedDark,
    fontSize: 11,
    textAlign: "center",
  },
  link: {
    color: colors.mintLink,
    textDecorationLine: "underline",
  },
});
