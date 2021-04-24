import {Image, StyleSheet, TextInput, View} from "react-native";
import React from "react";

import MailIcon from '../assets/icons/mail.svg';
import PassIcon from '../assets/icons/pass.svg';

export default function ({placeholder, secure, isMail}) {
  return(
    <View style={styles.inputGroup}>
      <View style={styles.inputGroupImage}>
        {
          isMail
          ?
            <MailIcon height={24} width={24} />
          :
            <PassIcon height={24} width={24} />
        }
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
    color: '#000',
    flex: 4.5
  },
  inputGroupImage: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});