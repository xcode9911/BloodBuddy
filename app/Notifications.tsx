// CustomNotification.tsx
import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface NotificationProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ visible, message, onClose }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <Animatable.View
          animation="fadeIn"
          duration={500}
          style={styles.notification}
        >
          <View style={styles.tickContainer}>
            <Text style={styles.tickMark}>✔</Text>
          </View>
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.closeButton} onPress={onClose}>
            Close
          </Text>
        </Animatable.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B2EBC2', // Mint green background
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%',
  },
  tickContainer: {
    marginRight: 10,
  },
  tickMark: {
    fontSize: 30,
    color: '#4CAF50', // Green color for the tick mark
  },
  message: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  closeButton: {
    color: '#007BFF',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Notification;