import React, { useState } from 'react';
import { Image, View, Text, TextInput, Button, StyleSheet, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const courses = ['Starters', 'Mains', 'Desserts'];

type AddMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'AddItems'>;

export default function AddMenuScreen({ navigation, route }: AddMenuScreenProps) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(courses[0]);
  const [price, setPrice] = useState('');

  const handleSubmit = () => {
    const newItem = { dishName, description, course, price: parseFloat(price) };
    
    // Navigate back to HomeScreen and pass the new item
    if (route.params?.menuItems) {
      const updatedMenuItems = [...route.params.menuItems, newItem];
      navigation.navigate('Home', { menuItems: updatedMenuItems }); // Update menuItems in HomeScreen
    } else {
      navigation.navigate('Home', { menuItems: [newItem] }); // First time adding an item
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/ChefCooking.png')} style={styles.imgChef}/>
      <View style={styles.box}>
        <Text style={styles.Heading}>Add Items</Text>

        <Text style={styles.label}>Dish Name:</Text>
        <TextInput style={styles.input} onChangeText={setDishName} value={dishName} />

        <Text style={styles.label}>Description:</Text>
        <TextInput style={styles.description} onChangeText={setDescription} value={description} />

        <Text style={styles.label}>Course:</Text>
        <Picker selectedValue={course} onValueChange={setCourse} style={styles.picker} > 
          {courses.map((course) => (
            <Picker.Item key={course} label={course} value={course} />
          ))}
        </Picker>

        <Text style={styles.label}>Price:</Text>
        <TextInput style={styles.input} onChangeText={setPrice} value={price} keyboardType="numeric" />

        <Button title="Add Dish" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  imgChef:{
    height: 160,
    width: 190,
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
    textAlign:'center',
  },
  Heading: {
    textAlign: 'center',
    fontSize: 30,
    color:'white',
    fontWeight: 'bold',
  },
  input: {
    padding: 8,
    borderRadius: 25,
    marginBottom: 10,
    backgroundColor: '#EDBEA4',
    width:'80%',
  },
  description: {
    backgroundColor: '#EDBEA4',
    padding: 8,
    borderRadius: 25,
    marginBottom: 10,
    height: '25%',
    width :'80%',
  },
  picker: {
    width: '80%',
    height: 50,
    marginBottom: 20,
    backgroundColor: '#EDBEA4',  // Style the picker for better visual consistency
    borderRadius: 25,
  },
  box: {
    width: '110%',
    height: Dimensions.get('window').height * 0.70,
    backgroundColor: '#BF592B',
    borderRadius: 50,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
