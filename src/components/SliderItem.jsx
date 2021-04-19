import React from "react";
import { StyleSheet, View } from 'react-native';

export default function SliderItem() {
  return (
    <View style={styles.sliderItem}>
      <View style={styles.sliderInfo}>
        <View style={styles.sliderLocation}>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderItem: {
    height: 150,
    width: '100%',
    backgroundColor: '#f8d57e',
    borderRadius: 10,
  },
  sliderInfo: {

  },
  sliderLocation: {

  }
})