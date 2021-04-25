import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, TextInput, Image} from 'react-native';

import HeaderGroup from '../components/HeaderGroup';
import TitlePage from "../components/TitlePage";
import Menu from "../components/Menu";


export default function SearchScreen({navigation}) {
  const [search, setSearch] = useState(false);
  return (
    <View style={styles.application}>
      <Menu navigation={navigation}/>
      <View style={styles.container}>
        <ScrollView style={styles.search}>

          <HeaderGroup/>
          <TitlePage title="Поиск"/>

          {
            search
            ?
            <View style={styles.searchGroup} marginTop={0}>
              <TextInput style={styles.searchGroup__input} placeholder="Начните вводить здесь"/>
              <Image style={styles.searchGroup__icon} source={require('../assets/icons/search.png')}/>
            </View>
            :
            <View style={styles.searchGroup} marginTop={160}>
              <TextInput style={styles.searchGroup__input} placeholder="Начните вводить здесь"/>
              <View style={styles.searchGroupImage}>
                <Image style={styles.searchGroupImage__icon} source={require('../assets/icons/search.png')}/>
              </View>
            </View>
          }

          <View style={styles.popularWrapper}>
          </View>

        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  application: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#fefefe',
  },
  container: {
    flex: 1,
    paddingLeft: '6%',
    paddingRight: '6%',
    paddingTop: 30,
    paddingBottom: 60,
  },
  popularWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  search: {

  },
  searchGroup: {
    width: '100%',
    height: 60,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchGroup__input: {
    fontFamily: 'Gilroy-Medium',
    flex: 4.5,
    fontSize: 15,
    borderRadius: 10,
    letterSpacing: 0.2,
    paddingLeft: 20
  },
  searchGroupImage: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchGroupImage__icon: {
    height: 24,
    width: 24,
  }
})