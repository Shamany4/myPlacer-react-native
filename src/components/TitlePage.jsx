import React from "react";
import {StyleSheet, Text, View} from "react-native";

export default function TitlePage({title}) {
  return(
    <View style={styles.titlePageBlock}>
      <Text style={styles.titlePage}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titlePageBlock: {
  },
  titlePage: {
    fontFamily: 'Gilroy-Black',
    fontSize: 30,
    letterSpacing: 0.6,
  }
});