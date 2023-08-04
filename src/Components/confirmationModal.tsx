import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import Typography from './typography/text';
import Button from './Button';
import Colors from '../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface ConfirmationModalProps {
  title: string;
  description: string;
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal = ({
  title,
  description,
  isVisible,
  onCancel,
  onConfirm,
}: ConfirmationModalProps) => (
  <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onCancel}>
    <View style={styles.modalOverlay} />
    <View style={styles.modalContainer}>
      <FontAwesome name="j" size={120} color={Colors.darkGreen} style={styles.icon} />
      <Typography variant="heading" bottom={'mb5'} size={'heading1'} weight="600" color="grayTransparent">
        {title}
      </Typography>
      <Typography style={{marginBottom:30}} size={'heading3'}  color="grayTransparent">
        {description}
      </Typography>
      <Button label="Confirm" onPress={onConfirm} />
      <TouchableOpacity onPress={onCancel}>
        <Typography style={{paddingVertical: 15}} bottom={'mb5'} size={'heading3'}>
          Cancel
        </Typography>
      </TouchableOpacity>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.transparentBlack,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 9,
    position: 'absolute',
    bottom: 20,
    width: '100%',
    padding: 15,
    alignItems: 'center', // Center the Confirm icon and content
  },
  icon: {
    marginBottom: 15,
  },
});

export default ConfirmationModal;
