// app/tabs/index.tsx
import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";

const C = {
  bg: "#F5F0E6",
  ink: "#2A2926",
  muted: "#6F6B63",
  brand: "#7C6A46",
  brandDark: "#5A4521",
  chip: "#E8DFD1",
  outline: "#CDBDA0",
};

type BtnProps = { title: string; href: string; variant?: "filled" | "outline" };
type Slide = { id: string; title: string; subtitle: string; image: any; href?: string };

const { width: SCREEN_W } = Dimensions.get("window");
const SLIDE_W = Math.min(720, SCREEN_W);
const SLIDE_H = Math.round(SLIDE_W * 0.48);

const SLIDES: Slide[] = [
    {
    id: "cicciolina",
    title: "Cicciolina",
    subtitle: "Tapas, pasta & wine in historic Cusco",
    image: require("../../assets/images/cicciolina.jpg"),
    href: "/details/1",
    },
    {
      id: "a-by-tung",
      title: "A by T.U.N.G",
      subtitle: "Modern tasting menu in Ho Chi Minh City",
      image: require("../../assets/images/abytung.jpg"),
      href: "/details/2", // id 2 = A by T.U.N.G
    },
  {
      id: "central",
      title: "Central",
      subtitle: "World-class tasting menu in Lima, Peru",
      image: require("../../assets/images/central.jpg"),
      href: "/details/3", // id 3 = Central
    },
  {
    id: "maido",
    title: "Maido",
    subtitle: "Nikkei cuisine blending Peruvian & Japanese flavors",
    image: require("../../assets/images/maido.jpg"),
    href: "/details/4",
  },
  {
      id: "disfrutar",
      title: "Disfrutar",
      subtitle: "Playful, modern tasting menu in Barcelona",
      image: require("../../assets/images/disfrutar.jpg"),
      href: "/details/5", // 👈 Disfrutar is id 5
  },
];

function PrimaryButton({ title, href, variant = "filled" }: BtnProps) {
  const router = useRouter();
  const base = [
    styles.btnBase,
    variant === "filled" ? styles.btnFilled : styles.btnOutline,
  ];
  const textStyle =
    variant === "filled" ? styles.btnTextFilled : styles.btnTextOutline;

  return (
    <Pressable
      onPress={() => router.push(href)}
      android_ripple={{ borderless: false }}
      style={({ pressed }) => [...base, pressed && { opacity: 0.92 }]}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
}

function HomeCarousel() {
  const router = useRouter();
  const listRef = useRef<FlatList<Slide>>(null);
  const [index, setIndex] = useState(0);
  const autoRef = useRef<NodeJS.Timeout | null>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(x / SLIDE_W);
    if (!Number.isNaN(newIndex) && newIndex !== index) {
      setIndex(newIndex);
    }
  };

  const start = useCallback(() => {
    // clear any existing interval
    if (autoRef.current) {
      clearInterval(autoRef.current);
      autoRef.current = null;
    }

    autoRef.current = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % SLIDES.length;
        // keep FlatList in sync
        listRef.current?.scrollToIndex({
          index: next,
          animated: true,
        });
        return next;
      });
    }, 3500);
  }, []);

  const stop = useCallback(() => {
    if (autoRef.current) {
      clearInterval(autoRef.current);
      autoRef.current = null;
    }
  }, []);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return (
    <View style={styles.carouselWrap}>
      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(i) => i.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={SLIDE_W}
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={16}
        getItemLayout={(_, i) => ({
          length: SLIDE_W,
          offset: SLIDE_W * i,
          index: i,
        })}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.slide, { width: SLIDE_W, height: SLIDE_H }]}
            onPress={() => item.href && router.push(item.href)}
          >
            <Image
              source={item.image}
              style={styles.slideImg}
              contentFit="cover"
              transition={150}
              accessibilityLabel={item.title}
              accessibilityIgnoresInvertColors
            />
            <View style={styles.slideOverlay} />
            <View style={styles.slideTextBox}>
              <Text style={styles.slideTitle}>{item.title}</Text>
              <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.dotsRow}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === index ? styles.dotActive : null]}
          />
        ))}
      </View>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.brandBadge}>
          <Text style={styles.badgeText}>BiteReview</Text>
        </View>

        <Text style={styles.title}>Find restaurants you’ll love</Text>
        <Text style={styles.subtitle}>
          Curated spots with ratings, highlights, and quick info — beautifully
          simple.
        </Text>

        <View style={styles.rowChips}>
          <Text style={styles.chip}>Top Rated</Text>
          <Text style={styles.chip}>Budget Friendly</Text>
          <Text style={styles.chip}>Date Night</Text>
          <Text style={styles.chip}>Takeout</Text>
        </View>

        <HomeCarousel />

        <View style={styles.buttons}>
          <PrimaryButton
            title="Browse Restaurants"
            href="/tabs/explore"
            variant="filled"
          />
          <PrimaryButton
            title="Jump to Cicciolina"
            href="/details/1"
            variant="outline"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  brandBadge: {
    alignSelf: "center",
    backgroundColor: C.chip,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 10,
  },
  badgeText: { color: C.brand, fontWeight: "700", letterSpacing: 0.3 },

  carouselWrap: {
    width: "100%",
    maxWidth: SLIDE_W,
    alignSelf: "center",
    marginBottom: 16,
  },
  slide: {
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#ddd",
    alignSelf: "center",
  },
  slideImg: { width: "100%", height: "100%" },
  slideOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  slideTextBox: {
    position: "absolute",
    left: 14,
    bottom: 12,
    right: 14,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "rgba(245,240,230,0.82)",
  },
  slideTitle: { color: C.ink, fontSize: 18, fontWeight: "800" },
  slideSubtitle: { color: C.muted, marginTop: 2, fontWeight: "700" },
  dotsRow: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 6,
    marginTop: 8,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  dotActive: { backgroundColor: C.brand },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: C.ink,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: C.muted,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 560,
  },
  rowChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
    marginBottom: 22,
    alignSelf: "center",
    justifyContent: "center",
  },
  chip: {
    backgroundColor: C.chip,
    color: C.ink,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: "hidden",
    fontSize: 12,
    fontWeight: "600",
  },
  buttons: {
    width: "100%",
    maxWidth: 360,
    alignSelf: "center",
    marginTop: 6,
  },
  btnBase: {
    width: "100%",
    minHeight: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    overflow: "hidden",
  },
  btnFilled: {
    backgroundColor: C.brand,
    borderWidth: 1,
    borderColor: C.brandDark,
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
