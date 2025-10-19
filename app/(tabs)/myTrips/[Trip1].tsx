import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Modal,
  Pressable,
  Dimensions,
  Button,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

const images = {
  spain: [
    require("../../../assets/spain1.jpg"),
    require("../../../assets/spain2.png"),
    require("../../../assets/spain3.png"),
    require("../../../assets/spain4.png"),
    require("../../../assets/spain5.png"),
    require("../../../assets/spain6.png"),
  ],
  portugal: [
    require("../../../assets/portugal1.png"),
    require("../../../assets/portugal2.png"),
    require("../../../assets/portugal3.png"),
  ],
  brazil: [
    require("../../../assets/brazil1.jpg"),
    require("../../../assets/brazil2.jpg"),
    require("../../../assets/brazil3.png"),
  ],
};

type TripKey = keyof typeof images;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  gallery: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageThumb: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 8,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: width,
    height: height,
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 10,
    borderRadius: 20,
  },
  closeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  navButton: {
    position: "absolute",
    top: height / 2 - 20,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 20,
  },
  leftNav: {
    left: 10,
  },
  rightNav: {
    right: 10,
  },

  // NEW styles for Book button and modal
  bookButtonContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  bookModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  bookModalContent: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  bookModalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default function TripGallery() {
  const { Trip1 } = useLocalSearchParams();

  const tripParamRaw = Trip1;
  const tripParam = typeof tripParamRaw === "string" ? tripParamRaw.toLowerCase() : "";
  const isValidTrip = tripParam in images;

  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [bookModalVisible, setBookModalVisible] = useState(false); // NEW

  if (!isValidTrip) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Trip not found</Text>
      </View>
    );
  }

  const tripKey = tripParam as TripKey;
  const tripImages = images[tripKey];

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? tripImages.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === tripImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {tripKey.charAt(0).toUpperCase() + tripKey.slice(1)} Gallery
      </Text>

      <ScrollView contentContainerStyle={styles.gallery}>
        {tripImages.map((img, idx) => (
          <Pressable key={idx} onPress={() => openModal(idx)}>
            <Image source={img} style={styles.imageThumb} />
          </Pressable>
        ))}
      </ScrollView>

      {/* Book Trip Button */}
      <View style={styles.bookButtonContainer}>
        <Button title="Book Trip" onPress={() => setBookModalVisible(true)} />
      </View>

      {/* Fullscreen modal */}
      <Modal visible={modalVisible} transparent={true} onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <Image source={tripImages[currentIndex]} style={styles.fullImage} />

          <Pressable style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeText}>✕</Text>
          </Pressable>

          <Pressable style={[styles.navButton, styles.leftNav]} onPress={goPrev} hitSlop={20}>
            <Text style={{ fontSize: 30, color: "white" }}>‹</Text>
          </Pressable>

          <Pressable style={[styles.navButton, styles.rightNav]} onPress={goNext} hitSlop={20}>
            <Text style={{ fontSize: 30, color: "white" }}>›</Text>
          </Pressable>
        </View>
      </Modal>

      {/* Book Modal */}
      <Modal visible={bookModalVisible} transparent animationType="slide">
        <View style={styles.bookModalContainer}>
          <View style={styles.bookModalContent}>
            <Text style={styles.bookModalText}>Book Your Next Adventure</Text>
            <Button
              title="Continue to Booking"
              onPress={() => {
                setBookModalVisible(false);
                router.push("/book");
              }}
            />
            <View style={{ height: 10 }} />
            <Button title="Cancel" color="gray" onPress={() => setBookModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
