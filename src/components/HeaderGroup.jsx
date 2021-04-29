import React from 'react';
import { StyleSheet, View } from 'react-native';
import DateGroup from './DateGroup';
import AvatarGroup from "./AvatarGroup";

export default function HeaderGroup() {
  return (
    <View style={styles.header}>
      <DateGroup day="Пятница" number="15 февраля" />
      <AvatarGroup />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35
  }
});