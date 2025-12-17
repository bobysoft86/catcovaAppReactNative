import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { colors } from "@/src/theme/colors";
import { spacing } from "@/src/theme/layout";
import { login, signup } from "@/src/api/auth";
import { router } from "expo-router";

export default function AuthScreen() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);   // 👈 te faltaba esto

  const isLogin = mode === "login";

  const handleSubmit = async () => {
    if (!email || !password || (!isLogin && !name)) {
      Alert.alert("Oops", "Rellena todos los campos.");
      return;
    }

    try {
      setLoading(true);

      if (isLogin) {
        await login(email, password);// 👈 llama a la API de login
      } else {
        await signup(name,phone, email, password);
      }

      // En login/signup ya se guarda el token en AsyncStorage
      // Aquí ya estás autenticado

      // Más adelante: navegar a la app principal
      Alert.alert("Bienvenido", "Autenticación correcta.");
      router.replace("/(tabs)/home");

    } catch (error: any) {
      console.error(error);
      const message =
        error?.response?.data?.message || "Ha ocurrido un error al autenticar.";
      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  return (

    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        {/* Header con logo / título */}
        <View style={styles.header}>
          <View style={styles.betaBadge}>
            <Text style={styles.betaText}>BETA V1.0</Text>
          </View>

          <View style={styles.brandBlock}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoDice}>🎲</Text>
            </View>
            <View style={{ marginLeft: spacing.sm }}>
              <Text style={styles.brand}>catCova</Text>
              <Text style={styles.subtitle}>
                Manage your collection.{"\n"}Master the game.
              </Text>
            </View>
          </View>
        </View>

        {/* Toggle Log In / Sign Up */}
        <View style={styles.toggleWrapper}>
          <Pressable
            style={[
              styles.toggleButton,
              isLogin && styles.toggleButtonActive,
            ]}
            onPress={() => setMode("login")}
          >
            <Text
              style={[
                styles.toggleText,
                isLogin && styles.toggleTextActive,
              ]}
            >
              Log In
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.toggleButton,
              !isLogin && styles.toggleButtonActive,
            ]}
            onPress={() => setMode("signup")}
          >
            <Text
              style={[
                styles.toggleText,
                !isLogin && styles.toggleTextActive,
              ]}
            >
              Sign Up
            </Text>
          </Pressable>
        </View>

        {/* Formulario */}
        <View style={styles.form}>
          {!isLogin && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Your name"
                  placeholderTextColor="#6B7280"
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>
          )}

          {!isLogin && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="+34 600 000 000"
                  placeholderTextColor="#6B7280"
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
            </View>
          )}


          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="you@example.com"
                placeholderTextColor="#6B7280"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>




          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#6B7280"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            {isLogin && (
              <Pressable style={styles.forgotWrapper}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </Pressable>
            )}
          </View>

          {/* Botón principal */}
          <Pressable
            style={[styles.primaryButton, loading && { opacity: 0.7 }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#022C22" />
            ) : (
              <Text style={styles.primaryButtonText}>
                {isLogin ? "Enter Vault" : "Create Account"} →
              </Text>
            )}
          </Pressable>

          {/* Social login (solo diseño) 
            <View style={styles.socialRow}>
              <View style={styles.socialButton}>
                <Text style={styles.socialText}>G</Text>
              </View>
              <View style={styles.socialButton}>
                <Text style={styles.socialText}></Text>
              </View>
              <View style={styles.socialButton}>
                <Text style={styles.socialText}>f</Text>
              </View>
            </View> */}

          {/* Términos */}
          <Text style={styles.termsText}>
            By continuing, you agree to our{" "}
            <Text style={styles.link}>Terms</Text> &{" "}
            <Text style={styles.link}>Privacy Policy</Text>.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

// estilos igual que ya tenías
const CARD_BG = "#020917";
const CARD_GRADIENT = "#020617";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors?.background || "#020617",
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
    backgroundColor: "#064E3B",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 999,
  },
  betaText: {
    color: "#6EE7B7",
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
    backgroundColor: "#022C22",
    justifyContent: "center",
    alignItems: "center",
  },
  logoDice: {
    fontSize: 24,
  },
  brand: {
    color: "#F9FAFB",
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 2,
  },
  toggleWrapper: {
    flexDirection: "row",
    backgroundColor: "#020617",
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
    backgroundColor: "#111827",
  },
  toggleText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "500",
  },
  toggleTextActive: {
    color: "#F9FAFB",
    fontWeight: "600",
  },
  form: {
    gap: spacing.md,
  },
  inputGroup: {},
  label: {
    color: "#E5E7EB",
    fontSize: 12,
    marginBottom: 4,
  },
  inputWrapper: {
    backgroundColor: "#020617",
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: "rgba(55, 65, 81, 0.9)",
  },
  input: {
    color: "#F9FAFB",
    fontSize: 14,
  },
  forgotWrapper: {
    marginTop: 4,
    alignSelf: "flex-end",
  },
  forgotText: {
    color: "#9CA3AF",
    fontSize: 12,
  },
  primaryButton: {
    marginTop: spacing.md,
    backgroundColor: "#22C55E",
    borderRadius: 999,
    paddingVertical: spacing.sm + 4,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#022C22",
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
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1F2937",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  socialText: {
    color: "#F9FAFB",
    fontSize: 18,
    fontWeight: "600",
  },
  termsText: {
    color: "#6B7280",
    fontSize: 11,
    textAlign: "center",
  },
  link: {
    color: "#A7F3D0",
    textDecorationLine: "underline",
  },
});