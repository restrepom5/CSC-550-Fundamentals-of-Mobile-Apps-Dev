import React, { ComponentProps } from 'react'; // Import ComponentProps
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons'; // Only import the component

// 1. Define Props Interface for SettingItem
// Use ComponentProps to derive the exact type for the 'name' prop of the FontAwesome5 component.
type FontAwesome5IconName = ComponentProps<typeof FontAwesome5>['name'];

interface SettingItemProps {
    icon: FontAwesome5IconName; // Use the derived type
    label: string;
    isDestructive?: boolean;
}

// Mock User Data for Health App
const userData = {
  name: 'Jane Doe',
  bio: 'Wellness Enthusiast & Data Logger',
  avatarUrl: 'https://placehold.co/100x100/4CAF50/FFFFFF?text=JD', // Health-themed placeholder
  
  // New Health/Fitness Metrics
  totalWorkouts: 42,
  totalKMCovered: 155.8,
  averageSleepScore: 7.6,
  memberSince: 'Oct 2024',
};

export default function Account() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* 1. Profile Header (Updated) */}
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: userData.avatarUrl }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.bio}>{userData.bio}</Text>
        </View>

        {/* 2. Health Metrics / Stats */}
        <View style={styles.statsContainer}>
          
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{userData.totalWorkouts}</Text>
            <Text style={styles.statLabel}>Total Workouts</Text>
          </View>
          
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{userData.totalKMCovered.toFixed(1)}</Text>
            <Text style={styles.statLabel}>Total Distance (km)</Text>
          </View>
          
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{userData.averageSleepScore.toFixed(1)}</Text>
            <Text style={styles.statLabel}>Avg Sleep Score</Text>
          </View>
        </View>

        {/* 3. Settings/Action List */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Account & Settings</Text>
          
          <SettingItem icon="user-cog" label="Edit Profile" />
          <SettingItem icon="bell" label="Notifications" />
          <SettingItem icon="file-alt" label="Privacy Policy" />
          <SettingItem icon="sign-out-alt" label="Log Out" isDestructive={true} />
        </View>

        <Text style={styles.footerText}>Member Since: {userData.memberSince}</Text>

      </ScrollView>
    </SafeAreaView>
  );
}

// 2. Apply Props Interface to the Component
const SettingItem = ({ icon, label, isDestructive = false }: SettingItemProps) => (
  <TouchableOpacity style={styles.settingItem}>
    <FontAwesome5 name={icon} size={20} color={isDestructive ? '#FF4136' : '#fff'} style={styles.settingIcon} />
    <Text style={[styles.settingLabel, isDestructive && styles.destructiveText]}>{label}</Text>
    <FontAwesome5 name="chevron-right" size={14} color="#555" />
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1e",
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center', // Center content horizontally
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#4CAF50', // Health accent border
    marginBottom: 10,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bio: {
    color: '#90EE90', // Lighter accent
    fontSize: 16,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#2e2e30',
    borderRadius: 12,
    paddingVertical: 15,
    marginBottom: 30,
  },
  statBox: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  statNumber: {
    color: '#4CAF50', // Green for metrics
    fontSize: 28,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
  },
  settingsSection: {
    width: '100%',
    backgroundColor: '#2e2e30',
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3c',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3c',
  },
  settingIcon: {
    width: 30,
    textAlign: 'center',
  },
  settingLabel: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  destructiveText: {
    color: '#FF4136', // Red for dangerous actions like Log Out
  },
  footerText: {
    color: '#8e8e93',
    fontSize: 12,
    marginTop: 10,
  }
});