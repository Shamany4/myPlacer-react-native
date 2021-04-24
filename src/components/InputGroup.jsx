import {Image, StyleSheet, TextInput, View} from "react-native";
import React from "react";

export default function ({placeholder, secure, icon}) {
  return(
    <View style={styles.inputGroup}>
      <View style={styles.inputGroupImage}>
        <Image style={styles.inputGroupImage__icon} source={icon}/>
      </View>
      <TextInput style={styles.inputGroup__input}
                 placeholder={placeholder}
                 secureTextEntry={secure}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    width: '100%',
    height: 60,
    backgroundColor: '#eee',
    elevation: 5,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  inputGroup__input: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 15,
    paddingRight: 10,
    letterSpacing: 0.3,
    color: '#000',
    flex: 4.5
  },
  inputGroupImage: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputGroupImage__icon: {
    height: 24,
    width: 24
  }
});