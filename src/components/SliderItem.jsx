import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import Icon from "../icons/position.svg";
import TypeIcon from "../buildings/shopping.svg";

export default function SliderItem() {
  return (
    <View style={styles.sliderItem}>
      <View style={styles.sliderInfo}>
        <View style={styles.sliderLocation}>
          <Icon width={25} height={25} style={styles.sliderLocation__icon}/>
          <Text style={styles.sliderLocation__text}>2.68 км</Text>
        </View>
        <View>
          <Text style={styles.sliderTitle}>Континент</Text>
          <Text style={styles.sliderSubtitle}>Торговый центр</Text>
        </View>
      </View>
      <TypeIcon width={60} height={60}/>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 150,
    width: '100%',
    backgroundColor: '#f8d57e',
    borderRadius: 10,
    padding: 20
  },
  sliderInfo: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-around'
  },
  sliderLocation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderLocation__icon: {
    marginRight: 8
  },
  sliderLocation__text: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 14,
    letterSpacing: 0.2,
  },
  sliderTitle: {
    fontFamily: 'Gilroy-ExtraBold',
    fontSize: 25,
    letterSpacing: 0.1,
  },
  sliderSubtitle: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 14,
    letterSpacing: 0.24,
  }
})