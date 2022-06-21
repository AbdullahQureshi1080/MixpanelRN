import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import styles from '../Styles';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const CustomButton = ({name, style, onPress}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        style,
        {backgroundColor: isDarkMode ? Colors.white : Colors.black},
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.buttonText,
          {color: isDarkMode ? Colors.black : Colors.white},
        ]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};
export default CustomButton;
