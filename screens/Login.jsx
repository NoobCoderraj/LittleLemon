// Login.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';  // Import appropriate Firebase function
import { auth } from '../firebase';  // Ensure this path is correct
import Color from '../assets/Color';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      Alert.alert('Login Successful');
      navigation.navigate('HomeScreen');  // Navigate to HomeScreen after successful login
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
        <View>
            <Image 
            source={require('./../assets/images/logo.png')}
            />
        </View>
      <Text style={styles.header}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleLogin} color={Color.primaryColor} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10
  }
});
