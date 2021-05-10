import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import * as Location from "expo-location";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Alert, Text, View} from 'react-native';

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

import MyLoadingApp from "./src/components/MyLoadingApp";
import AppLoading from "expo-app-loading";


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
  const [location, setLocation] = useState(null);
  const [dayWeek, setDayWeek] = useState('');

  async function LoadAsyncFonts() {
    await Font.loadAsync(customFonts);
    setFont(true);
  }
  // Async load fonts
  useEffect(() => {
    LoadAsyncFonts();
  }, [LoadAsyncFonts]);

  // Get current user position
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Не удалось получить геопозицию','В разрешении на доступ к местоположению было отказано');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // Get current day weeks
  useEffect(() => {
    let date = new Date();
    let countDayWeek = date.getDay();
    let arrDaysWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    setDayWeek(arrDaysWeek[countDayWeek]);
  }, []);

  if (font && location && dayWeek) {
    return(
      <NavigationContainer>
        <StatusBar style="auto"/>
        <Stack.Navigator initialRouteName="Search">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Home" component={HomeScreen}
                        options={{ headerShown: false }}
                        initialParams={{ location: location, currentDay: dayWeek }}
          />
          <Stack.Screen name="Search" component={SearchScreen}
                        options={{ headerShown: false }}
                        initialParams={{ location: location, currentDay: dayWeek }}
          />
          <Stack.Screen name="Category" component={CategoryScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Cabinet" component={CabinetScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Info" component={ItemInfoScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return(
      <MyLoadingApp title="Получаем необходимые данные"/>
    );
  }
}