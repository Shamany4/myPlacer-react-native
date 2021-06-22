import React, {useEffect, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import * as Font from 'expo-font';
import * as Location from "expo-location";
import firebase from 'firebase/app'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Alert, View} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import {
  HomeScreen,
  SearchScreen,
  CategoryScreen,
  FavoritesScreen,
  CabinetScreen,
  LoginScreen,
  RegisterScreen,
  ItemInfoScreen,
  OneCategoryScreen,
} from './src/pages';
import MyLoadingApp from "./src/components/MyLoadingApp";


let customFonts = {
  'Gilroy-Regular': require('./assets/fonts/Gilroy-Regular.ttf'),
  'Gilroy-Medium': require('./assets/fonts/Gilroy-Medium.ttf'),
  'Gilroy-SemiBold': require('./assets/fonts/Gilroy-Semibold.ttf'),
  'Gilroy-Bold': require('./assets/fonts/Gilroy-Bold.ttf'),
  'Gilroy-ExtraBold': require('./assets/fonts/Gilroy-Extrabold.ttf'),
  'Gilroy-Black': require('./assets/fonts/Gilroy-Black.ttf'),
};

const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyBZ5gMw4gVnR1gmCkdCrDz6gw-R2jxVG9U",
  authDomain: "myplacer-1593b.firebaseapp.com",
  projectId: "myplacer-1593b",
  storageBucket: "myplacer-1593b.appspot.com",
  messagingSenderId: "1087593687763",
  appId: "1:1087593687763:web:aea46bb5fe734c418f0226",
  measurementId: "G-63H7MQ1DXM"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}


export default function App() {
  const [font, setFont] = useState(false);
  const [location, setLocation] = useState(null);
  const [dayWeek, setDayWeek] = useState(null);

  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

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

      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
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

  useEffect(() => {
    (async () => {
      let result = await SecureStore.getItemAsync('userID');
      if (result) {
        setAuthenticated(true);
        firebase.firestore().collection('users')
          .doc(result)
          .get()
          .then(response => {
            setUser(response.data())
          })
      } else {
        setUser(null);
        setAuthenticated(false);
      }
    })();
  }, []);

  if (font && location && dayWeek) {
    return (
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator>
          {
            !authenticated ? (
              <>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Home" component={HomeScreen}
                              options={{ headerShown: false }}
                              initialParams={{ location, dayWeek }}
                />
                <Stack.Screen name="Search" component={SearchScreen}
                              options={{ headerShown: false }}
                              initialParams={{ location, dayWeek }}
                />
                <Stack.Screen name="Category" component={CategoryScreen}
                              options={{ headerShown: false }}
                />
                <Stack.Screen name="Favorites" component={FavoritesScreen}
                              options={{ headerShown: false }}
                              initialParams={{ location, dayWeek }}
                />
                <Stack.Screen name="Cabinet" component={CabinetScreen}
                              options={{ headerShown: false }}
                />
                <Stack.Screen name="Info" component={ItemInfoScreen}
                              options={{ headerShown: false }}
                />
                <Stack.Screen name="OneCategory" component={OneCategoryScreen}
                              options={{ headerShown: false }}
                              initialParams={{ location, dayWeek }}
                />
              </>
            ) : (
              <>
                <Stack.Screen name="Home" component={HomeScreen}
                              options={{ headerShown: false }}
                              initialParams={{ location, dayWeek }}
                />
                <Stack.Screen name="Search" component={SearchScreen}
                              options={{ headerShown: false }}
                              initialParams={{ location, dayWeek }}
                />
                <Stack.Screen name="Category" component={CategoryScreen}
                              options={{ headerShown: false }}
                />
                <Stack.Screen name="Favorites" component={FavoritesScreen}
                              options={{ headerShown: false }}
                              initialParams={{ location, dayWeek }}
                />
                <Stack.Screen name="Cabinet" component={CabinetScreen}
                              options={{ headerShown: false }}
                />
                <Stack.Screen name="Info" component={ItemInfoScreen}
                              options={{ headerShown: false }}
                />
                <Stack.Screen name="OneCategory" component={OneCategoryScreen}
                              options={{ headerShown: false }}
                              initialParams={{ location, dayWeek }}
                />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
              </>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <MyLoadingApp title="Получаем необходимые параметры..." />
  }

}