import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    // backgroundColor: 'red',
  },
  head: {
    // backgroundColor: 'red',
  },
  headText: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  buttonContainer: {
    alignSelf: 'center',
    // width: Dimensions.get('screen').width / 2.8,
    backgroundColor: Colors.white,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 15,
    marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  newErrorInput: {
    // marginHorizontal: 20,
    borderRadius: 8,
    marginVertical: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  dropdownStyle: {},
  dropdownContainerStyle: {
    marginHorizontal: 20,
    width: Dimensions.get('screen').width / 1.1,
    alignSelf: 'center',
  },
  dropdown: {
    marginVertical: 10,
    marginHorizontal: 20,
    width: Dimensions.get('screen').width / 1.1,
    alignSelf: 'center',
  },
  input: {
    marginHorizontal: 20,
    borderRadius: 8,
    // marginBottom: 15,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  inputsView: {
    marginHorizontal: 20,
    // width: Dimensions.get('screen').width / 1,
    // backgroundColor: 'red',
  },
});

export default styles;
