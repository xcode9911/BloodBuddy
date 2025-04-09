import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { jwtDecode } from 'jwt-decode';
import { Picker } from '@react-native-picker/picker';

// Define the type for profile data
interface ProfileData {
  name: string;
  email: string;
  contactNo: string;
  bloodType: string;
  location: string;
}

const HandlePolicy = () => {
  router.push('/PrivacyPolicy');
}

const HandleFAQ = () => {
  router.push('/FAQ');
}

const HandleRegistration = () => {
  router.push('/Registration');
}

export default function MyProfile() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const locations = [
    { label: 'Kathmandu', value: 'Kathmandu' },
    { label: 'Pokhara', value: 'Pokhara' },
    { label: 'Biratnagar', value: 'Biratnagar' },
    { label: 'Dharan', value: 'Dharan' },
    { label: 'Chitwan', value: 'Chitwan' },
    { label: 'Nepalgunj', value: 'Nepalgunj' },
  ];

  const bloodGroups = [
    { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' },
    { label: 'B-', value: 'B-' },
    { label: 'AB+', value: 'AB+' },
    { label: 'AB-', value: 'AB-' },
    { label: 'O+', value: 'O+' },
    { label: 'O-', value: 'O-' },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const decoded: any = jwtDecode(token);
          setUserId(decoded.userId);
          setUserType(decoded.userType);
        } else {
          Alert.alert('Error', 'No token found. Please log in.');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        Alert.alert('Error', 'Failed to retrieve user data.');
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userId !== null && userType !== null) {
      fetchProfileData();
    } else {
      if (userId === null || userType === null) {
        Alert.alert('Error', 'User ID or User Type is missing.');
      }
    }
  }, [userId, userType]);

  const fetchProfileData = async () => {
    try {
      if (userId && userType) {
        const response = await fetch(`http://192.168.98.124:8000/api/users/myProfile?id=${userId}&userType=${userType}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
        if (response.ok) {
          setProfileData(data.user);
          setName(data.user.name);
          setEmail(data.user.email);
          setContactNo(data.user.contactNo);
          setSelectedBloodGroup(data.user.bloodType);
          setSelectedLocation(data.user.location);
        } else {
          console.error('Failed to fetch profile data:', data); 
          Alert.alert('Error', 'Failed to fetch profile data');
        }
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      Alert.alert('Error', 'Failed to fetch profile data');
    }
  };

  const handleDeleteAccount = () => {
    setIsModalVisible(true);
  };

  const confirmDelete = async () => {
    setIsModalVisible(false);
  
    try {
      if (userId && userType) {
        const response = await fetch('http://192.168.98.124:8000/api/users/deleteUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: userId,
            userType: userType,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          Alert.alert('Account deleted successfully');
          await AsyncStorage.removeItem('userToken');
          HandleRegistration();
        } else {
          Alert.alert('Error', data.message || 'Failed to delete account');
        }
      } else {
        Alert.alert('Error', 'User ID or User Type is missing.');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      Alert.alert('Error', 'Failed to delete account');
    }
  };

  const cancelDelete = () => {
    setIsModalVisible(false);
  };

  const handleEditProfile = async () => {
    try {
      const response = await fetch('http://192.168.98.124:8000/api/users/editProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId,
          userType,
          name,
          email,
          contactNo,
          bloodType: selectedBloodGroup,
          location: selectedLocation,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Profile updated successfully');
        fetchProfileData();
        setIsEditModalVisible(false);
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to update profile');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={[styles.circle, styles.bigCircle]} />
      <View style={[styles.circle, styles.mediumCircle]} />
      <View style={[styles.circle, styles.smallCircle]} />
      <View style={[styles.circle, styles.extraSmallCircle]} />

      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/BloodbuddyLogo.png')} style={styles.logo} />
        <Text style={styles.title}>{profileData ? profileData.name : 'Loading...'}</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => setIsEditModalVisible(true)}>
          <Icon name="edit" size={24} color="#D11B31" style={styles.icon} />
          <Text style={styles.menuText}>Edit Account</Text>
          <Icon name="angle-right" size={24} color="#D11B31" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleDeleteAccount}>
          <Icon name="trash" size={24} color="#D11B31" style={styles.icon} />
          <Text style={styles.menuText}>Delete Account</Text>
          <Icon name="angle-right" size={24} color="#D11B31" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={HandlePolicy}>
          <Icon name="shield" size={24} color="#D11B31" style={styles.icon} />
          <Text style={styles.menuText}>Privacy Policy</Text>
          <Icon name="angle-right" size={24} color="#D11B31" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={HandleFAQ}>
          <Icon name="question-circle" size={24} color="#D11B31" style={styles.icon} />
          <Text style={styles.menuText}>Blood Buddy FAQ</Text>
          <Icon name="angle-right" size={24} color="#D11B31" style={styles.arrowIcon} />
        </TouchableOpacity>

        <Modal transparent={true} visible={isModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Do you really want to delete your account?</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.confirmButton, styles.modalButton]} onPress={confirmDelete}>
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.cancelButton, styles.modalButton]} onPress={cancelDelete}>
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal transparent={true} visible={isEditModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Edit Your Profile</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Contact No"
                value={contactNo}
                onChangeText={setContactNo}
                keyboardType="numeric"
              />
              <Picker
                selectedValue={selectedLocation}
                onValueChange={(itemValue) => setSelectedLocation(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select your location" value="" />
                {locations.map((loc) => (
                  <Picker.Item key={loc.value} label={loc.label} value={loc.value} />
                ))}
              </Picker>
              <Picker
                selectedValue={selectedBloodGroup}
                onValueChange={(itemValue) => setSelectedBloodGroup(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select your blood group" value="" />
                {bloodGroups.map((blood) => (
                  <Picker.Item key={blood.value} label={blood.label} value={blood.value} />
                ))}
              </Picker>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.confirmButton, styles.modalButton]} onPress={handleEditProfile}>
                  <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.cancelButton, styles.modalButton]} onPress={() => setIsEditModalVisible(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D11B31',
  },
  menuContainer: {
    width: '90%',
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DADADA',
  },
  icon: {
    marginRight: 10,
  },
  arrowIcon: {
    marginLeft: 'auto', 
  },
  logo: {
    width: 120,
    height: 120,
  },
  menuText: {
    fontSize: 18,
    color: '#333',
  },
  circle: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: '#FF495F',
  },
  bigCircle: {
    width: 300,
    height: 300,
    top: 50,
    left: -220,
    borderRadius: 800,
  },
  mediumCircle: {
    width: 150,
    height: 150,
    top: 100,
    right: -100,
  },
  smallCircle: {
    width: 80,
    height: 80,
    bottom: 50,
    left: -50,
  },
  extraSmallCircle: {
    width: 40,
    height: 40,
    bottom: 20,
    right: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#F8C8CE',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  confirmButton: {
    backgroundColor: '#FF495F',
  },
  cancelButton: {
    backgroundColor: '#D11B31',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#D11B31',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '100%',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
  },
});