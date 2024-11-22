import React, { useState, useEffect } from 'react';
import { Image, View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Picker } from '@react-native-picker/picker';

type FilterMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'Filter'>;

export default function FilterMenuScreen({ route, navigation }: FilterMenuScreenProps) {

  // Extract menuItems from route.params with a default empty array
  const menuItems = route.params?.menuItems || [];
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [selectedCourse, setSelectedCourse] = useState<string>('All'); // 'All' to show everything

  // Filter by course type
  const filterByCourse = (course: string) => {
    if (course === 'All') {
      setFilteredItems(menuItems); // Show all items
    } else {
      setFilteredItems(menuItems.filter(item => item.course === course)); // Filter by selected course
    }
  };

  // Apply the filter when selectedCourse changes
  useEffect(() => {
    filterByCourse(selectedCourse); // Apply filter
  }, [selectedCourse, menuItems]); // Also re-run the filter if menuItems changes

  const { width, height } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/LaptopGuy.png')} style={styles.imgLaptop} />

      <View style={styles.box}>
        <Text style={styles.heading}>Filter Menu</Text>

        {/* Picker to select course */}
        <Picker
          selectedValue={selectedCourse}
          onValueChange={(itemValue) => setSelectedCourse(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Starters" value="Starters" />
          <Picker.Item label="Mains" value="Mains" />
          <Picker.Item label="Desserts" value="Desserts" />
        </Picker>

{/*list of all filtered items*/}
        <FlatList
          data={filteredItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              <Text style={styles.dishName}>{item.dishName} - {item.course}</Text>
              <Text>{item.description}</Text>
              <Text>${item.price.toFixed(2)}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imgLaptop: {
    height: 160,
    width: 190,
  },
  heading: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
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
  menuItem: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    width: '100%',
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    width: '80%',
    height: 50,
    marginBottom: 20,
    backgroundColor: '#EDBEA4',  // Style the picker for better visual consistency
    borderRadius: 25,
  },
});