// app/details/[id].tsx
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import * as Location from "expo-location";

const C = {
  bg: "#F5F5DC",
  card: "#EAD7B7",
  ink: "#1f2937",
  muted: "#4b5563",
  brand: "#7C6A46",
  outline: "#CDBDA0",
  error: "#9A3B3B",
};

type Restaurant = {
  name: string;
  description: string;
  image: any;
  highlights?: string[];
  price?: string;
  rating?: string;
  cityCountry: string;
  coords: { latitude: number; longitude: number };
};

// Haversine distance in km
function distanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const RESTAURANTS: Record<string, Restaurant> = {
  "1": {
    name: "Cicciolina",
    description:
      "Iconic Cusco restaurant known for its cozy atmosphere, tapas-style plates, handmade pasta, and a great wine selection just off the Plaza de Armas.",
    image: require("../../assets/images/cicciolina.jpg"),
    highlights: ["Tapas plates", "Fresh pasta", "Great wine list"],
    price: "$$–$$$ · ~$25–40/person",
    rating: "4.8 / 5",
    cityCountry: "Cusco, Peru",
    coords: { latitude: -13.5167, longitude: -71.978 },
  },
  "2": {
    name: "A by T.U.N.G",
    description:
      "Contemporary Vietnamese fine dining in Ho Chi Minh City, featuring creative tasting menus, seasonal ingredients, and an intimate atmosphere.",
    image: require("../../assets/images/abytung.jpg"),
    highlights: ["Tasting menu", "Wine pairing", "Modern Vietnamese"],
    price: "$$$$ · Tasting menu pricing",
    rating: "4.9 / 5",
    cityCountry: "Ho Chi Minh City, Vietnam",
    coords: { latitude: 10.78, longitude: 106.7 },
  },
  "3": {
    name: "Central",
    description:
      "Globally acclaimed Lima restaurant that explores Peru’s ecosystems through a multi-course tasting menu, from sea level up to the Andes.",
    image: require("../../assets/images/central.jpg"),
    highlights: ["Peruvian terroir", "Tasting menu", "Fine dining"],
    price: "$$$$ · Tasting menu pricing",
    rating: "5.0 / 5",
    cityCountry: "Lima, Peru",
    coords: { latitude: -12.127, longitude: -77.03 },
  },
  "4": {
    name: "Maido",
    description:
      "Lima’s famous Nikkei restaurant combining Peruvian ingredients with Japanese techniques in a creative, multi-course tasting experience.",
    image: require("../../assets/images/maido.jpg"),
    highlights: ["Nikkei cuisine", "Seafood dishes", "Tasting menu"],
    price: "$$$$ · Tasting menu pricing",
    rating: "4.9 / 5",
    cityCountry: "Lima, Peru",
    coords: { latitude: -12.125, longitude: -77.032 },
  },
  "5": {
    name: "Disfrutar",
    description:
      "Inventive Barcelona restaurant known for its playful, avant-garde tasting menus and Mediterranean flavors with a modern twist.",
    image: require("../../assets/images/disfrutar.jpg"),
    highlights: ["Creative plating", "Tasting menu", "Modern Spanish cuisine"],
    price: "$$$$ · Tasting menu pricing",
    rating: "4.9 / 5",
    cityCountry: "Barcelona, Spain",
    coords: { latitude: 41.385, longitude: 2.159 },
  },
};

export default function RestaurantDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string | undefined);
  const info = id ? RESTAURANTS[id] : undefined;

  const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(null);
  const [locError, setLocError] = useState<string | null>(null);
  const [locLoading, setLocLoading] = useState(false);

  const [weatherText, setWeatherText] = useState<string | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  // 🔹 Get current location (lastKnown + watchPosition fallback)
  useEffect(() => {
    if (Platform.OS === "web") {
      setLocError("Location is only available on a device or emulator.");
      return;
    }

    let watchSub: Location.LocationSubscription | null = null;

    const getLocation = async () => {
      try {
        setLocLoading(true);
        setLocError(null);

        const servicesEnabled = await Location.hasServicesEnabledAsync();
        if (!servicesEnabled) {
          setLocError("System location services are OFF. Turn on Location in settings.");
          return;
        }

        const permBefore = await Location.getForegroundPermissionsAsync();
        let status = permBefore.status;

        if (status !== "granted" && permBefore.canAskAgain) {
          const permAfter = await Location.requestForegroundPermissionsAsync();
          status = permAfter.status;
        }

        if (status !== "granted") {
          setLocError("Location permission is not granted for Expo Go.");
          return;
        }

        // Fast path: last known
        const lastKnown = await Location.getLastKnownPositionAsync();
        if (lastKnown?.coords) {
          setCoords(lastKnown.coords);
          return;
        }

        // Fallback: watch for first update
        watchSub = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Lowest,
            timeInterval: 2000,
            distanceInterval: 0,
          },
          (pos) => {
            setCoords(pos.coords);
          }
        );
      } catch (e: any) {
        setLocError(
          e?.message ||
            "Current location is unavailable. (Common on emulators if GPS is not set.)"
        );
      } finally {
        setLocLoading(false);
      }
    };

    getLocation();

    return () => {
      watchSub?.remove();
    };
  }, []);

  // 🔹 Network call – weather for restaurant location
  useEffect(() => {
    if (!info) return;
    let isMounted = true;

    const loadWeather = async () => {
      try {
        setWeatherLoading(true);
        setWeatherError(null);

        const { latitude, longitude } = info.coords;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

        const res = await fetch(url);
        const json = await res.json();

        if (json && json.current_weather && isMounted) {
          const t = json.current_weather.temperature;
          const wind = json.current_weather.windspeed;
          setWeatherText(`${t}°C · Wind ${wind} km/h`);
        } else if (isMounted) {
          setWeatherError("Weather data not available.");
        }
      } catch (e) {
        if (isMounted) {
          setWeatherError("Could not load weather near this restaurant.");
        }
      } finally {
        if (isMounted) setWeatherLoading(false);
      }
    };

    loadWeather();

    return () => {
      isMounted = false;
    };
  }, [id, info]);

  if (!info) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
        <View style={[styles.container, styles.center]}>
          <Text style={styles.title}>Unknown Restaurant</Text>
          <Text style={styles.helper}>Please select a restaurant from Explore.</Text>
          <View style={{ height: 12 }} />
          <Pressable
            style={[styles.btn, styles.btnOutline]}
            onPress={() => router.replace("/tabs/explore")}
          >
            <Text style={styles.btnTextOutline}>Back to Restaurants</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // Distance label (if we have user coords)
  const distanceLabel =
    coords != null
      ? `${distanceKm(
          coords.latitude,
          coords.longitude,
          info.coords.latitude,
          info.coords.longitude
        ).toFixed(1)} km`
      : null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text accessibilityRole="header" style={styles.title}>
          {info.name}
        </Text>

        <Image
          source={info.image}
          style={styles.image}
          contentFit="cover"
          transition={150}
          accessibilityLabel={`Photo of ${info.name}`}
          accessibilityIgnoresInvertColors
        />

        <Text style={styles.description}>{info.description}</Text>

        {/* CARD 1 – price / rating / highlights */}
        {(info.highlights && info.highlights.length > 0) || info.price || info.rating ? (
          <View style={styles.card}>
            {info.price && (
              <View style={styles.row}>
                <Text style={styles.cardLabel}>Price range</Text>
                <Text style={styles.cardValue}>{info.price}</Text>
              </View>
            )}

            {info.rating && (
              <View style={[styles.row, { marginTop: 6 }]}>
                <Text style={styles.cardLabel}>Rating</Text>
                <Text style={styles.cardValue}>{info.rating}</Text>
              </View>
            )}

            {info.highlights?.length ? (
              <View style={{ marginTop: 10 }}>
                <Text style={styles.cardLabel}>Highlights</Text>
                <View style={styles.chipsRow}>
                  {info.highlights.map((h) => (
                    <Text key={h} style={styles.chip}>
                      {h}
                    </Text>
                  ))}
                </View>
              </View>
            ) : null}
          </View>
        ) : null}

        {/* CARD 2 – restaurant location + distance from you */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Location</Text>
          <Text style={styles.cardValue}>{info.cityCountry}</Text>

          {locLoading && (
            <Text style={styles.cardMeta}>Detecting your current location…</Text>
          )}
          {locError && <Text style={styles.cardError}>{locError}</Text>}
          {distanceLabel && !locError && !locLoading && (
            <Text style={styles.cardMeta}>
              You are about {distanceLabel} away from this restaurant.
            </Text>
          )}
        </View>

        {/* CARD 3 – weather (network call) */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Weather near this restaurant</Text>
          {weatherLoading && (
            <Text style={styles.cardMeta}>Loading weather data…</Text>
          )}
          {weatherError && (
            <Text style={styles.cardError}>{weatherError}</Text>
          )}
          {weatherText && !weatherError && (
            <Text style={styles.cardMeta}>{weatherText}</Text>
          )}
        </View>

        {/* ACTION BUTTONS */}
        <View style={styles.actions}>

          <Pressable
            style={[styles.btn, styles.btnOutline]}
            onPress={() =>
              router.push({
                pathname: "/details/modal",
                params: { name: info.name },
              })
            }
          >
            <Text style={styles.btnTextOutline}>Review Tips</Text>
          </Pressable>

          <Pressable
            style={[styles.btn, styles.btnOutline]}
            onPress={() => router.replace("/tabs/explore")}
          >
            <Text style={styles.btnTextOutline}>Back to Restaurants</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: C.bg },
  center: { alignItems: "center", justifyContent: "center" },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: C.ink,
    textAlign: "center",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 16,
    backgroundColor: "#e5e7eb",
    marginBottom: 14,
    overflow: "hidden",
  },
  description: {
    fontSize: 16,
    color: C.ink,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 14,
  },
  card: {
    backgroundColor: C.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  cardLabel: { fontSize: 14, fontWeight: "700", color: C.ink, marginBottom: 4 },
  cardValue: { fontSize: 14, color: C.muted },
  cardMeta: { fontSize: 13, color: C.muted, marginTop: 6 },
  cardError: { fontSize: 13, color: C.error, marginTop: 6 },
  chipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 6 },
  chip: {
    backgroundColor: "#E8DFD1",
    color: C.ink,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: "hidden",
    fontSize: 12,
    fontWeight: "700",
  },
  actions: {
    marginTop: 6,
    marginBottom: 24,
    alignSelf: "center",
    width: "100%",
    maxWidth: 360,
    gap: 10,
  },
  helper: { fontSize: 14, color: C.muted, textAlign: "center" },
  btn: {
    width: "100%",
    minHeight: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  btnFilled: {
    backgroundColor: C.brand,
    borderWidth: 1,
    borderColor: "#5A4521",
  },
  btnOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: C.outline,
  },
  btnTextFilled: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  btnTextOutline: {
    color: C.ink,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});
