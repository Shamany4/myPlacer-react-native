import React from 'react';
import {StyleSheet, View, ScrollView, Text, Image} from 'react-native';
import category from "../category.json";

import HeaderGroup from '../components/HeaderGroup';
import TitlePage from "../components/TitlePage";
import Menu from "../components/Menu";
import CategoryGroup from "../components/CategoryGroup";

export default function CategoryScreen({navigation}) {
  const iconBuildingPath = '../assets/buildings/'
  return (
    <View style={styles.application}>
      <Menu navigation={navigation}/>
      <View style={styles.container}>
        <ScrollView style={styles.category}>

          <HeaderGroup/>
          <TitlePage title="Категории"/>

          <View style={styles.categoryWrapper}>
            {
              category.category.map((el, index) => {
                return <CategoryGroup title={el.name}
                                      color={el.color}
                                      icon={require('../assets/buildings/cinema.png')}
                                      key={index}
                />
              })
            }
            {/*<CategoryGroup title="Кинотеатры" color="#9FD2FF" icon={require(iconBuildingPath + 'cinema.png')} />*/}
          </View>


        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  application: {
    flex: 1,
    backgroundColor: '#fefefe'
  },
  container: {
    flex: 1,
    paddingLeft: '6%',
    paddingRight: '6%',
    paddingTop: 30,
    paddingBottom: 60,
  },
  category: {

  },
  categoryWrapper: {
    marginTop: 25
  }
})