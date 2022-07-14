import React, { Component, useContext } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ImageBackground,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  LogBox,
  PermissionsAndroid,
} from 'react-native'
// import { ACCUWEATHERAPIKEY } from '@env'

import AsyncStorage from '@react-native-async-storage/async-storage'
import DailyForecast from './DailyForecast'
import HourlyForecast from './HourlyForecast'
import axios from 'axios'
import { initialState, getIcon } from '../common'
import Geolocation from 'react-native-geolocation-service'

import { accuweatherApiKey } from '../../apiKey'
import WeatherContext from '../context/WeatherContext'

export default class Home extends Component {
  // componentDidMount = async () => {
  //   this.getCidade()
  // }

  getCidade = () => {
    // console.log(Object.keys(this.context.state.cityList[this.props.index]))
    // console.log(this.context.state.cityList[this.props.index].cityName)
    // console.log(this.context.state.cityList[this.props.index].cityCode)
    this.context.getCityInfoByCityName(this.props.index)
    // console.log(this.context.state.cityList[this.props.index].cityCode)
  }
  render() {
    // console.log(this.context)
    // const { cityName } = this.context.state.local
    // console.log(Object.keys(this.context.state.local))
    // console.log(cityName)

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={
            getIcon(
              this.context.state.cityList[this.props.index].current.icon,
              this.context.state.cityList[this.props.index].current.isDayTime
            )[1]
          }
          style={styles.background}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
              <Text style={[styles.headerCity, styles.headerText]}>
                {this.context.state.cityList[this.props.index].cityName}
              </Text>
              <Text style={[styles.headerTemp, styles.headerText]}>
                {this.context.state.cityList[this.props.index].current.temp}°
              </Text>
              <Text style={[styles.headerDesc, styles.headerText]}>
                {
                  this.context.state.cityList[this.props.index].current
                    .iconPhrase
                }
              </Text>
              <Text style={[styles.headerMaxMin, styles.headerText]}>
                Máx.:{' '}
                {
                  this.context.state.cityList[this.props.index].dailyForecast[0]
                    .maxTemp
                }
                ° Mín.:{' '}
                {
                  this.context.state.cityList[this.props.index].dailyForecast[0]
                    .minTemp
                }
                °
              </Text>
              <Image
                source={
                  getIcon(
                    this.context.state.cityList[this.props.index].current.icon,
                    this.context.state.cityList[this.props.index].current
                      .isDayTime
                  )[0]
                }
                style={{ width: 100, height: 70 }}
              />
            </View>

            <View style={styles.main}>
              <View style={[styles.infoContainer, styles.infoHourly]}>
                <Text
                  style={[
                    styles.infoContainerTitle,
                    styles.infoContainerTitleHourly,
                  ]}>
                  Hora à hora
                </Text>
                <FlatList
                  horizontal
                  data={
                    this.context.state.cityList[this.props.index]
                      .hourly12Forecast
                  }
                  keyExtractor={item => item.date}
                  renderItem={({ item }) => <HourlyForecast {...item} />}
                />
              </View>

              <View style={[styles.infoContainer, styles.infoDaily]}>
                <Text style={[styles.infoContainerTitle, { marginBottom: 5 }]}>
                  Previsão para 5 dias
                </Text>
                <FlatList
                  data={
                    this.context.state.cityList[this.props.index].dailyForecast
                  }
                  keyExtractor={item => item.date}
                  renderItem={({ item }) => <DailyForecast {...item} />}
                />
              </View>

              <Text style={{ textAlign: 'center' }}>
                Desenvolvido por deVicenzi
              </Text>
              <TouchableOpacity onPress={this.getCidade}>
                <Text>pega cidade</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    )
  }
}

Home.contextType = WeatherContext

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
  },
  header: {
    flex: 1,
    paddingTop: 70,
    paddingBottom: 10,
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
    marginBottom: 30,
  },
  infoContainer: {
    alignItems: 'center',
    padding: 5,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  infoContainerTitleHourly: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.5)',
    width: '100%',
    textAlign: 'center',
    // alignItems: 'center',
  },
  infoHourly: {
    height: 150,
  },
  infoDaily: {
    height: 285,
  },
  infoContainerTitle: {
    color: '#FFF',
  },
})
