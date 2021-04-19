import React from 'react';
import { StyleSheet, View } from 'react-native';

import Header from '../components/Header';
import TitlePage from "../components/TitlePage";
import SliderItem from "../components/SliderItem";
import SubtitlePage from "../components/SubtitlePage";

export default function Home() {
  return (
    <View style={styles.home}>
      <Header/>
      <TitlePage title="Главная"/>
      <SubtitlePage title="Рядом с вами"/>
      <SliderItem />
    </View>
  );
}

const styles = StyleSheet.create({
  home: {

  }
})