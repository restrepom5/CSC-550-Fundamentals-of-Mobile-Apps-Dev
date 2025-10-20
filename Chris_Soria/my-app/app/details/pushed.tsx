import { useLocalSearchParams, Link } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from "react-native";

const C = { bg: "#F5F0E6", card: "#EFE5D6", ink: "#2A2926", muted: "#6F6B63", brand: "#7C6A46", outline: "#CDBDA0" };

type Extra = {
  label: string;
  entry: string;
  money: string[];
  connect: string[];
  transport: string[];
  safety: string[];
  packing: string[];
  emergency: string;
};

const INFO: Record<string, Extra> = {
    "1": {
      label: "Vietnam",
      entry:
        "US citizens can enter visa-free for short stays via e-visa (30 days, single entry). Apply online at https://evisa.xuatnhapcanh.gov.vn/ before travel. Passport must be valid 6 + months beyond entry.",
      money: [
        "Currency: VND (₫ Vietnamese dong); cash still common, but cards accepted in major cities.",
        "Exchange at banks or reputable counters; avoid street changers.",
        "Tipping not expected, though 5 – 10 % appreciated in tourist spots."
      ],
      connect: [
        "SIM/eSIM: Viettel, MobiFone, Vinaphone — good 4G nationwide; some 5G in cities.",
        "Download: Grab (ride-hailing), Google Maps, Google Translate, VNPay or Momo for mobile pay.",
        "Wi-Fi common in cafés/hotels; VPN recommended for secure browsing."
      ],
      transport: [
        "Domestic flights connect Hanoi ↔ Danang ↔ HCMC easily.",
        "City: Grab Bike/Car apps are cheap and reliable.",
        "Intercity: sleeper trains (Reunification Express) or buses; rent scooters with care and helmet."
      ],
      safety: [
        "Traffic is chaotic — cross slowly and predictably; avoid driving yourself if unlicensed.",
        "Beware of bag-snatching in busy tourist zones; keep valuables zipped.",
        "Tap water not potable; use bottled or boiled water.",
        "Respect temple dress codes (shoulders/knees covered)."
      ],
      packing: [
        "Plugs: Type A/C · 220 V (dual-voltage chargers fine).",
        "Light clothes year-round; raincoat for wet season (May – Oct in North/South, Sep – Dec in Central).",
        "Bring sunscreen, bug repellent, travel meds for humidity."
      ],
      emergency:
        "Police 113 · Fire 114 · Ambulance 115 · Tourist support (024) 3933 5631 (Hanoi) / (028) 3829 8911 (HCMC)"
    },
  "2": {
    label: "Paris",
    entry: "US passport holders can visit France visa-free up to 90 days in any 180-day period. Passport should be valid 3+ months past departure.",
    money: ["Currency: EUR (€)", "Coffee €2–4 · Meal €12–25", "Tipping optional (round up/5–10% for great service)"],
    connect: ["eSIMs: Orange Holiday / Airalo", "Download: Google Maps, Citymapper", "Café Wi-Fi is common"],
    transport: ["Navigo Easy/weekly pass saves money", "CDG → Paris: RER B · Orly → Paris: OrlyVal/OrlyBus"],
    safety: ["Pickpockets in metro/tourist zones", "Beware ‘friendship bracelet’ & clipboard scams"],
    packing: ["Type E plugs · 230V", "Layers + compact umbrella"],
    emergency: "Emergency: 112 · US Embassy: usembassy.gov/france/",
  },
  "3": {
    label: "Tokyo",
    entry: "US citizens visa-free for ≤90 days; passport valid for duration of stay.",
    money: ["Currency: JPY (¥)", "Suica/PASMO for transit & convenience stores", "No tipping"],
    connect: ["eSIM: Ubigi/Airalo", "Download: Google Maps, Japan Travel", "Station Wi-Fi common"],
    transport: ["JR + Metro cover most areas; use IC card", "NRT: Narita Express · HND: Keikyu/Monorail"],
    safety: ["Very safe; low voices on trains", "Carry a small trash bag"],
    packing: ["Type A/B · 100V (chargers OK)", "Comfortable walking shoes"],
    emergency: "Police 110 · Fire/Ambulance 119",
  },
  "4": {
    label: "New York",
    entry: "Domestic ID for US; international visitors need ESTA/visa as applicable.",
    money: ["Currency: USD ($)", "Sales tax added at checkout", "Tipping ~18–20% restaurants"],
    connect: ["eSIM widely supported; strong 5G", "Download: Google Maps, Citymapper, NYC Subway"],
    transport: ["Subway 24/7—tap with OMNY", "JFK: AirTrain+Subway · EWR: AirTrain+NJ Transit"],
    safety: ["Stay aware late nights; avoid empty cars", "Avoid ‘CD sellers’ scams"],
    packing: ["Type A/B · 120V", "Weather swings—check forecast"],
    emergency: "Emergency: 911 · Non-emergency: 311",
  },
  "5": {
    label: "Cusco",
    entry: "US citizens are visa-free for tourism (up to ~183 days). Ensure your passport is valid for your stay and keep your entry card/QR from immigration.",
    money: [
      "Currency: PEN (Peruvian sol, S/). ATMs widely available.",
      "Keep small bills for markets; many tourist spots accept cards.",
      "Tipping ~10% at restaurants is appreciated, not mandatory."
    ],
    connect: [
      "eSIM/SIM: Claro, Movistar, Entel (eSIM supported in major shops).",
      "Download: Google Maps + MAPS.ME (offline), PeruRail/Inca Rail apps.",
      "Hotel Wi-Fi common; speeds can vary."
    ],
    transport: [
      "CUZ airport → center: licensed taxis or apps (Cabify/Didi). Agree fare in advance if street taxi.",
      "Machu Picchu: train (PeruRail/Inca Rail) via Ollantaytambo; bus from Aguas Calientes.",
      "Local: walk the historic center; colectivos/minibuses for Sacred Valley."
    ],
    safety: [
      "High altitude (~3,400 m): acclimate 24–48h, hydrate, go easy day 1–2.",
      "Consider coca tea; ask a doctor about acetazolamide if needed.",
      "Petty theft in crowds—keep bags zipped; use registered taxis.",
      "Drink bottled/boiled water; avoid ice from unknown sources."
    ],
    packing: [
      "Plugs: Type A/C • 220V (most modern chargers are dual-voltage).",
      "Strong sun at altitude: hat, sunscreen, sunglasses.",
      "Layers for cold nights; light rain jacket (Nov–Mar is wetter)."
    ],
    emergency: "Police 105 · Ambulance (SAMU) 106 · Fire 116"
  }

};

// Optional name→id helper for robustness
const NAME_TO_ID: Record<string, string> = {
    "Ha Long Bay": "1",
    "Ha Long Bay, Vietnam": "1",
    "Paris": "2",
    "Paris, France": "2",
    "Tokyo": "3",
    "Tokyo, Japan": "3",
    "New York": "4",
    "New York, USA": "4",
    "Cusco": "5",
    "Cusco, Peru": "5",
};

const FALLBACK: Extra = {
  label: "Destination",
  entry: "Check visa rules, passport validity, and onward ticket requirements.",
  money: ["Confirm currency & typical prices", "Know local tipping customs"],
  connect: ["Consider eSIM/SIM", "Download offline maps/translator"],
  transport: ["Research airport → city options", "Local transit passes or ride-hail apps"],
  safety: ["Review common scams & local etiquette"],
  packing: ["Plug type & voltage", "Weather-appropriate layers"],
  emergency: "Save local emergency number and your embassy contact.",
};

function resolveId(params: Record<string, unknown>): string | undefined {
  const rawId = params.id;
  const id =
    Array.isArray(rawId) ? rawId[0] :
    typeof rawId === "string" ? rawId :
    undefined;

  if (id && INFO[id]) return id;

  // Try name if id missing/invalid
  const rawName = params.name;
  const name =
    Array.isArray(rawName) ? rawName[0] :
    typeof rawName === "string" ? rawName :
    undefined;

  if (name) {
    const byName = NAME_TO_ID[name.trim()];
    if (byName && INFO[byName]) return byName;
  }
  return undefined;
}

export default function ExtraInfoScreen() {
  const params = useLocalSearchParams<Record<string, unknown>>();
  const resolvedId = resolveId(params);
  const data = (resolvedId && INFO[resolvedId]) || FALLBACK;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.h1}>Extra Info · <Text style={styles.h1Accent}>{data.label}</Text></Text>
        <Text style={styles.sub}>Practical tips tailored to your destination.</Text>

        <Section title="Entry & Visa">
          <Text style={styles.li}>{data.entry}</Text>
        </Section>

        <Section title="Money & Costs">{data.money.map((t, i) => <Text key={i} style={styles.li}>• {t}</Text>)}</Section>
        <Section title="Connectivity">{data.connect.map((t, i) => <Text key={i} style={styles.li}>• {t}</Text>)}</Section>
        <Section title="Getting Around">{data.transport.map((t, i) => <Text key={i} style={styles.li}>• {t}</Text>)}</Section>
        <Section title="Safety & Etiquette">{data.safety.map((t, i) => <Text key={i} style={styles.li}>• {t}</Text>)}</Section>
        <Section title="Power & Packing">{data.packing.map((t, i) => <Text key={i} style={styles.li}>• {t}</Text>)}</Section>

        <Section title="Emergency">
          <Text style={styles.li}>{data.emergency}</Text>
        </Section>

        <Link href="/tabs/explore" asChild>
          <Pressable style={styles.primary}><Text style={styles.primaryText}>Back to Explore</Text></Pressable>
        </Link>

        {/* Debug helper for dev builds only */}
        {__DEV__ && (
          <Text style={{ color: C.muted, textAlign: "center", marginTop: 8 }}>
            debug: id={String(resolvedId ?? "none")}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: C.bg, padding: 20, gap: 12 },
  h1: { fontSize: 24, fontWeight: "800", color: C.ink, textAlign: "center" },
  h1Accent: { color: C.muted, fontWeight: "800" },
  sub: { fontSize: 14, color: C.muted, textAlign: "center", marginBottom: 4 },

  card: {
    backgroundColor: C.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: "800", color: C.ink, marginBottom: 6 },
  li: { color: C.ink, marginTop: 4, lineHeight: 20 },

  primary: {
    marginTop: 8,
    backgroundColor: C.brand,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryText: { color: "#fff", fontWeight: "800" },
});
