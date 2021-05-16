import React from 'react';
import {StyleSheet, Text, View} from "react-native";

export default function AvatarGroup({userName}) {

  return(
    <View style={styles.avatar}>
      <Text style={styles.avatar__name}>{userName}</Text>
      <View style={styles.avatar__image}>
        <Text style={styles.avatar__symbol}>{userName[0].toUpperCase()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  avatar__name: {
    fontSize: 16,
    fontFamily: 'Gilroy-SemiBold'
  },
  avatar__image: {
    height: 50,
    width: 50,
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    marginLeft: 13,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  avatar__symbol: {
    fontSize: 30,
    fontFamily: 'Gilroy-Black',
    color: '#000'
  }
})