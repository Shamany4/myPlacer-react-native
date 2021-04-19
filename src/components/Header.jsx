import React from 'react';
import { StyleSheet, View } from 'react-native';
import DateGroup from './DateGroup';
import AvatarGroup from "./AvatarGroup";

export default function Header() {
  return (
    <View style={styles.header}>
      <DateGroup day="Пятница" number="15 февраля" />
      <AvatarGroup />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: '22%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});