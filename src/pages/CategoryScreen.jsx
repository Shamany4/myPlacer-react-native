import React from 'react';
import {StyleSheet, View, ScrollView, Text, Image} from 'react-native';

import HeaderGroup from '../components/HeaderGroup';
import TitlePage from "../components/TitlePage";
import Menu from "../components/Menu";
import CategoryGroup from "../components/CategoryGroup";

export default function CategoryScreen({navigation}) {
  return (
    <View style={styles.application}>
      <Menu navigation={navigation}/>
      <View style={styles.container}>
        <ScrollView style={styles.category}>

          <HeaderGroup/>
          <TitlePage title="Категории"/>

          <CategoryGroup title="Кинотеатры" color="#9FD2FF" icon={require('../assets/buildings/shopping.png')}/>
          <CategoryGroup title="Музеи" color="#FFE99F" icon={require('../assets/buildings/museum.png')}/>
          {/*<CategoryGroup title="Рестораны" color="#E3FF9F" />*/}
          {/*<CategoryGroup title="Боулинги" color="#9FBCFF" />*/}
          {/*<CategoryGroup title="Бильярдные" color="#9FFFC2" />*/}
          {/*<CategoryGroup title="Бани, сауны" color="#9FFFEB" />*/}
          {/*<CategoryGroup title="Компьютерные клубы" color="#FF9F9F" />*/}
          {/*<CategoryGroup title="Парки" color="#9FD2FF" />*/}
          {/*<CategoryGroup title="Кафе" color="#FFE99F" />*/}
          {/*<CategoryGroup title="Дельфинарии" color="#E3FF9F" />*/}
          {/*<CategoryGroup title="Аквапарки" color="#9FBCFF" />*/}
          {/*<CategoryGroup title="Торговые центры" color="#9FFFC2" />*/}
          {/*<CategoryGroup title="Кальянные" color="#9FFFEB" />*/}


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
  category: {

  },
})