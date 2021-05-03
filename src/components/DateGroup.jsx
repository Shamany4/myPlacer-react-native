import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function DateGroup({ dayWeek, dayMonth }) {
  return (
    <View style={styles.date}>
      <Text style={styles.date__day}>{dayWeek},</Text>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.date__number}>{dayMonth}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  date: {
    flex: 1,
  },
  date__day: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 14,
    letterSpacing: 0.2,
  },
  date__number: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 16,
    letterSpacing: 0.2,
  },
});