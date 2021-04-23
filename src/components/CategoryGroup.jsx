import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";

export default function CategoryGroup({title, color}) {
  return(
    <View style={styles.categoryGroup} backgroundColor={color}>
      <Text style={styles.categoryGroup__text}>{title}</Text>
      <Image style={styles.categoryGroup__icon}
             source={require('../assets/buildings/shopping.png')}/>
    </View>
  );
}


const styles = StyleSheet.create({
  categoryGroup: {
    width: '100%',
    height: 70,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  categoryGroup__text: {
    fontFamily: 'Gilroy-ExtraBold',
    fontSize: 18,
    letterSpacing: 0.2
  },
  categoryGroup__icon: {
    height: 44,
    width: 44
  },
})