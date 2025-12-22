import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, ImageBackground, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { styles, GREEN, TEXT } from "./styles";
import { getUserData } from "@/src/storage/authStorage";
import { User } from "@/src/api/auth";
import SelectSheet from "@/src/components/selectSheet";
import { getUserPlayersAndOrganizations } from "@/src/api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTransitionProgress } from "react-native-screens";
import { UserTypeItem } from "@/src/models/user-model";



const USER_TYPE_SELECTED_KEY = "user_type_selected";

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const [user, setUser] = useState<User | null>(null);
    const [userTypeOptionsSelected, setTypeOptionsSelectedOpen] = useState(false);
    const [userTypeSelected, setUserType] = useState<UserTypeItem | null>(null);
    const [userTypeList, setUserTypesList] = useState<UserTypeItem[]>([]);


    useEffect(() => {
        let mounted = true;
        (async () => {
            const u = await getUserData<User>();
            if (mounted) setUser(u);

            // cargar selección previa de UserType
            try {
                const stored = await AsyncStorage.getItem(USER_TYPE_SELECTED_KEY);
                if (stored) setUserType(JSON.parse(stored));
            } catch (e) {
                console.error("Error leyendo UserTypeSelected", e);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);


useEffect(() => {
  if (!user?.id) return;
  let mounted = true;

  (async () => {
    try {
      const res = await getUserPlayersAndOrganizations(user.id);

      const rawList: UserTypeItem[] = res?.result ?? [];

      const list: UserTypeItem[] = rawList.map((item, index) => ({
        ...item,
        originalId: item.id,   // 👈 id real del backend
        id: index + 1,         // 👈 id consecutivo para la UI
      }));

      if (!mounted) return;

      console.log(list);
      setUserTypesList(list);

      if (list.length && userTypeSelected === null) {
        const firstUserEnter = list.find((x) => x.type === "USER");
        if (!firstUserEnter) return;

        setUserType(firstUserEnter);

        try {
          await AsyncStorage.setItem(
            USER_TYPE_SELECTED_KEY,
            JSON.stringify(firstUserEnter)
          );
        } catch (e) {
          console.error("Error guardando UserTypeSelected", e);
        }
      }
    } catch (error) {
      console.error("Error fetching user types:", error);
    }
  })();

  return () => {
    mounted = false;
  };
}, [user?.id]);


    const userTypeLabel = userTypeSelected?.name ?? "Selecciona tipo de usuario";


    const isUser = userTypeSelected?.type === "USER";
    const isPlayer = userTypeSelected?.type === "PLAYER";
    const isOrg = userTypeSelected?.type === "ORG";

    return (
        <View style={[styles.screen, { paddingTop: insets.top + 10 }]}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Header
                    userTypeLabel={userTypeLabel}
                    onSelectType={() => setTypeOptionsSelectedOpen(true)}
                    onProfile={() => router.push("/profile")}
                />

                {isPlayer == true && <PlayerContent />}
                {isUser == true && <UserContent />}
                {isOrg == true && <OrgContent userTypeSelected={userTypeSelected} />}

            </ScrollView>

            <SelectSheet
                visible={userTypeOptionsSelected}
                title="Seleccionar logueado"
                selected={userTypeSelected?.id ?? null}
                onClose={() => setTypeOptionsSelectedOpen(false)}
                onSelect={async (v) => {
                    const selectedItem = userTypeList.find((u) => u.id === Number(v)) ?? null;
                    setUserType(selectedItem);
                    try {
                        if (selectedItem) {
                            await AsyncStorage.setItem(USER_TYPE_SELECTED_KEY, JSON.stringify(selectedItem));
                        }
                    } catch (e) {
                        console.error("Error guardando UserTypeSelected", e);
                    }
                }}
                options={userTypeList.map((u) => ({
                    value: u.id,
                    label: u.name,
                    subtitle: u.role ? `${u.type} · ${u.role}` : u.type,
                }))}
                searchPlaceholder="Buscar ..."
            />
        </View>
    );
}

function Header({
    userTypeLabel,
    onSelectType,
    onProfile,
}: {
    userTypeLabel: string;
    onSelectType: () => void;
    onProfile: () => void;
}) {
    return (
        <View style={styles.headerContainer}>
            <Pressable onPress={onSelectType} style={styles.headerRow}>
                <View style={styles.headerRow}>
                    <View style={styles.avatarWrap}>
                        <Image
                            source={{
                                uri: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=60",
                            }}
                            style={styles.avatar}
                        />
                        <View style={styles.onlineDot} />
                    </View>
                    <View>
                        <Text style={styles.h1}> {userTypeLabel}</Text>
                    </View>
                </View>
            </Pressable>
            <Pressable onPress={onProfile} style={styles.headerRow}>
                <Text style={styles.h1}> 🕵🏻‍♂️</Text>
            </Pressable>
        </View>
    );
}

function UserContent() {
    return (
        <>
            <LinearGradient
                colors={["rgba(255,255,255,0.08)", "rgba(255,255,255,0.03)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statsCard}
            >
                <View style={{ flex: 1 }}>
                    <Text style={styles.statsTitle}>PARTIDAS ESTE MES</Text>
                    <View style={styles.statsRow}>
                        <Text style={styles.statsNumber}>12</Text>
                        <View style={styles.delta}>
                            <Text style={styles.deltaText}>↗ +3</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.bars}>
                    {[10, 16, 12, 22].map((h, i) => (
                        <View
                            key={i}
                            style={[
                                styles.bar,
                                { height: h, backgroundColor: i === 3 ? GREEN : "rgba(34,197,94,0.25)" },
                            ]}
                        />
                    ))}
                </View>
            </LinearGradient>

            <View style={styles.heroCard}>
                <ImageBackground
                    source={{
                        uri: "https://images.unsplash.com/photo-1611371805429-8b5c1f3d7f9f?auto=format&fit=crop&w=1200&q=60",
                    }}
                    style={styles.heroBg}
                    imageStyle={styles.heroBgImg}
                >
                    <LinearGradient colors={["rgba(0,0,0,0.0)", "rgba(0,0,0,0.65)"]} style={styles.heroOverlay}>
                        <View style={styles.pill}>
                            <Text style={styles.pillText}>Popular</Text>
                        </View>

                        <Text style={styles.heroTitle}>Juegos disponibles</Text>
                        <Text style={styles.heroSub}>Explora más de 45 títulos en tu colección</Text>

                        <Pressable onPress={() => router.push("/(tabs)/games")} style={styles.heroLink}>
                            <Text style={styles.heroLinkText}>Ver colección</Text>
                            <Text style={styles.heroLinkArrow}>→</Text>
                        </Pressable>
                    </LinearGradient>
                </ImageBackground>
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Préstamos activos</Text>
                <Pressable onPress={() => router.push("/(noNabvar)/sharedGamesList")}>
                    <Text style={styles.sectionAction}>Ver todos</Text>
                </Pressable>
            </View>

            <View style={styles.loanCard}>
                <Image
                    source={{
                        uri: "https://cf.geekdo-images.com/W3Bsga_u0V9Pq7yY1nD81Q__itemrep/img/cxW2L2_0Jq5wS8cQy0sznDg7t1c=/fit-in/246x300/filters:strip_icc()/pic2419375.jpg",
                    }}
                    style={styles.loanImg}
                />
                <View style={{ flex: 1 }}>
                    <Text style={styles.loanTitle}>Catan: El Juego</Text>
                    <View style={styles.loanMeta}>
                        <Text style={styles.clock}>🕒</Text>
                        <Text style={styles.loanMetaText}>Devuelve en 2 días</Text>
                    </View>
                </View>
                <View style={styles.chev}>
                    <Text style={styles.chevText}>›</Text>
                </View>
            </View>

            <View style={styles.actionsRow}>
                <Pressable
                    onPress={() => router.navigate("/(noNabvar)/games/createOwnGame")}
                    style={[styles.actionBig, styles.actionAdd]}
                >
                    <View style={styles.actionIcon}>
                        <Text style={styles.actionIconText}>＋</Text>
                    </View>
                    <Text style={styles.actionText}>Añadir Juego</Text>
                </Pressable>

                <Pressable onPress={() => console.log("Escanear")} style={[styles.actionBig, styles.actionScan]}>
                    <View style={[styles.actionIcon, styles.actionIconDark]}>
                        <Text style={[styles.actionIconText, { color: TEXT }]}>⌁</Text>
                    </View>
                    <Text style={[styles.actionText, { color: TEXT }]}>Escanear Código</Text>
                </Pressable>
            </View>


            <View style={{ height: 110 }} />
        </>
    );
}

function OrgContent({ userTypeSelected }: { userTypeSelected: UserTypeItem | null }) {

    return (
          <View style={{ height: 40 }} >

            <View style={styles.actionsRow}>
            
{userTypeSelected?.role === "OWNER" &&(
            <Pressable
                    onPress={() => router.navigate("/(noNabvar)/addOwnedGameToOrganization")}
                    style={[styles.actionBig, styles.actionAdd]}
                >
                    <View style={styles.actionIcon}>
                        <Text style={styles.actionIconText}>＋</Text>
                    </View>
                    <Text style={styles.actionText}>Incluir juego a organizacion</Text>
                </Pressable>
)}

                <Pressable onPress={() =>router.push(`/organization/organizationGamesList?id=${userTypeSelected?.originalId}`)} style={[styles.actionBig, styles.actionScan]}>
                    <View style={[styles.actionIcon, styles.actionIconDark]}>
                        <Text style={[styles.actionIconText, { color: TEXT }]}>📚</Text>
                    </View>
                    <Text style={[styles.actionText, { color: TEXT }]}>ver juegos en organizacion</Text>
                </Pressable>
                
            </View>
{/* 
                      <View style={styles.actionsRow}>
                <Pressable
                    onPress={() => router.navigate("/(noNabvar)/games/createOwnGame")}
                    style={[styles.actionBig, styles.actionAdd]}
                >
                    <View style={styles.actionIcon}>
                        <Text style={styles.actionIconText}>＋</Text>
                    </View>
                    <Text style={styles.actionText}>Crear Partida</Text>
                </Pressable>

                <Pressable onPress={() => console.log("añadir juego a organizacion")} style={[styles.actionBig, styles.actionScan]}>
                    <View style={[styles.actionIcon, styles.actionIconDark]}>
                        <Text style={[styles.actionIconText, { color: TEXT }]}>📚</Text>
                    </View>
                    <Text style={[styles.actionText, { color: TEXT }]}>Ver Partidas</Text>
                </Pressable>
                
            </View> */}

         </View>
    );
}


function PlayerContent(){
     return (
                   <LinearGradient
                colors={["rgba(255,255,255,0.08)", "rgba(255,255,255,0.03)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statsCard}
            >
                <View style={{ flex: 1 }}>
                    <Text style={styles.statsTitle}>PARTIDAS ESTE MES</Text>
                    <View style={styles.statsRow}>
                        <Text style={styles.statsNumber}>12</Text>
                        <View style={styles.delta}>
                            <Text style={styles.deltaText}>↗ +3</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.bars}>
                    {[10, 16, 12, 22].map((h, i) => (
                        <View
                            key={i}
                            style={[
                                styles.bar,
                                { height: h, backgroundColor: i === 3 ? GREEN : "rgba(34,197,94,0.25)" },
                            ]}
                        />
                    ))}
                </View>
            </LinearGradient>

    );
}
