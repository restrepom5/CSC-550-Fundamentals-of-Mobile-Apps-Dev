import { BackHandler, Button, Image, StyleSheet, Text, View } from "react-native";

// I have created this fucntion to simulate and app closing. 



export default function Profile() {

  const doExit = () => {
    BackHandler.exitApp();
  };
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.2HxDL5GRe5WJSuOHMI1qBwHaHa%3Fcb%3D12%26pid%3DApi&f=1&ipt=02d4b803f9eddcf3869a3f37913ee3fb977a23c6110de1d83bb846d3f4395eb2&ipo=images",
        }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Frankely Rodriguez</Text>
      <Text style={styles.bio}></Text>

       <Button title="Exit App" onPress={doExit} />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  name: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  bio: { color: "#ccc", fontSize: 16, marginTop: 8 },
});
