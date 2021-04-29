import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {StyleSheet, View} from 'react-native';


import {
  HomeScreen,
  SearchScreen,
  CategoryScreen,
  FavoritesScreen,
  CabinetScreen,
  LoginScreen,
  RegisterScreen,
  ItemInfoScreen,
} from './src/pages'

let customFonts = {
  'Gilroy-Regular': require('./assets/fonts/Gilroy-Regular.ttf'),
  'Gilroy-Medium': require('./assets/fonts/Gilroy-Medium.ttf'),
  'Gilroy-SemiBold': require('./assets/fonts/Gilroy-Semibold.ttf'),
  'Gilroy-Bold': require('./assets/fonts/Gilroy-Bold.ttf'),
  'Gilroy-ExtraBold': require('./assets/fonts/Gilroy-Extrabold.ttf'),
  'Gilroy-Black': require('./assets/fonts/Gilroy-Black.ttf'),
};

const Stack = createStackNavigator();

export default function App() {
  const [font, setFont] = useState(false);
  async function LoadAsyncFonts() {
    await Font.loadAsync(customFonts);
    setFont(true);
  }
  useEffect(() => {
    LoadAsyncFonts();
  }, [LoadAsyncFonts]);

  const _AsyncGetAndroidSystemRC = () => {
    const system = systemRCPrevelegiers.getAll();
    _AsyncGetAndroidSystemRC(system)
  }

  if (font) {
    return(
      <NavigationContainer>
        <StatusBar style="auto"/>
        <Stack.Navigator initialRouteName="Info">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Category" component={CategoryScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Cabinet" component={CabinetScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Info" component={ItemInfoScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
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
    backgroundColor: '#fefefe',
  },
  container: {
    flex: 1,
    paddingLeft: '6%',
    paddingRight: '6%',
    paddingBottom: 60
  },
});