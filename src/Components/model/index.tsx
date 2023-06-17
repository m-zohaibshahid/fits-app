import React from 'react';
import { View, Text, Modal, Platform, StyleSheet } from 'react-native';
import Button from '../Button';
import Colors from '../../constants/Colors';
import { TextStyle, ViewStyle } from 'react-native';
import Typography from '../typography/text';

interface ModelProps {
  visible: boolean;
  onClick: () => void;
  onRequestClose: () => void;
}

const Model: React.FC<ModelProps> = ({ visible, onClick, onRequestClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Typography weight="700" size="heading2" align="center" style={styles.title}>
            Modal Title
          </Typography>

          <Typography weight="600" size="heading4" align="center" style={styles.message}>
            Already have an account? Please sign in!
          </Typography>

          <View style={styles.buttonContainer}>
            <Button label="Go" onPress={onClick} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.lightGray,
    opacity: 0.9,
  },
  modalView: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 24,
    marginHorizontal: '10%',
    marginBottom: '30%',
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
    width: '100%',
  },
});

export default Model;
