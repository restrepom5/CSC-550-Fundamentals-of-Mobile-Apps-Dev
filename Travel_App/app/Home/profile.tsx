import { Image, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";

export default function Profile() {
  // Mock Data (Replace with actual user state later)
  const userData = {
    name: "Alex Johnson",
    missionTitle: "World Traveler & Disciple Maker",
    totalTrips: 5,
    upcomingTrips: 2,
    avatarUrl: "https://i.pravatar.cc/150?img=68", // Random high-quality avatar URL
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* 1. Profile Header */}
        <Image
          source={{ uri: userData.avatarUrl }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.bio}>{userData.missionTitle}</Text>
        
        {/* Mission Summary / Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{userData.totalTrips}</Text>
            <Text style={styles.statLabel}>Total Missions</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{userData.upcomingTrips}</Text>
            <Text style={styles.statLabel}>Upcoming</Text>
          </View>
        </View>

        {/* 3. Action Buttons */}
        <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Settings & Preferences</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#111" },
  container: {
    flex: 1,
    backgroundColor: "#1c1c1e",
    alignItems: "center",
    padding: 20,
    paddingTop: 80,
  },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 15, borderWidth: 3, borderColor: '#007AFF' },
  name: { color: "#fff", fontSize: 26, fontWeight: "bold" },
  bio: { color: "#aaa", fontSize: 16, marginTop: 4, marginBottom: 30 },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    padding: 15,
    backgroundColor: '#2e2e30',
    borderRadius: 10,
    marginBottom: 30,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#007AFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#ccc',
    fontSize: 14,
  },
  
  // ⭐️ NEW STYLE FOR IMAGE ⭐️
  tributeImage: {
    width: 80,         
    height: 80,        
    borderRadius: 40,  // Circular
    alignSelf: 'center', 
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#f0ad4e',
  },

  // Actions
  actionButton: {
    backgroundColor: "#2e2e30",
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  actionText: {
    color: "#fff",
    fontSize: 18,
  },
  logoutButton: {
    marginTop: 20,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  logoutText: {
    color: "#ff4444",
    fontSize: 18,
    fontWeight: '600',
  }
});