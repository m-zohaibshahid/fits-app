import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 0,
    paddingBottom: Platform.OS === 'ios' ? 0 : 0,
  },
  mainBgImage: {
    width: '100%',
    height: '100%',
  },
});
export default styles;
