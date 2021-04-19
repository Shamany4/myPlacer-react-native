import React from "react";
import {StyleSheet, Text} from "react-native";

export default function SubtitlePage({title}) {
  return(
    <Text style={styles.subtitlePage}>{title}</Text>
  );
}

const styles = StyleSheet.create({
  subtitlePage: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 16,
    marginBottom: 15
  }
})
