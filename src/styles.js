import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  h1: {
    fontSize: 32,
    textAlign: 'center',
  },

  h2: {
    fontSize: 24,
    textAlign: 'center',
  },

  p: {
    fontSize: 16,
  },

  outerBox: {
    paddingLeft: 10,
    paddingRight: 10,
  },

  componentBox: {
    paddingBottom: 10,
  },

  switchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: 'lightgrey',
    padding: 5,
    marginBottom: 10,
  },

  buttonStandard: {
    margin: 1,
    padding: 6,
    borderRadius: 8,
    backgroundColor: 'lightblue',
    alignSelf: 'center',
  },

  buttonDisabled: {
    margin: 1,
    padding: 6,
    borderRadius: 8,
    backgroundColor: 'lightgrey',
    alignSelf: 'center',
  },

  buttonText: {
    fontSize: 16,
  },

  buttonOn: {
    padding: 5,
    backgroundColor: 'lightgreen',
  },

  buttonOff: {
    padding: 5,
    backgroundColor: 'transparent',
  },

  inputContainer: {
    flexDirection: 'row',
  },

  inputBox: {
    borderWidth: 1,
    flexGrow: 1,
  },
});
