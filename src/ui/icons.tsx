import { Text } from "react-native";

type IconName =
  | "home" | "home-outline"
  | "add" | "add-circle" | "add-circle-outline"
  | "list" | "list-outline";

const GLYPHS: Record<IconName, string> = {
  "home": "🏠",
  "home-outline": "🏠",
  "add": "➕",
  "add-circle": "➕",
  "add-circle-outline": "➕",
  "list": "📒",
  "list-outline": "📒",
};

export function TabBarIcon({
  name,
  color,
  size = 20,
}: {
  name: IconName;
  color: string;
  size?: number;
}) {
  return <Text style={{ color, fontSize: size }}>{GLYPHS[name]}</Text>;
}
