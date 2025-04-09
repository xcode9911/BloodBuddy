import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Modal, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { router } from 'expo-router';

// Define the User type
interface User {
  id: number;
  name: string;
  avatar?: any; // Adjust the type based on your image source
}

export default function ChatList() {
  const [userType, setUserType] = useState<string | null>(null); // State for user type
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [users, setUsers] = useState<User[]>([]); // Use User type for users

  useEffect(() => {
    // Fetch user type from AsyncStorage
    const fetchUserType = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const decoded: any = jwtDecode(token);
          setUserType(decoded.userType); // Extract userType from the token
        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    };

    fetchUserType();
  }, []);

  useEffect(() => {
    if (userType) {
      // Fetch data from the API
      const fetchUsers = async () => {
        try {
          const response = await fetch('http://192.168.98.124:8000/api/users/allUsers');
          const data = await response.json();

          // Filter users based on the logged-in user type
          const filteredUsers = userType === 'Donor' ? data.gainers : data.donors;

          setUsers(filteredUsers); // Set the users array from the appropriate type
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      fetchUsers();
    }
  }, [userType]); // Add userType as a dependency to re-fetch if it changes

  const handleMyProfile = () => {
    router.push('/Myprofile');
  };

  const handleChatScreen = (userId: number, userName: string) => {
    router.push({
      pathname: '/ChatScreen',
      params: { receiverId: userId.toString(), name: userName }, // Use 'receiverId' as the key
    });
  };

  const location = [
    { label: 'Kathmandu', value: 'Kathmandu' },
    { label: 'Pokhara', value: 'Pokhara' },
    { label: 'Biratnagar', value: 'Biratnagar' },
    { label: 'Dharan', value: 'Dharan' },
    { label: 'Chitwan', value: 'Chitwan' },
    { label: 'Nepalgunj', value: 'Nepalgunj' },
  ];

  const bloodGroup = [
    { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' },
    { label: 'B-', value: 'B-' },
    { label: 'AB+', value: 'AB+' },
    { label: 'AB-', value: 'AB-' },
    { label: 'O+', value: 'O+' },
    { label: 'O-', value: 'O-' },
  ];

  const handleFind = () => {
    console.log('Finding donors...');
    setFilterVisible(false); // Close the modal after finding
  };

  return (
    <View style={styles.container}>
      <View style={[styles.circle, styles.bigCircle]} />
      <View style={styles.header}>
        <Image source={require('../assets/images/BloodbuddyLogo.png')} style={styles.logo} />
        <Text style={styles.title}>BloodBuddy</Text>
        <TouchableOpacity style={styles.profileButton} onPress={handleMyProfile}>
          <Icon name="user" size={30} color="#D11B31" style={styles.profileIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />

      {/* Title based on user type */}
      <Text style={styles.listTitle}>
        {userType === 'Donor' ? 'Gainers List' : 'Donors List'}
      </Text>

      <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(true)}>
        <View style={styles.bubble}>
          <Icon name="filter" size={25} color="#D11B31" />
        </View>
      </TouchableOpacity>

      {/* Filter Modal */}
      <Modal transparent visible={filterVisible} animationType="none">
        <TouchableWithoutFeedback onPress={() => setFilterVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalHeader}>Filter Your Location and Blood Group</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedLocation}
                    onValueChange={(itemValue) => setSelectedLocation(itemValue)}
                    style={styles.picker}
                  >
                    {location.map((loc) => (
                      <Picker.Item key={loc.value} label={loc.label} value={loc.value} />
                    ))}
                  </Picker>
                </View>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedBloodGroup}
                    onValueChange={(itemValue) => setSelectedBloodGroup(itemValue)}
                    style={styles.picker}
                  >
                    {bloodGroup.map((bloodG) => (
                      <Picker.Item key={bloodG.value} label={bloodG.label} value={bloodG.value} />
                    ))}
                  </Picker>
                </View>
                <TouchableOpacity style={styles.findButton} onPress={handleFind}>
                  <Text style={styles.findButtonText}>Find</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()} // Ensure the key is a string
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.donorItem} onPress={() => handleChatScreen(item.id, item.name)}>
            <Image source={item.avatar || require('../assets/images/BloodbuddyLogo.png')} style={styles.avatar} />
            <Text style={styles.donorName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  divider: {
    height: 1,
    backgroundColor: '#D11B31',
    marginTop: -10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#D11B31',
    marginLeft: -120,
    marginTop: -8,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D11B31',
    marginVertical: 10,
    textAlign: 'center',
  },
  circle: {
    position: 'absolute',
    borderRadius: 150,
    backgroundColor: '#FF495F',
  },
  bigCircle: {
    width: 300,
    height: 300,
    bottom: -180,
    right: -180,
  },
  profileButton: {
    padding: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#F8C8CE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    textAlign: 'center',
  },
  filterButton: {
    position: 'absolute',
    top: 80,  
    right: -3, 
    zIndex: 1,
  },
  bubble: {
    backgroundColor: '#F8C8CE',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    padding: 15,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 80,
    right: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  modalContent: {
    width: '70%',
    backgroundColor: '#F8C8CE',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 20,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D11B31',
    marginBottom: 20,
    textAlign: 'center',
  },
  pickerContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
  },
  picker: {
    height: 40,
    color: '#000',
    fontSize: 16,
    backgroundColor: 'white',
  },
  findButton: {
    backgroundColor: '#D11B31',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  findButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  donorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  donorName: {
    fontSize: 18,
    color: '#000',
  },
});