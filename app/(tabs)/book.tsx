import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Calendar } from "react-native-calendars";

export default function BookScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [markedDates, setMarkedDates] = useState({});

  const onDayPress = (day: any) => {
    const selectedDate = day.dateString;

    if (!startDate || (startDate && endDate)) {
      setStartDate(selectedDate);
      setEndDate(null);
      setMarkedDates({
        [selectedDate]: {
          startingDay: true,
          endingDay: true,
          color: "#70d7c7",
          textColor: "white",
        },
      });
    } else if (startDate && !endDate) {
      if (selectedDate < startDate) {
        setStartDate(selectedDate);
        setMarkedDates({
          [selectedDate]: {
            startingDay: true,
            endingDay: true,
            color: "#70d7c7",
            textColor: "white",
          },
        });
      } else {
        setEndDate(selectedDate);
        const range = getDateRange(startDate, selectedDate);
        const marked: any = {};
        range.forEach((date, index) => {
          if (index === 0) {
            marked[date] = {
              startingDay: true,
              color: "#70d7c7",
              textColor: "white",
            };
          } else if (index === range.length - 1) {
            marked[date] = {
              endingDay: true,
              color: "#70d7c7",
              textColor: "white",
            };
          } else {
            marked[date] = {
              color: "#95e9da",
              textColor: "white",
            };
          }
        });
        setMarkedDates(marked);
      }
    }
  };

  const getDateRange = (start: string, end: string) => {
    const range = [];
    let current = new Date(start);
    const last = new Date(end);

    while (current <= last) {
      range.push(current.toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }

    return range;
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    console.log("From:", startDate, "To:", endDate);
    
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>📖 Book a Trip</Text>
      <Text style={styles.subtitle}>
        Find the perfect destination for your next adventure.
      </Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Where"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Calendar
        markingType={"period"}
        markedDates={markedDates}
        onDayPress={onDayPress}
        style={styles.calendar}
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  searchBar: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  calendar: {
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: "auto",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
