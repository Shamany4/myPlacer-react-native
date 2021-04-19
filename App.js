import { StatusBar } from 'expo-status-bar';
import React, {useState, Component} from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';

import Home from './src/pages/Home';

let customFonts = {
  'Gilroy-Regular': require('./assets/fonts/Gilroy-Regular.ttf'),
  'Gilroy-Medium': require('./assets/fonts/Gilroy-Medium.ttf'),
  'Gilroy-ExtraBold': require('./assets/fonts/Gilroy-Extrabold.ttf'),
  'Gilroy-Bold': require('./assets/fonts/Gilroy-Bold.ttf'),
  'Gilroy-Black': require('./assets/fonts/Gilroy-Black.ttf'),
};

export default class App extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Home />
        </View>
      );
    } else {
      return <AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    paddingLeft: '6%',
    paddingRight: '6%',
  },
});


// <View style={styles.container}>
//   <StatusBar style="auto" />
//   <Home />
// </View>