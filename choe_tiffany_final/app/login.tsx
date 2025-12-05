import { loginApi } from '@/api/api';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { useApp } from '@/src/context/provider';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [username, setUsername] = useState('tchoe');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { login } = useApp();

  const handleLogin = () => {
    const user = loginApi(username, password);
    if (user) {
      login(user);
      router.replace('/(tabs)');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ffffff', dark: '#ffffff' }}
      headerImage={
        <View style={styles.headerContainer}>
          <Image
            source={require('@/assets/images/splash-logo.png')}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>
      }
    >
      <View style={styles.content}>
        <View style={styles.form}>
          <ThemedText style={styles.label}>Username</ThemedText>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <ThemedText style={[styles.label, { marginTop: 16 }]}>
            Password
          </ThemedText>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
            />
            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              style={styles.eyeButton}
            >
              {showPassword ? (
                <IconSymbol name="eye" size={22} color="#255CBA" />
              ) : (
                <IconSymbol name="eye.slash" size={22} color="#255CBA" />
              )}
            </Pressable>
          </View>
        </View>
        <Pressable style={styles.button} onPress={handleLogin}>
          <ThemedText style={styles.buttonText}>Login</ThemedText>
        </Pressable>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: height * 0.28,
    paddingBottom: height * 0.15,
  },
  headerImage: {
    width: width * 0.5,
    height: width * 0.5,
  },
  content: {
    alignItems: 'center',
    marginTop: height * 0.02,
    width: '100%',
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#1B1F49',
    marginBottom: 20,
  },
  label: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#1B1F49',
    textAlign: 'left',
  },
  input: {
    width: width * 0.7,
    height: width * 0.12,
    borderWidth: 2,
    borderColor: '#255CBA',
    backgroundColor: '#FDFCF7',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#1B1F49',
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
  form: {
    width: width * 0.7,
    alignSelf: 'center',
    alignItems: 'flex-start',
  },
  passwordContainer: {
    width: width * 0.7,
    justifyContent: 'center',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -11 }],
  },
});

/*
colors 
#F57A2A
#F9A85A 
#255CBA
#7BB6FF
#1B1F49
#FDFCF7
#FFFFFF
*/
