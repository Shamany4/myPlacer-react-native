import React from "react";
import {StyleSheet, Text, View} from "react-native";

export default function TitlePage({title}) {
  return(
    <View style={styles.titlePageBlock}>
      <Text style={styles.titlePage} h1>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titlePageBlock: {
    marginTop: '20%',
    marginBottom: '5%',
  },
  titlePage: {
    fontFamily: 'Gilroy-Black',
    fontSize: 30,
    letterSpacing: 0.6,
  }
});