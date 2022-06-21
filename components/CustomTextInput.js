import React, {useEffect, useState, useRef} from 'react';
import {Text, useColorScheme, View, TextInput, Platform} from 'react-native';

import styles from '../Styles';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const CustomTextInput = ({onChangeText, text, title, width}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={[styles.newErrorContainer, {width: width}]}>
      <Text
        style={[
          styles.title,
          {
            color: isDarkMode ? Colors.white : Colors.black,
            fontSize: 15,
          },
        ]}>
        {title}
      </Text>
      <TextInput
        style={[
          styles.newErrorInput,
          {
            color: isDarkMode ? Colors.black : Colors.white,
            backgroundColor: isDarkMode ? Colors.white : Colors.black,
            width: width,
            height: Platform.OS === 'ios' ? 35 : null,
          },
        ]}
        onChangeText={onChangeText}
        value={text}
      />
    </View>
  );
};

export default CustomTextInput;
