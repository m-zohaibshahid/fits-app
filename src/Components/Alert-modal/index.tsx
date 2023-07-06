import React from 'react';
import { View, Text, Modal, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../Button';
import Colors from '../../constants/Colors';
import { TextStyle, ViewStyle } from 'react-native';
import Typography from '../typography/text';

interface ModelProps {
  visible: boolean;
  onClick: () => void;
  onRequestClose: () => void;
  title: string;
  message: string;
}

const AlertModal: React.FC<ModelProps> = ({ visible, onClick, onRequestClose, title, message }) => {
  const handleBackdropPress = () => {
    onRequestClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPress={handleBackdropPress}
      >
        <View style={styles.modalView}>
          <Typography weight="700" size="heading2" align="center" style={styles.title}>
            {title}
          </Typography>

          <Typography weight="600" size="heading4" align="center" style={styles.message}>
            {message}
          </Typography>

          <View style={styles.buttonContainer}>
            <Button label="Go" onPress={onClick} />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.transparentBlack,
    opacity: 0.9,
  },
  modalView: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 24,
    marginHorizontal: "10%",
    marginBottom: "30%",
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 9,
  },
  title: {
    marginBottom: 16,
  },
  message: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
    width: "100%",
  },
});

export default AlertModal;
