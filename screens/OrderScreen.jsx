import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Color from '../assets/Color';
import { auth } from '../firebase';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore();  // Initialize Firestore

const OrderScreen = ({ route, navigation }) => {
  const { item } = route.params;  // Get the item data passed from navigation
  const [quantity, setQuantity] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return unsubscribe; // Unsubscribe on unmount
  }, []);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePlaceOrder = async () => {
    if (!currentUser) {
      Alert.alert('Error', 'You need to be logged in to place an order.');
      return;
    }

    try {
      await addDoc(collection(db, 'orders'), {
        uid: currentUser.uid,
        item: item,
        quantity: quantity,
        orderTime: new Date()
      });
      Alert.alert('Order placed successfully');
      navigation.navigate('ProfileScreen');
    } catch (error) {
      Alert.alert('Error placing order', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Order Details</Text>
        <View style={{ width: 70 }}></View>
      </View>

      <View style={styles.content}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Quantity:</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity onPress={decreaseQuantity}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity onPress={increaseQuantity}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
          <Text style={styles.orderButtonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Color.Grey,
  },
  backButton: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 18,
    marginRight: 10,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 24,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Color.Grey,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  orderButton: {
    backgroundColor: Color.primaryColor,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  orderButtonText: {
    color: Color.White,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderScreen;
