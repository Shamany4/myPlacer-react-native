import React from "react";
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import InputGroup from "../components/InputGroup";
import ButtonGroup from "../components/ButtonGroup";


export default function LoginScreen({navigation}) {
  const iconInputPath = '../assets/icons/';
  return(
    <ScrollView>
      <View style={styles.login}>
        <View style={styles.loginImageGroup}>
          <View style={styles.loginImageGroupBlack}/>
          <View style={styles.loginImageGroupText}>
            <Text style={styles.loginImageGroup__title}>MyPlacer</Text>
            <Text style={styles.loginImageGroup__subtitle}>Регистрация</Text>
          </View>
          <Image style={styles.loginImageGroup__image}
                 source={require('../assets/image/register-bg.jpg')}
          />
        </View>

        <View style={styles.container}>
          <View style={styles.loginForm}>
            <View>
              <InputGroup placeholder="Ваш email" secure={false} icon={require(iconInputPath + 'mail.png')}/>
              <InputGroup placeholder="Ваш пароль" secure={true} icon={require(iconInputPath + 'pass.png')}/>
              <InputGroup placeholder="Повторите пароль" secure={true} icon={require(iconInputPath + 'pass.png')}/>
              <InputGroup placeholder="Ваш возраст" secure={true} icon={require(iconInputPath + 'info.png')}/>
              <ButtonGroup title="Регистрация"/>
            </View>

            <View style={styles.loginFooter}>
              <Text style={styles.loginFooter__title}>Уже имеете аккаунт?</Text>
              <Text style={styles.loginFooter__btn} onPress={() => navigation.navigate('Login')}>Авторизация</Text>
            </View>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: '6%',
    paddingRight: '6%',
  },
  login: {

  },
  loginForm: {
  },
  loginImageGroup: {
    width: '100%',
    height: 230,
    backgroundColor: 'gray',
    position: 'relative',
    marginBottom: 30
  },
  loginImageGroupBlack: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  loginImageGroupText: {
    position: 'absolute',
    bottom: 22,
    left: 22,
    zIndex: 2
  },
  loginImageGroup__title: {
    fontFamily: 'Gilroy-Black',
    fontSize: 25,
    color: '#fff',
    letterSpacing: 0.2,
  },
  loginImageGroup__subtitle: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
    color: '#fff',
    letterSpacing: 0.2,
  },
  loginImageGroup__image: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
  },
  loginFooter: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 50
  },
  loginFooter__title: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
    letterSpacing: 0.32,
    opacity: 0.6
  },
  loginFooter__btn: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 16,
    letterSpacing: 0.32,
    marginTop: 5
  }
});