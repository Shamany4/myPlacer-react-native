import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../components/Header';

export default function Home() {
  return (
    <View style={styles.home}>
      <Header/>
    </View>
  );
}

const styles = StyleSheet.create({
  home: {

  }
})