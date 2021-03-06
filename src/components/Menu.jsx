import React from "react";
import {Image, Text, StyleSheet, TouchableHighlight, View} from "react-native";

export default function Menu({navigation}) {
  return(
    <View style={styles.navbar}>
      <TouchableHighlight underlayColor="#fff" style={styles.navbarIconGroup} onPress={() => navigation.push('Home')}>
        <Image style={styles.navbarIconGroup__icon} source={require('../assets/icons/home.png')}/>
      </TouchableHighlight>
      <TouchableHighlight underlayColor="#fff" style={styles.navbarIconGroup} onPress={() => navigation.push('Search')}>
        <Image style={styles.navbarIconGroup__icon} source={require('../assets/icons/search.png')}/>
      </TouchableHighlight>
      <TouchableHighlight style={styles.navbar__centralBtn} onPress={() => navigation.push('Category')}>
        <Image style={styles.navbarIconGroup__icon} source={require('../assets/iconsWhite/map.png')}/>
      </TouchableHighlight>
      <TouchableHighlight underlayColor="#fff" style={styles.navbarIconGroup} onPress={() => navigation.push('Favorites')}>
        <Image style={styles.navbarIconGroup__icon} source={require('../assets/icons/like.png')}/>
      </TouchableHighlight>
      <TouchableHighlight underlayColor="#fff" style={styles.navbarIconGroup} onPress={() => navigation.push('Cabinet')}>
        <Image style={styles.navbarIconGroup__icon} source={require('../assets/icons/user.png')}/>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    zIndex: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 30,
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  navbar__centralBtn: {
    padding: 12,
    backgroundColor: '#000',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navbarIconGroup: {
    padding: 10,
  },
  navbarIconGroup__icon: {
    height: 20,
    width: 20
  }
});