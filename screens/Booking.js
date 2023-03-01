import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';


import SearchableDropdown from 'react-native-searchable-dropdown';


const items = [

  { id: 1, name: 'Althouse Lot(Lot H) - Staff and Student Permit Lot' },
  { id: 2, name: 'Alumni/Thompson (Lot M) - Visitor Lot' },
  { id: 3, name: 'Bayfield and Ausable Halls - Residence Parking' },
  { id: 4, name: 'Chemistry Lot(Lot Q) - Grey Faculty/Staff Lot' },
  { id: 5, name: 'Elborn College(Lot X) - Grey Faculty/Staff Lot' },
  { id: 6, name: 'Huron Flats(Lot S) = Grey Faculty/Staff Lot' },
  { id: 7, name: 'Kent Drive Lot(Lot A) - Clinic Patient and Staff Reserved Lot' },
  { id: 8, name: 'Lambton(Lot L) - Orange Faculty/Staff Lot' },
  { id: 9, name: 'Medical Science (Lot C) - Dental Patient Lot' },
  { id: 10, name: 'Medway(Lot R) = Student Lot' },
];

const Booking = ({navigation}) => {

  const [selectedItems, setSelectedItems] = useState();


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
            This is The Booking Screen Where You can Select an Appropriate Parking Place!
        </Text>
        <Text style={styles.headingText}>
          Dropdown Selection of Parking Lots
        </Text>
        <SearchableDropdown
          onTextChange={(text) => console.log(text)}
        
          selectedItems={selectedItems}
          onItemSelect={(item) => setSelectedItems(item)}

          containerStyle={{ padding: 5 }}
          //suggestion container style
          textInputStyle={{
            //inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6',
          }}
          itemStyle={{
            //single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            //text style of a single dropdown item
            color: '#222',
          }}
          itemsContainerStyle={{
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            maxHeight: '60%',
          }}
          items={items}
          //mapping of item array
          defaultIndex={2}
          //default selected item index
          placeholder="placeholder"
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
        />
        
        <View style={[{ width: "90%", margin: 20, backgroundColor: "black" }]}>
            <Button
                onPress={() => navigation.push('Mapping')}
                title="Go to Parking Lots"
                color="#000000"
                        
            />
        </View> 
      </View>
    </SafeAreaView>
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headingText: {
    padding: 8,
  },
});
