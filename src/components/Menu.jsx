import React from "react";
import {Button, StyleSheet, View} from "react-native";

import HomeIcon from '../assets/icons/home.svg';
import SearchIcon from '../assets/icons/search.svg';
import MapIcon from '../assets/icons/map.svg';
import LikeIcon from '../assets/icons/like.svg';
import UserIcon from '../assets/icons/user.svg';

export default function Menu() {
  return(
    <View style={styles.navbar}>
      <HomeIcon height={20} width={20}/>
      <SearchIcon height={20} width={20}/>
      <View style={styles.navbar__centralBtn}>
        <MapIcon height={20} width={20}/>
      </View>
      <LikeIcon height={20} width={20}/>
      <UserIcon height={20} width={20}/>
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
    height: 44,
    width: 44,
    backgroundColor: '#000',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});