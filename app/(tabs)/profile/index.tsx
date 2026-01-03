import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, ImageBackground, Pressable, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { styles } from "./styles";
import EditNameModal from "@/src/components/EditNameModal";
import { getUserProfile /*, updateUserName */ } from "@/src/api/user";
import { getUserData, removeLoginData, removeMatrixData, removeToken, removeUserData } from "@/src/storage/authStorage";
import { UserModel } from "@/src/models/user-model";
import { API_BASE_URL } from "@/src/config/api";
import BasicHeader from "@/src/components/basicHeader/basicHeader";


export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const [editOpen, setEditOpen] = useState(false);
  const [user, setUser] = useState<UserModel | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [savingName, setSavingName] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);



 useEffect(() => {
        let mounted = true;

        (async () => {
            const u = await getUserData<UserModel>();
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
    await removeLoginData();
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
     
     <BasicHeader
     headerText="PROFILE"
     icon= "✎"
      onRightPress={() => setEditOpen(true)}
     ></BasicHeader>
     




      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarWrap}>
            <Image
              source={{
                uri: user?.avatar ?`${API_BASE_URL}${user.avatar}`  :  "" ,
              }}
              style={styles.avatar}
            />
          </View>

          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.handle}>@{displayName}</Text>

          <View style={styles.memberRow}>
            <Text style={styles.memberIcon}>📅</Text>
            <Text style={styles.memberText}>Miembro desde {user?.createdAt}</Text>
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

    {/* Two small cards row */}
        <View style={styles.row}>
          <Pressable onPress={() => router.push("/(noNabvar)/players/create")} style={styles.smallCard}>
            <ImageBackground
               source={{
                uri: "https://images.unsplash.com/photo-1751830580149-b8da67b571db?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              style={styles.smallBg}
              imageStyle={styles.smallImg}
            >
              <LinearGradient colors={["rgba(0,0,0,0.0)", "rgba(0,0,0,0.72)"]} style={styles.smallOverlay}>
                <View style={styles.smallIconPill}>
                  <Text style={styles.smallIcon}>icon</Text>
                </View>
                <Text style={styles.smallTitle}>Crear Jugador</Text>
              <Text style={styles.smallSub}>{String(wishedGamesCount)}</Text>
              </LinearGradient>
            </ImageBackground>
          </Pressable>

          <Pressable onPress={() => router.push("/(noNabvar)/organization/create")} style={styles.smallCard}>
            <View style={styles.smallPlain}>
              <View style={styles.smallIconPill}>
                <Text style={styles.smallIcon}>icon</Text>
              </View>
              <Text style={styles.smallTitle}>Crear Organizacion</Text>
              <Text style={styles.smallSub}>{String(wishedGamesCount)}</Text>
            </View>
          </Pressable>
        </View>

  {/* Two small cards row */}
        <View style={styles.row}>
          <Pressable onPress={() => router.push("/(noNabvar)/pendingLoanRequest")} style={styles.smallCard}>
            <ImageBackground
              source={
              require("../../../assets/backgroundImages/player.jpg")
              }
              style={styles.smallBg}
              imageStyle={styles.smallImg}
            >
              <LinearGradient colors={["rgba(0,0,0,0.0)", "rgba(0,0,0,0.72)"]} style={styles.smallOverlay}>
                <View style={styles.smallIconPill}>
                  <Text style={styles.smallIcon}>icon</Text>
                </View>
                <Text style={styles.smallTitle}>Pendiente de confirmacion</Text>
              <Text style={styles.smallSub}>{String(wishedGamesCount)}</Text>
              </LinearGradient>
            </ImageBackground>
          </Pressable>

          <Pressable onPress={() => router.push("/(noNabvar)/returnGamesList")} style={styles.smallCard}>
         <ImageBackground
             source={
              require("../../../assets/backgroundImages/sharedGames.jpg")
              }
              style={styles.smallBg}
              imageStyle={styles.smallImg}
            >
              <LinearGradient colors={["rgba(0,0,0,0.0)", "rgba(0,0,0,0.72)"]} style={styles.smallOverlay}>
                <View style={styles.smallIconPill}>
                  <Text style={styles.smallIcon}>icon</Text>
                </View>
                <Text style={styles.smallTitle}>Devoluciones</Text>
              <Text style={styles.smallSub}>{String(wishedGamesCount)}</Text>
              </LinearGradient>
            </ImageBackground>
          </Pressable>
        </View>



{/* Two small cards row */}
        <View style={styles.row}>
          <Pressable onPress={() => router.push("/(noNabvar)/pendingDeliveries") } style={styles.smallCard}>
            <ImageBackground
              source={{
                uri: "",
              }}
              style={styles.smallBg}
              imageStyle={styles.smallImg}
            >
              <LinearGradient colors={["rgba(0,0,0,0.0)", "rgba(0,0,0,0.72)"]} style={styles.smallOverlay}>
                <View style={styles.smallIconPill}>
                  <Text style={styles.smallIcon}>icon</Text>
                </View>
                <Text style={styles.smallTitle}>Entregas</Text>
              <Text style={styles.smallSub}>{String(wishedGamesCount)}</Text>
              </LinearGradient>
            </ImageBackground>
          </Pressable>

          <Pressable onPress={() =>router.push("/(noNabvar)/matchesList") } style={styles.smallCard}>
         <ImageBackground
              source={{
                uri: "",
              }}
              style={styles.smallBg}
              imageStyle={styles.smallImg}
            >
            <View style={styles.smallPlain}>
              <View style={styles.smallIconPill}>
                <Text style={styles.smallIcon}>icon</Text>
              </View>
              <Text style={styles.smallTitle}>Partidas</Text>
              <Text style={styles.smallSub}>{String(wishedGamesCount)}</Text>
            </View>
            </ImageBackground>
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

            setUser((prev) => (prev ? { ...prev, name: newName } : { name: newName } as UserModel));
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
