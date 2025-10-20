import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const handleLinkPress = (url: string) => {
  Linking.openURL(url);
};

export default function ContactScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get in Touch</Text>
      <Text style={styles.subtitle}>Feel free to reach out through any of the platforms below.</Text>

      {/* Email Link */}
      <TouchableOpacity style={styles.linkItem} onPress={() => handleLinkPress('mailto:mashrekys@gmail.com')}>
        <FontAwesome name="envelope" size={24} color="#c71610" />
        <Text style={styles.linkText}>mashrekys@gmail.com</Text>
      </TouchableOpacity>

      {/* LinkedIn Link */}
      <TouchableOpacity style={styles.linkItem} onPress={() => handleLinkPress('https://www.linkedin.com/in/shafqat-mashrakey-831525265/')}>
        <FontAwesome name="linkedin-square" size={24} color="#0077b5" />
        <Text style={styles.linkText}>LinkedIn Profile</Text>
      </TouchableOpacity>

      {/* GitHub Link */}
      <TouchableOpacity style={styles.linkItem} onPress={() => handleLinkPress('https://github.com/shafqatmashrakey')}>
        <FontAwesome name="github" size={24} color="#333" />
        <Text style={styles.linkText}>GitHub Portfolio</Text>
      </TouchableOpacity>

      {/* On iOS, modals can be dismissed with a gesture, but other platforms like Web and Android need an explicit button. */}
      {Platform.OS !== 'ios' && (
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  linkText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
