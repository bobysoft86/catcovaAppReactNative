import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, Pressable, Image, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { styles } from "./styles";
import { User } from "@/src/api/auth";
import { getUserData } from "@/src/storage/authStorage";
import { GameBdd, OwnedGame } from "@/src/models/game-model";
import { getOwnedGameById } from "@/src/api/ownedGames";
import { createBooking } from "@/src/api/booking";

type Params = { id?: string; openingRules?: string };
type OpeningRule = { weekday: string };

type CalendarDay = { date: Date; inMonth: boolean };

function buildMonthDays(year: number, month: number): CalendarDay[] {
  // month is 0-indexed
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay(); // 0-6, Sunday-based
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const leading = Array.from({ length: startWeekday }, (_, i) => ({
    date: new Date(year, month - 1, prevMonthDays - startWeekday + i + 1),
    inMonth: false,
  }));

  const current = Array.from({ length: daysInMonth }, (_, i) => ({
    date: new Date(year, month, i + 1),
    inMonth: true,
  }));

  const total = [...leading, ...current];
  const trailingCount = Math.ceil(total.length / 7) * 7 - total.length;
  const trailing = Array.from({ length: trailingCount }, (_, i) => ({
    date: new Date(year, month + 1, i + 1),
    inMonth: false,
  }));

  return [...total, ...trailing];
}

function formatDate(date: Date | null) {
  if (!date) return "Selecciona";
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ConfirmLoanScreen() {
  const insets = useSafeAreaInsets();
  const { id, openingRules } = useLocalSearchParams< Params >();
  const [monthCursor, setMonthCursor] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date(Date.now() + 6 * 24 * 60 * 60 * 1000));
  const [user, setUser] = useState<User | null>(null);
  const [ownedGame,setOwnedGame] = useState<OwnedGame>();

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

useEffect(()=>{

const fetchOwnedGameData = async () =>{
   try {
      if(!id) return
      const OwnedGameData = await getOwnedGameById(id)
      setOwnedGame(OwnedGameData)
    } catch (error) {
      
    }
  }
  fetchOwnedGameData();
},[]);



async function onPresCreateBooking(
  startDate: Date | null,
  endDate: Date | null,
  userId: number | undefined,
  ownedGameId: number | undefined
) {
  if (!startDate || !endDate) {
    Alert.alert("Fechas incompletas", "Selecciona fecha de inicio y fin.");
    return;
  }
  if (!userId) {
    Alert.alert("Sesión no disponible", "No se encontró el usuario.");
    return;
  }
  if (!ownedGameId) {
    Alert.alert("Juego no disponible", "No se encontró el juego.");
    return;
  }

  try {
    if (ownedGame?.maxRentTime && totalDays > ownedGame.maxRentTime) {
      Alert.alert("Duración excedida", `Máximo ${ownedGame.maxRentTime} días.`);
      return;
    }
    await createBooking({ ownedGameId, userId, rentDate: startDate, returnDate: endDate });
    Alert.alert("Solicitud enviada", "Tu reserva se ha creado.");
    router.push("/(tabs)/home");
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "No se pudo crear la reserva. Intenta de nuevo.");
  }
}


  const allowedWeekdays = useMemo(() => {
    if (!openingRules) return new Set<number>();
    try {
      const parsed: OpeningRule[] = JSON.parse(openingRules);
      const map: Record<string, number> = { SUN:0 , MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6 };
      return new Set(parsed.map((r) => map[r.weekday]));
    } catch (e) {
      return new Set<number>();
    }
  }, [openingRules]);

  const days = useMemo(() => buildMonthDays(monthCursor.getFullYear(), monthCursor.getMonth()), [monthCursor]);

  const handleSelectDay = (day: Date) => {
    const isAllowed = allowedWeekdays.size === 0 || allowedWeekdays.has(day.getDay());
    if (!isAllowed) return;
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
      return;
    }

    // si el día seleccionado es antes del inicio, reinicia rango
    if (day < startDate) {
      setStartDate(day);
      setEndDate(null);
      return;
    }

    const diff =
      Math.round((day.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    if (ownedGame?.maxRentTime && diff > ownedGame.maxRentTime) {
      const capped = new Date(startDate);
      capped.setDate(startDate.getDate() + ownedGame.maxRentTime - 1);
      setEndDate(capped);
      return;
    }
    setEndDate(day);
  };

  const isSameDay = (a: Date | null, b: Date | null) =>
    a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const inRange = (d: Date) =>
    startDate && endDate ? d > startDate && d < endDate : false;

  const totalDays = startDate && endDate ? Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1 : 0;
  const overMax = ownedGame?.maxRentTime ? totalDays > ownedGame.maxRentTime : false;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={10}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.title}>Loan Request</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.gameCard}>
          <View style={{ flex: 1, gap: 6 }}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{ownedGame?.status?.name}</Text>
            </View>
            <Text style={styles.gameTitle}>Catan: Seafarers</Text>
            <Text style={styles.gameSub}>Game ID: {ownedGame?.gameBddId}</Text>
          </View>
          <Image
            source={{
              uri: ownedGame?.gameBdd?.thumbnail|| "" ,
            }}
            style={styles.cover}
          />
        </View>

        <View style={styles.dateRow}>
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>Start Date</Text>
            <Text style={styles.dateValue}>{formatDate(startDate)}</Text>
          </View>
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>End Date</Text>
            <Text style={styles.dateValue}>{formatDate(endDate)}</Text>
          </View>
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.calHeader}>
            <Text style={styles.calMonth}>
              {monthCursor.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
            </Text>
            <View style={styles.calNav}>
              <Pressable onPress={() => setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth() - 1, 1))}>
                <Text style={styles.calNavBtn}>‹</Text>
              </Pressable>
              <Pressable onPress={() => setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 1))}>
                <Text style={styles.calNavBtn}>›</Text>
              </Pressable>
            </View>
          </View>

           {/* <View style={styles.weekdayRow}>
            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
              <Text key={d} style={styles.weekday}>
                {d}
              </Text>
            ))}
          </View>  */}

          <View style={styles.grid}>
            {days.map((d, idx) => {
              const isAllowed = allowedWeekdays.size === 0 || allowedWeekdays.has(d.date.getDay());
              const isStart = isSameDay(d.date, startDate);
              const isEnd = isSameDay(d.date, endDate);
              const inSelectedRange = inRange(d.date);
              const selected = isStart || isEnd;
              return (
                <Pressable
                  key={idx}
                  onPress={() => handleSelectDay(d.date)}
                  style={[
                    styles.dayBtn,
                    (!d.inMonth || !isAllowed) && { opacity: 0.35 },
                    inSelectedRange && styles.dayInRange,
                    selected && styles.daySelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      (!d.inMonth || !isAllowed) && styles.dayMuted,
                      selected && styles.daySelectedText,
                    ]}
                  >
                    {d.date.getDate()}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryLeft}>
            <View style={styles.dot} />
            <Text style={styles.summaryText}>
              Duración máxima: {ownedGame?.maxRentTime ?? "--"} días
            </Text>
          </View>
          <Text style={[styles.totalText, overMax && { color: "#F87171" }]}>
            Total: {totalDays > 0 ? `${totalDays} Días` : "--"}
          </Text>
        </View>

        <Pressable
          style={styles.cta}
          onPress={() => onPresCreateBooking(startDate, endDate, user?.id, ownedGame?.id)}
        >
          <Text style={styles.ctaText}>Confirmar solicitud</Text>
          <Text style={styles.ctaText}>→</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
