import React, { useState, useEffect } from 'react';
import { Image, View, Text, Button, FlatList, StyleSheet, Dimensions, Alert, ToastAndroid } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  // Initialize menuItems state from route.params or default to an empty array
  const [menuItems, setMenuItems] = useState<{ dishName: string, description: string, course: string, price: number }[]>(route.params?.menuItems || []);

  // Calculate average price
  const averagePrice = menuItems.length > 0 
  ? menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length 
  : 0;

  //removal of a menu item
  const removeItem = (index: number) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => {
          const updatedMenuItems = menuItems.filter((_, i) => i !== index);
          setMenuItems(updatedMenuItems);
          navigation.setParams({ menuItems: updatedMenuItems }); // Update the global state
        }}
      ]
    );
  };

  useEffect(() => {
    // Update the menuItems state when the new item is added from the 'AddItems' screen
    if (route.params?.newItem) {
      const updatedMenuItems = [...menuItems, route.params.newItem];
      setMenuItems(updatedMenuItems);
      navigation.setParams({ menuItems: updatedMenuItems }); // Update the global state
    }
  }, [route.params?.newItem]);

 
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to</Text>
      <Text style={styles.title}>Chef's Menu</Text> 
      <Image source={require('../assets/images/BowlofFood.png')} style={styles.imgBowl}/> 

    

      <View style={styles.box}>
        <Text style={styles.CurrentMenu}>Current Menu</Text>

        <View style={styles.MenuBox}>
          <Text style={styles.TotalItems}>Total Items: {menuItems.length}</Text>
          <Text style={styles.averagePrice}>Average Price: ${averagePrice.toFixed(2)}</Text>

          <FlatList
            data={menuItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.menuItem}>
                <Text style={styles.dishName}>{item.dishName} - {item.course}</Text>
                <Text>{item.description}</Text>
                <Text>${item.price.toFixed(2)}</Text>
                <Button title="Remove" color="red" onPress={() => removeItem(index)} />
              </View>
            )}
          />
        </View>

        <Button title="Add Menu" onPress={() => navigation.navigate('AddItems', { menuItems })} />
        <Button title="Filter Menu" onPress={() => navigation.navigate('Filter', { menuItems })} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({  
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  welcome: {
    fontSize: 30,
  },
  title: {
    fontSize: 45,
    marginBottom: 20,
  },
  TotalItems: {
    fontSize: 18,
    marginTop: 10,
  },
  averagePrice: {
    fontSize: 18,
    marginBottom: 20,
  },
  CurrentMenu: {
    fontWeight: 'bold',
    fontSize: 35,
    color: 'white',
    textAlign: 'center',
  },
  imgBowl: {
   height: 100,
   width: 130,
  },
  box: {
    flex: 1,
    width: '110%',
    height: Dimensions.get('window').height * 0.70,
    backgroundColor: '#BF592B',
    borderRadius: 50,
    justifyContent: 'center',  // Centers vertically
    alignItems: 'center',      // Centers horizontally    
    bottom: -37,    
  },
  menuItem: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    width: '100%',
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  MenuBox: {
    borderRadius: 50,
    backgroundColor: '#EDBEA4',
    width: '80%',  // Adjust to desired width
    height: '70%',
    justifyContent: 'center',   // Center content vertically within the box
    alignItems: 'center',       // Center content horizontally within the box
  },
  
});
