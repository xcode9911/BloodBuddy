import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the Message type
interface Message {
  donorId: number; // Ensure this is a number
  gainerId: number; // Ensure this is a number
  message: string;
  createdAt: string; // assuming this is a date string
}

export default function ChatScreen() {
  const { name, receiverId: receiverIdStr } = useLocalSearchParams();
  const receiverId = Number(receiverIdStr); // Convert to a number
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]); // Specify the type here

  useEffect(() => {
    fetchMessages(); // Fetch messages on component mount
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://192.168.98.124:8000/api/chats/${receiverId}`);
      const data = await response.json();
      if (response.ok) {
        setMessages(data.messages); // Set messages from API response
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    try {
      const donorId = await AsyncStorage.getItem('userId'); // Get sender ID
      const donorIdNum = Number(donorId); // Convert to number if necessary
      const response = await fetch('http://192.168.98.124:8000/api/chats/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ donorId: donorIdNum, gainerId: receiverId, message }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message); // Message sent successfully
        setMessage(''); // Clear input field
        fetchMessages(); // Refresh messages after sending
      } else {
        console.error(data.error); // Handle errors
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Chat header */}
      <View style={styles.header}>
        <View style={styles.userDetails}>
          <Image source={require('../assets/images/BloodbuddyLogo.png')} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.status}>Online</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Chat messages */}
      <ScrollView style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View 
            key={index} 
            style={msg.donorId === receiverId ? styles.otherMessageContainer : styles.userMessageContainer}
          >
            <View style={msg.donorId === receiverId ? styles.otherMessage : styles.userMessage}>
              <Text style={styles.messageText}>{msg.message}</Text>
              <Text style={styles.timeStamp}>{new Date(msg.createdAt).toLocaleTimeString()}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Message input area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={text => setMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Image source={require('../assets/images/BloodbuddyLogo.png')} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D11B31',
  },
  status: {
    fontSize: 14,
    color: '#41D42A',
  },
  menuButton: {
    padding: 5,
  },
  menuIcon: {
    fontSize: 24,
    color: '#333',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  userMessage: {
    backgroundColor: '#F8C8CE',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '70%',
  },
  otherMessageContainer: {
    alignItems: 'flex-start',
  },
  otherMessage: {
    backgroundColor: '#E9E9EB',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '70%',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  timeStamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFCBD6',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    borderColor: '#E9E9EB',
    borderWidth: 1,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#F8C8CE', 
    borderRadius: 25, 
    width: 50, 
    height: 50, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  sendIcon: {
    width: 40, 
    height: 40,
  },
});