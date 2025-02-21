import { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Alert, Image } from 'react-native';
import { router } from 'expo-router';

// Dummy credentials
const DUMMY_UID = "admin123";
const DUMMY_PASSWORD = "password123";

export default function LoginScreen() {
  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (uid === DUMMY_UID && password === DUMMY_PASSWORD) {
      // Successful login
      router.replace('/camera');
    } else {
      // Failed login
      Alert.alert(
        "Login Failed",
        "Invalid UID or password. Please try again.\n\nHint: Use admin123/password123",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Image 
          source={require('../assets/images/Rai_University_Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter UID"
          value={uid}
          onChangeText={setUid}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.hint}>
          Hint: Use these credentials{'\n'}
          UID: admin123{'\n'}
          Password: password123
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    height: 50,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hint: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
});
