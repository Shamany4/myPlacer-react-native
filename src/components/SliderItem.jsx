import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import Icon from "../assets/icons/position.svg";
import TypeIcon from "../assets/buildings/shopping.svg";

export default function SliderItem({title, type, distance, colorCard}) {
  return (
    <View style={styles.sliderItem} backgroundColor={colorCard}>
      <View style={styles.sliderInfo}>
        <View style={styles.sliderLocation}>
          <Icon width={22} height={22} style={styles.sliderLocation__icon}/>
          <Text style={styles.sliderLocation__text}>{distance} км</Text>
        </View>
        <View>
          <Text style={styles.sliderTitle}>{title}</Text>
          <Text style={styles.sliderSubtitle}>{type}</Text>
        </View>
      </View>
      <View style={styles.sliderImage}>
        <TypeIcon width={80} height={80} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 160,
    width: '100%',
    borderRadius: 10,
    padding: 20,
  },
  sliderInfo: {
    flex: 2.5,
    height: '100%',
    justifyContent: 'space-between',
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
    lineHeight: 28
  },
  sliderSubtitle: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 14,
    letterSpacing: 0.24,
  },
  sliderImage: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
})