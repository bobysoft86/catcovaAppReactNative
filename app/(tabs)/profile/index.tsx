import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, ImageBackground, Pressable, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { styles } from "./styles";
import EditNameModal from "@/src/components/EditNameModal";
import { getUserProfile /*, updateUserName */ } from "@/src/api/user";
import { getUserData, removeToken } from "@/src/storage/authStorage";
import { User } from "@/src/api/auth";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const [editOpen, setEditOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [savingName, setSavingName] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);



 useEffect(() => {
        let mounted = true;

        (async () => {
            const u = await getUserData<User>();
            if (mounted) setUser(u);
        })();
        return () => {
            mounted = false;
        };
    }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoadingProfile(true);
        const dataProfile = await getUserProfile();
        console.log("Profile data:", dataProfile);
        setProfileData(dataProfile);

      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfileData();
  }, []);

  const onLogout = async () => {
    await removeToken();
    router.replace("/");
  };

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/(tabs)/home");
  };

  // ✅ placeholders seguros
  const displayName = user?.name ?? "Usuario";
  const ownedGamesCount = profileData?.ownedGamesCount ?? 0;
  const playersCount = profileData?.playersCount ?? 0;
  const rentedOutGamesCount = profileData?.rentedOutGamesCount ?? 0;
  const rentedOutGamesCountActive = profileData?.rentedOutGamesCountActive ?? 0;
  const wishedGamesCount = profileData?.wishedGamesCount ?? 0;

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 50 }]}>
      <View style={[styles.headerTop, { top: insets.top + 6 }]}>
        <Pressable onPress={handleBack} style={styles.iconBtn} hitSlop={10}>
          <Text style={styles.iconText}>←</Text>
        </Pressable>

        <Text style={styles.headerTitle}>PROFILE</Text>

        <Pressable onPress={() => setEditOpen(true)} style={styles.iconBtn} hitSlop={10}>
          <Text style={styles.iconText}>✎</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarWrap}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=240&q=60",
              }}
              style={styles.avatar}
            />
          </View>

          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.handle}>@alexplays</Text>

          <View style={styles.memberRow}>
            <Text style={styles.memberIcon}>📅</Text>
            <Text style={styles.memberText}>Miembro desde 2023</Text>
          </View>

          {/* Stats */}
          {loadingProfile ? (
            <View style={{ marginTop: 12 }}>
              <ActivityIndicator />
            </View>
          ) : (
            <View style={styles.statsRow}>
              <StatItem value={String(ownedGamesCount)} label="JUEGOS" />
              <Divider />
              <StatItem value={String(playersCount)} label="PLAYERS" />
              <Divider />
              <StatItem value={String(rentedOutGamesCount)} label="PRESTADOS" />
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>Panel de Control</Text>

        {/* Big card: Mis Juegos */}
        <Pressable onPress={() => router.push("/(noNabvar)/myGamesList")} style={styles.bigCardWrap}>
          <ImageBackground
            source={{
              uri: "https://images.unsplash.com/photo-1616161560417-66d4db5892ec?auto=format&fit=crop&w=1200&q=60",
            }}
            style={styles.bigCardBg}
            imageStyle={styles.bigCardImg}
          >
            <LinearGradient colors={["rgba(0,0,0,0.0)", "rgba(0,0,0,0.70)"]} style={styles.bigCardOverlay}>
              <Text style={styles.bigCardKicker}>Colección</Text>
              <Text style={styles.bigCardTitle}>Mis Juegos</Text>

              <View style={styles.fab}>
                <Text style={styles.fabText}>🎲</Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </Pressable>

        {/* Two small cards row */}
        <View style={styles.row}>
          <Pressable onPress={() => router.push("/(noNabvar)/sharedGamesList")} style={styles.smallCard}>
            <ImageBackground
              source={{
                uri: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=60",
              }}
              style={styles.smallBg}
              imageStyle={styles.smallImg}
            >
              <LinearGradient colors={["rgba(0,0,0,0.0)", "rgba(0,0,0,0.72)"]} style={styles.smallOverlay}>
                <View style={styles.smallIconPill}>
                  <Text style={styles.smallIcon}>↗</Text>
                </View>
                <Text style={styles.smallTitle}>Mis Préstamos</Text>
                <Text style={styles.smallSub}>{String(rentedOutGamesCountActive)} activos</Text>
              </LinearGradient>
            </ImageBackground>
          </Pressable>

          <Pressable onPress={() => router.push("/(noNabvar)/myGamesList")} style={styles.smallCard}>
            <View style={styles.smallPlain}>
              <View style={styles.smallIconPill}>
                <Text style={styles.smallIcon}>❤</Text>
              </View>
              <Text style={styles.smallTitle}>Lista de Deseos</Text>
              <Text style={styles.smallSub}>{String(wishedGamesCount)}</Text>
            </View>
          </Pressable>
        </View>

        {/* Settings row card */}
        <Pressable onPress={() => console.log("Config")} style={styles.settingsCard}>
          <View style={styles.settingsLeft}>
            <View style={styles.settingsIcon}>
              <Text style={styles.settingsIconText}>⚙️</Text>
            </View>
            <View>
              <Text style={styles.settingsTitle}>Configuración</Text>
              <Text style={styles.settingsSub}>Notificaciones, privacidad, cuenta</Text>
            </View>
          </View>
          <Text style={styles.chev}>›</Text>
        </Pressable>

           <Pressable onPress={() => router.push("/(noNabvar)/players/create") }style={styles.settingsCard}>
          <View style={styles.settingsLeft}>
            <View style={styles.settingsIcon}>
            </View>
            <View>
              <Text style={styles.settingsTitle}>Crear Jugador</Text>
            </View>
          </View>
          <Text style={styles.chev}>›</Text>
        </Pressable>

          <Pressable onPress={() => router.push("/(noNabvar)/organization/create") }style={styles.settingsCard}>
          <View style={styles.settingsLeft}>
            <View style={styles.settingsIcon}>
            </View>
            <View>
              <Text style={styles.settingsTitle}>Crear Organizacion</Text>
            </View>
          </View>
          <Text style={styles.chev}>›</Text>
        </Pressable>



          <Pressable onPress={() => router.push("/(noNabvar)/pendingLoanRequest") }style={styles.settingsCard}>
          <View style={styles.settingsLeft}>
            <View style={styles.settingsIcon}>
            </View>
            <View>
              <Text style={styles.settingsTitle}>Cesiones pendientes de confirmacion</Text>
            </View>
          </View>
          <Text style={styles.chev}>›</Text>
        </Pressable>

        <Pressable onPress={() => router.push("/(noNabvar)/returnGamesList") }style={styles.settingsCard}>
          <View style={styles.settingsLeft}>
            <View style={styles.settingsIcon}>
            </View>
            <View>
              <Text style={styles.settingsTitle}>Devoluciones</Text>
            </View>
          </View>
          <Text style={styles.chev}>›</Text>
        </Pressable>

                 <Pressable onPress={() => router.push("/(noNabvar)/pendingDeliveries") }style={styles.settingsCard}>
          <View style={styles.settingsLeft}>
            <View style={styles.settingsIcon}>
            </View>
            <View>
              <Text style={styles.settingsTitle}>Entregas</Text>
            </View>
          </View>
          <Text style={styles.chev}>›</Text>
        </Pressable>




        {/* Logout */}
        <Pressable onPress={onLogout} style={styles.logout}>
          <Text style={styles.logoutIcon}>↪</Text>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </Pressable>

        <View style={{ height: 110 }} />
      </ScrollView>

      <EditNameModal
        visible={editOpen}
        initialName={displayName}
        loading={savingName}
        onClose={() => setEditOpen(false)}
        onSave={async (newName) => {
          try {
            setSavingName(true);

            // ✅ aquí llamas a tu API real
            // await updateUserName(newName);

            setUser((prev) => (prev ? { ...prev, name: newName } : { name: newName } as User));
            setEditOpen(false);
          } catch (e) {
            console.error(e);
          } finally {
            setSavingName(false);
          }
        }}
      />
    </View>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}
