import {Image, StyleSheet, TextInput, TouchableHighlight, View} from "react-native";
import React from "react";

export default function ({placeholder, value, secure, icon, secondIcon, changeText, validData, invalidData, iconClick}) {
  return(
    <View style={styles.inputGroup}
          borderColor={validData ? '#00ad8b' : invalidData ? '#F56E6E' : null}
          borderWidth={validData ? 2 : invalidData ? 2 : null} >
      <View style={styles.inputGroupImage}>
        <Image style={styles.inputGroupImage__icon} source={icon}/>
      </View>
      <TextInput style={styles.inputGroup__input}
                 value={value}
                 placeholder={placeholder}
                 secureTextEntry={secure}
                 onChangeText={changeText}
      />
      {
        secondIcon
          ?
          <TouchableHighlight style={styles.inputGroupSecond}
                              underlayColor="#eee"
                              onPress={iconClick}
          >
            <Image style={styles.inputGroupSecond__icon} source={secondIcon}/>
          </TouchableHighlight>
          :
          null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    width: '100%',
    height: 60,
    borderColor: '#eee',
    backgroundColor: '#eee',
    elevation: 5,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  inputGroup__input: {
    height: '100%',
    fontFamily: 'Gilroy-Medium',
    fontSize: 15,
    paddingRight: 20,
    letterSpacing: 0.3,
    color: '#000',
    flex: 4,
  },
  inputGroupImage: {
    height: '100%',
    maxWidth: 60,
    minWidth: 60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputGroupImage__icon: {
    height: 24,
    width: 24
  },
  inputGroupSecond: {
    height: '100%',
    flex: 1,
    maxWidth: 60,
    minWidth: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputGroupSecond__icon: {
    height: 22,
    width: 22,
    opacity: 0.6
  }
});