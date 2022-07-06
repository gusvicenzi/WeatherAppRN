import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ImageBackground,
  View,
  ScrollView,
} from 'react-native'

import clouds from '../../assets/imgs/clouds.png'
import HourlyWeather from '../components/HourlyWeather'

export default class Home extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={clouds}
          style={styles.background}>
          <View style={styles.header}>
            <Text style={[styles.headerCity, styles.headerText]}>Timbó</Text>
            <Text style={[styles.headerTemp, styles.headerText]}>23°</Text>
            <Text style={[styles.headerDesc, styles.headerText]}>
              Parcialmente Nublado
            </Text>
            <Text style={[styles.headerMaxMin, styles.headerText]}>
              Máx.: 26° Mín.: 14°
            </Text>
          </View>
          <View style={styles.main}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoContainerTitle}>Infos hora a hora</Text>
              <ScrollView horizontal>
                <View style={{ flexDirection: 'row' }}>
                  <HourlyWeather />
                </View>
              </ScrollView>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoContainerTitle}>
                Previsão para 10 dias
              </Text>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    flex: 1,
    paddingVertical: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#999',
  },
  headerCity: {
    fontSize: 30,
    lineHeight: 30,
  },
  headerTemp: {
    fontSize: 65,
    lineHeight: 70,
  },
  headerDesc: {
    fontSize: 15,
    lineHeight: 20,
  },
  headerMaxMin: {
    fontSize: 17,
    lineHeight: 22,
  },
  main: {
    flex: 3,
    width: '85%',
  },
  infoContainer: {
    alignItems: 'center',
    height: '30%',
    padding: 5,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  infoContainerTitle: {
    color: '#FFF',
  },
})
