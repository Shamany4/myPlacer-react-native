import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';

import Home from './src/pages/Home';
import Menu from "./src/components/Menu";

let customFonts = {
  'Gilroy-Regular': require('./assets/fonts/Gilroy-Regular.ttf'),
  'Gilroy-Medium': require('./assets/fonts/Gilroy-Medium.ttf'),
  'Gilroy-SemiBold': require('./assets/fonts/Gilroy-Semibold.ttf'),
  'Gilroy-Bold': require('./assets/fonts/Gilroy-Bold.ttf'),
  'Gilroy-ExtraBold': require('./assets/fonts/Gilroy-Extrabold.ttf'),
  'Gilroy-Black': require('./assets/fonts/Gilroy-Black.ttf'),
};

export default function App() {
  const [font, setFont] = useState(false);

  async function LoadAsyncFonts() {
    await Font.loadAsync(customFonts);
    setFont(true);
  }

  useEffect(() => {
    LoadAsyncFonts();
  }, [LoadAsyncFonts]);

  if (font) {
    return(
      <View style={styles.application}>
        <Menu />
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Home />
        </View>
      </View>
    );
  } else {
    return <AppLoading />
  }
}

const styles = StyleSheet.create({
  application: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    paddingLeft: '6%',
    paddingRight: '6%',
    paddingTop: 50,
    paddingBottom: 60
  },
});


// <View style={styles.container}>
//   <StatusBar style="auto" />
//   <Home />
// </View>