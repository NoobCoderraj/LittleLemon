import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Color from '../assets/Color';
import foodData from './../foodData.json'; // Import JSON data

const HomeScreen = () => {
  const navigation = useNavigation(); // Initialize useNavigation hook

  const goToOrderScreen = (item) => {
    navigation.navigate('OrderScreen', { item }); // Navigate to OrderScreen and pass item data
  };
  return (
    <View style={{ paddingTop: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('./../assets/images/logo.png')}
          style={{ height: 70, width: 70, marginLeft: 120 }}
        />
        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Little Lemon</Text>
      </View>

      {/* //container  */}

      <View style={styles.container}>
        <View>
          <Text style={{ color: Color.primaryColor, fontSize: 40, fontWeight: 'bold' }}>Little Lemon</Text>
          <Text style={{ fontSize: 30, color: Color.White }}>India</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ width: '50%', fontWeight: 400, color: Color.White, marginTop: 10 }}>
            we are a family owned Mediterranaean resturant, focusedo on
            traditional recipies served with a modern twist, Come with your family , In our family resturant
          </Text>
          <Image
            source={require('./../assets/images/dishLogo.jpg')}

            style={{
              borderRadius: 40, width: 180, height: 160, marginLeft: 15
            }}
          />
        </View>

      </View>

      {/* // Dish cards  */}

      <View style={{ padding: 10 }}>

        <View>
          <Text style={{ fontSize: 20, fontWeight: 500 }}>ORDER FOR DELIVERY!</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15 }} >
          <View style={{ backgroundColor: Color.Grey, width: 70, height: 30, borderRadius: 20, fontWeight: 400 }}><Text style={{ textAlign: 'center', marginTop: 3, }}>Starters</Text></View>
          <View style={{ backgroundColor: Color.Grey, width: 70, height: 30, borderRadius: 20, fontWeight: 400 }}><Text style={{ textAlign: 'center', marginTop: 3, }}>Mains</Text></View>

          <View style={{ backgroundColor: Color.Grey, width: 70, height: 30, borderRadius: 20, fontWeight: 400 }}><Text style={{ textAlign: 'center', marginTop: 3, }}>Desserts</Text></View>

          <View style={{ backgroundColor: Color.Grey, width: 70, height: 30, borderRadius: 20, fontWeight: 400 }}><Text style={{ textAlign: 'center', marginTop: 3, }}>Drinks</Text></View>


        </View>
      </View>


      {/* Cards  */}

      
      <ScrollView showsVerticalScrollIndicator={false}>
        {foodData.map((item) => (
          <TouchableOpacity key={item.id} style={{ padding: 10 }} onPress={() => goToOrderScreen(item)}>
            <View>
              <Text style={{ fontWeight: 600, fontSize: 16 }}>{item.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={{ width: '70%', color: Color.GreyText }}>{item.description}</Text>
              <Image
                source={{ uri: item.image }}
                style={{ width: 125, height: 90, borderRadius: 30 }}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({

  container: {
    backgroundColor: Color.Green,
    marginTop: 18,
    padding: 15
  }
})