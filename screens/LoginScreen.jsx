import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button } from "@react-native-material/core";
import { auth } from '../firebase';  // Ensure this path is correct
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import Color from '../assets/Color';

const db = getFirestore();  // Initialize Firestore

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Save name and surname to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        surname: surname,
        email: email
      });

      Alert.alert('Registration Successful');
      navigation.navigate('HomeScreen');  // Navigate to Profile screen after successful registration
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
    }
  };

  return (
    <View style={styles.padding}>
      <View style={styles.header}>
        <Image source={require('./../assets/images/logo.png')} style={styles.img} />
        <Text style={styles.text}>Little Lemon</Text>
      </View>
      <View style={styles.containerColor}>
        <Text style={styles.textContainer}>Let's get to know you</Text>
      </View>
      <View style={styles.mainView}>
        <View style={styles.personalView}>
          <Text style={styles.personalText1}>Personal information</Text>
        </View>
        <TextInput variant="outlined" label="Name" style={{ marginTop: 20 }} value={name} onChangeText={setName} />
        <TextInput variant="outlined" label="Surname" style={{ marginTop: 20 }} value={surname} onChangeText={setSurname} />
        <TextInput variant="outlined" label="Email" style={{ marginTop: 20 }} value={email} onChangeText={setEmail} />
        <TextInput variant="outlined" label="Password" style={{ marginTop: 20 }} value={password} onChangeText={setPassword} secureTextEntry />
        <View style={{ paddingTop: 30 }}>
          <Button title="Register" color={Color.primaryColor} tintColor={Color.Black} style={{ height: 50, width: '100%' }} onPress={handleRegister} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={{ color: Color.Black, fontWeight: 400, fontSize: 16, textAlign: 'center', paddingTop: 20 }}>Already Registered? Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  padding: {
    paddingTop: 5,
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 65,
    paddingBottom: 10
  },
  img: {
    height: 90,
    width: 90
  },
  text: {
    fontWeight: 'bold',
    fontSize: 25
  },
  containerColor: {
    backgroundColor: Color.Green,
    height: 150
  },
  textContainer: {
    color: Color.White,
    textAlign: 'center',
    paddingTop: 55,
    fontSize: 24
  },
  mainView: {
    padding: 15
  },
  personalView: {
    paddingTop: 15
  },
  personalText1: {
    fontWeight: '600',
    fontSize: 18
  }
});
