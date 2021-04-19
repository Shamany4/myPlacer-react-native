import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";

export default function AvatarGroup() {
  return(
    <View style={styles.avatar}>
      <Text style={styles.avatar__name}>Майкл</Text>
      <Image
        style={styles.avatar__image}
        source={{
          uri: 'https://sun9-54.userapi.com/impf/c849224/v849224749/1d2f6f/-p1ekz9Xlv8.jpg?size=720x1080&quality=96&sign=a60c91d2c7a99e0aa65830162d8ae1a3&type=album',
        }}
      />
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
    backgroundColor: 'gray',
    borderRadius: 10,
    marginLeft: 13
  }
})