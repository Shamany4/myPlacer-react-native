import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function DateGroup({ day, number }) {
  return (
    <View style={styles.date}>
      <Text style={styles.date__day}>{day},</Text>
      <Text style={styles.date__number}>{number}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  date: {

  },
  date__day: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 14,
    letterSpacing: 0.2
  },
  date__number: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2
  }
});