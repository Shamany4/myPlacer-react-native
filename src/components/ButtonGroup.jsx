import {Alert, StyleSheet, Text, TouchableHighlight} from "react-native";
import React from "react";

export default function ButtonGroup({title, click}) {
  return(
    <TouchableHighlight style={styles.buttonGroup}
                        onPress={click}
    >
      <Text style={styles.buttonGroup__text}>{title}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    height: 60,
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  buttonGroup__text: {
    color: '#fff',
    fontFamily: 'Gilroy-Bold',
    fontSize: 16,
    letterSpacing: 0.32,
  }
});