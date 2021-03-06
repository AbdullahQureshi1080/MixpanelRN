/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Mixpanel} from 'mixpanel-react-native';

import styles from './Styles';
import Config from 'react-native-config';
import CustomButton from './components/CustomButton';
import CustomTextInput from './components/CustomTextInput';
import useMixPanel from './hooks/useMixPanel';

const App = () => {
  const [serverURL, setServerURL] = useState('staging');
  const mixpanel = useMixPanel(serverURL);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const [message, setMessage] = useState('');
  const [user, setUser] = useState({
    firstname: 'Abdullah',
    lastname: 'Qureshi',
    email: 'testalphax2@gmail.com',
  });

  return (
    <SafeAreaView style={[backgroundStyle]}>
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.headText}>Mix Panel - {serverURL}</Text>
          <CustomButton
            name={`Switch to ${
              serverURL == 'staging' ? 'production' : 'staging'
            }`}
            onPress={() =>
              setServerURL(serverURL == 'staging' ? 'production' : 'staging')
            }
          />
        </View>
        <View style={styles.section}>
          <CustomTextInput onChangeText={setMessage} text={message} />
          <CustomButton
            name={'Track Event'}
            onPress={() =>
              mixpanel.trackEvent(
                message,
                {testMode: true, testing: false},
                true,
              )
            }
          />
          <CustomButton
            name={'Get Super Properties'}
            onPress={() => {
              mixpanel.getSuperProperties();
            }}
          />
          <CustomButton
            name={'Set User Profile Property'}
            onPress={() => {
              mixpanel.setUserProfileProperty('log', {
                leaveTime: '6:30 PM',
                workState: '80%',
              });
            }}
          />
          <CustomButton
            name={'GetPeople'}
            onPress={() => {
              mixpanel.getPeople();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
