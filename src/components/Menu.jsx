import React from "react";
import {Image, StyleSheet, TouchableHighlight, View} from "react-native";

export default function Menu({navigation}) {
  return(
    <View style={styles.navbar}>
      <TouchableHighlight style={styles.navbarIconGroup} onPress={() => navigation.navigate('Home')}>
        <Image style={styles.navbarIconGroup__icon} source={require('../assets/icons/home.png')}/>
      </TouchableHighlight>
      <TouchableHighlight style={styles.navbarIconGroup} onPress={() => navigation.navigate('Search')}>
        <Image style={styles.navbarIconGroup__icon} source={require('../assets/icons/search.png')}/>
      </TouchableHighlight>
      <TouchableHighlight style={styles.navbar__centralBtn} onPress={() => navigation.navigate('Category')}>
        <Image style={styles.navbarIconGroup__icon} source={require('../assets/iconsWhite/map.png')}/>
      </TouchableHighlight>
      <TouchableHighlight style={styles.navbarIconGroup} onPress={() => navigation.navigate('Favorites')}>
        <Image style={styles.navbarIconGroup__icon} source={require('../assets/icons/like.png')}/>
      </TouchableHighlight>
      <TouchableHighlight style={styles.navbarIconGroup} onPress={() => navigation.navigate('Cabinet')}>
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
    padding: 10
  },
  navbarIconGroup__icon: {
    height: 20,
    width: 20
  }
});