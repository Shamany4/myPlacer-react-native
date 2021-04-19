import React from 'react';
import { StyleSheet, View } from 'react-native';

import Header from '../components/Header';
import TitlePage from "../components/TitlePage";
import SliderItem from "../components/SliderItem";

export default function Home() {
  return (
    <View style={styles.home}>
      <Header/>
      <TitlePage title="Главная"/>
      <SliderItem />
    </View>
  );
}

const styles = StyleSheet.create({
  home: {

  }
})