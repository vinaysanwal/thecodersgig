import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';

// import AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  // To get the value from the TextInput
  const [textInputValue, setTextInputValue] = useState('');
  // To set the value on Text
  const [getValue, setGetValue] = useState('');

  const saveValueFunction = () => {
    if (textInputValue) {
      AsyncStorage.setItem('any_key_here', textInputValue);
      // Setting a data to a AsyncStorage with respect to a key
      setTextInputValue('');
      // Resetting the TextInput
      alert('Data Saved');
      // Alert to confirm
    } else {
      alert('Please fill data');
    }
  };

  const getValueFunction = () => {
    // Function to get the value from AsyncStorage
    AsyncStorage.getItem('any_key_here').then(
      (value) =>
        // AsyncStorage returns a promise
        // Adding a callback to get the value
        setGetValue(value),
      // Setting the value in Text
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          AsyncStorage in React Native to Store Data in Session
        </Text>
        <TextInput
          placeholder="Enter Some Text here"
          value={textInputValue}
          onChangeText={(data) => setTextInputValue(data)}
          underlineColorAndroid="transparent"
          style={styles.textInputStyle}
        />
        <TouchableOpacity
          onPress={saveValueFunction}
          style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>SAVE VALUE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={getValueFunction} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>GET VALUE</Text>
        </TouchableOpacity>
        <Text style={styles.textStyle}>{getValue}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    textAlign: 'center',
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    marginTop: 32,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textInputStyle: {
    textAlign: 'center',
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: 'green',
  },
});

export default App;
