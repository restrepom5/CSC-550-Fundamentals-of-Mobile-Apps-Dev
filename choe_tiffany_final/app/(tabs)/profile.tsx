import { Dimensions, Modal, Pressable, StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { useApp } from '@/src/context/provider';
import { bookclubs } from '@/mock-data/data';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Profile() {
  const { user } = useApp();
  const bookclub = bookclubs.find((bc) => bc.id === user?.bookclubId);
  const [visible, setVisible] = useState(false);
  const { logout } = useApp();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Pressable onPress={() => setVisible(true)}>
          {user?.profileImage ? (
            <IconSymbol
              size={200}
              color="#1B1F49"
              name="person.circle.fill"
              style={styles.headerImage}
            />
          ) : (
            <IconSymbol
              size={200}
              color="#1B1F49"
              name="camera.circle.fill"
              style={styles.headerImage}
            />
          )}
        </Pressable>
      }
    >
      <ThemedView style={styles.titleContainer}>
        <Modal
          visible={visible}
          transparent
          animationType="fade"
          onRequestClose={() => setVisible(false)}
        >
          <View style={styles.overlay}>
            <View style={styles.modalBox}>
              <Pressable
                onPress={() => {
                  router.push('/camera');
                  setVisible(false);
                }}
              >
                <ThemedText type="subtitle">Open Camera</ThemedText>
              </Pressable>
              <Pressable onPress={() => setVisible(false)}>
                <ThemedText style={{ marginTop: 10 }}>Cancel</ThemedText>
              </Pressable>
            </View>
          </View>
        </Modal>

        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          Profile
        </ThemedText>
      </ThemedView>
      <ThemedText style={styles.textStyle}>Name: {user?.name}</ThemedText>
      <ThemedText style={styles.textStyle}>
        Username: {user?.username}
      </ThemedText>
      <ThemedText style={styles.textStyle}>
        Book Club: {bookclub?.name || 'No bookclub assigned'}
      </ThemedText>
      <Pressable style={styles.button} onPress={handleLogout}>
        <ThemedText style={styles.buttonText}>Logout</ThemedText>
      </Pressable>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    top: 50,
    left: '25%',
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  textStyle: {
    fontFamily: Fonts.rounded,
    fontSize: 16,
    marginBottom: 8,
    color: '#1B1F49',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalBox: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },
  button: {
    marginTop: 24,
    width: width * 0.2,
    height: width * 0.12,
    backgroundColor: '#F57A2A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1B1F49',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
