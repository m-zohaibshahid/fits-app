import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Button from '../Button';
import { RFValue } from 'react-native-responsive-fontsize';
import Colors from '../../constants/Colors';
import TextInput from '../Input';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Typography from '../typography/text';

interface ReviewsModalProps {
  onSubmitReviews: (rating: number, comment: string) => void;
  isVisible: boolean;
  isLoading?: boolean;
  onClose: () => void;
}

const ReviewsModal: React.FC<ReviewsModalProps> = ({ isVisible, isLoading, onSubmitReviews, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState<string>('');

  const handleRating = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmitReviews = () => {
    onSubmitReviews(rating, comment);
  };

  return (
    <Modal animationType='fade' transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Typography weight='700' size={'heading1'}>Submit Reviews</Typography>
            <AntDesign name="close" size={25} color="#000" />
          </TouchableOpacity>
          <View style={{padding: 10}}>
          <View style={styles.raterowview}>
            {[1, 2, 3, 4, 5].map((num) => (
              <Pressable
              key={num}
              onPress={() => handleRating(num)}
              >
                <AntDesign name="star" size={25} color={rating >= num ? "#e50b0b" : "#242424"} />
              </Pressable>
            ))}
          </View>
          <TextInput
            maxLength={200}
            isTextArea
            value={comment}
            onChangeText={setComment}
            label={"Comment..."}
            />
          <Button loader={isLoading} label={"Submit"} onPress={handleSubmitReviews} />
            </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: Colors.transparentBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 14,
    position: 'absolute',
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
    bottom:10,
  },
  closeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  raterowview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    columnGap: 10
  },
});

export default ReviewsModal;
