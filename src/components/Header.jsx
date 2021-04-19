import React from 'react';
import { StyleSheet, View } from 'react-native';
import DateGroup from './DateGroup';

export default function Header() {
  return (
    <View style={styles.header}>
      <DateGroup day="Пятница" number="15 февраля" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: '15%'
  }
});