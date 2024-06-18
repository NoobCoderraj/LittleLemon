import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { auth } from '../firebase';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import Color from '../assets/Color';

const db = getFirestore();  // Initialize Firestore

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        fetchOrders(user.uid);
      } else {
        setUser(null);
        setOrders([]);
      }
    });
    return unsubscribe; // Unsubscribe on unmount
  }, []);

  const fetchOrders = (uid) => {
    const q = query(collection(db, 'orders'), where('uid', '==', uid));
    onSnapshot(q, (querySnapshot) => {
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      setOrders(orders);
    });
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.navigate('LoginScreen');
    });
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <View style={styles.header}>
            <Text style={styles.username}>{user.email}</Text>
            <TouchableOpacity onPress={handleLogout} style={{backgroundColor:Color.primaryColor, height:40, width:80, borderRadius:40,alignItems:'center'}}>
              <Text style={styles.logoutButton}>Logout</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.orderItem}>
                <Image source={{ uri: item.item.image }} style={styles.orderImage} />
                <View style={styles.orderDetails}>
                  <Text style={styles.orderName}>{item.item.name}</Text>
                  <Text style={styles.orderDescription}>{item.item.description}</Text>
                  <Text style={styles.orderQuantity}>Quantity: {item.quantity}</Text>
                </View>
              </View>
            )}
          />
        </>
      ) : (
        <Text>Please log in to see your profile.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:40,
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {

    fontSize: 16,
    color: 'blue',
    marginTop:5,
    color:Color.White
  },
  orderItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  orderImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 16,
  },
  orderDetails: {
    flex: 1,
  },
  orderName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderDescription: {
    fontSize: 14,
    color: '#666',
  },
  orderQuantity: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default ProfileScreen;
