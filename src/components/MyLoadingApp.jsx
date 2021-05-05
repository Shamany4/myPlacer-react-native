import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";

export default function MyLoadingApp({title}) {
  return(
    <View style={styles.loading}>
      <View style={styles.loadingWrapper}>
        <Image style={{height: 150, width: 150}}
               source={require('../../assets/icon.png')}
        />
        <Text style={styles.loading__subtitle}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading__logo: {
    fontSize: 25,
    letterSpacing: 0.3,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loading__subtitle: {
    marginTop: 20,
    letterSpacing: 0.3,
    textAlign: 'center',
  }
});