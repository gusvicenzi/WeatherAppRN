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
import DailyForecast from '../components/DailyForecast'
import HourlyForecast from '../components/HourlyForecast'
import axios from 'axios'
import { initialState, getIcon } from '../common'
import Geolocation from 'react-native-geolocation-service'

import { accuweatherApiKey } from '../../apiKey'
import WeatherContext from '../context/WeatherContext'

export default class Home extends Component {
  state = {
    ...initialState,
  }

  componentDidMount = async () => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    const stateString = await AsyncStorage.getItem('weatherState')
    const savedState = JSON.parse(stateString) || initialState
    this.setState(
      savedState
      // this.updateWeather
    )
    // this.updateWeather()
    this.getLatlng()
  }

  updateWeather = async () => {
    // this.getLatlng()
    // const list = [this.getCityInfoByLatLng, this.getCurrentWeather]
    // for (let fn of list) {
    //   await fn()
    // }
    // try {
    //   await this.getCityInfoByLatLng()
    //   await this.getCurrentWeather()
    //   await this.get12HourForecast()
    //   await this.get5DayForecast()
    // } catch (e) {
    //   console.log(e)
    // }
    // console.log(this.state)
  }

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'WeatherApp location permisson',
          message:
            'WeatherApp needs access to your location ' +
            'to get your best weather information.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location')
        this.setState({ hasLocationPermission: true })
      } else {
        console.log('Location permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  getLatlng = () => {
    if (this.state.hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          this.setState(
            {
              latlng: `${position.coords.latitude},${position.coords.longitude}`,
            }
            // ,this.getCityInfoByLatLng
          )
          console.log(this.state.latlng)
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message)
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      )
    }
  }

  saveSateToAsyncStorage = async () => {
    await AsyncStorage.setItem('weatherState', JSON.stringify(this.state))
    console.log('Salvou estado no asyncstorage')
  }

  // getPostalCode = async () => {
  //   try {
  //     const res = await axios.get(
  //       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latlng}&key=${geolocationApiKey}`
  //       // 'https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyCbMVWH7fsC4lORWSEDupWh6JFvE6jajms'
  //     )
  //     const index = res.data.results[0].address_components
  //     const postal = res.data.results[0].address_components[index-1].long_name
  //     console.log(postal)
  //     this.setState({ postalCode: postal })
  //   } catch (e) {}
  // }

  getCityInfoByLatLng = async () => {
    try {
      const res = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${accuweatherApiKey}&q=${this.state.latlng}&language=pt-br`
      )
      console.log(res.data)
      const cityCode = res.data.Key
      const cityName = res.data.LocalizedName
      console.log('Código da cidade accuweather:', cityCode)
      console.log('Nome da cidade:', cityName)
      this.setState({ cityCode, cityName }, this.getCurrentWeather)
    } catch (e) {
      console.log(e)
    }
  }

  getCityInfoByCityName = async () => {
    try {
      const cityName = this.state.cityName
      const res = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${accuweatherApiKey}&q=${cityName}&language=pt-br&details=true&offset=1`
      )
      const cityCode = res.data[0].Key
      this.setState({ cityCode })
    } catch (e) {
      console.log(e)
    }
  }

  getCurrentWeather = async () => {
    try {
      const cityCode = this.state.cityCode
      const res = await axios.get(
        `http://dataservice.accuweather.com/currentconditions/v1/${cityCode}?apikey=${accuweatherApiKey}&language=pt-br`
      )
      const today = res.data[0]
      this.setState(
        {
          current: {
            date: today.LocalObservationDateTime,
            temp: Math.round(today.Temperature.Metric.Value),
            icon: today.WeatherIcon,
            iconPhrase: today.WeatherText,
            hasPrecipitation: today.HasPrecipitation,
            precipitaionType: today.PrecipitationType,
            isDayTime: today.IsDayTime,
          },
        },
        this.get12HourForecast
      )
    } catch (e) {
      console.log(e)
    }
  }

  get12HourForecast = async () => {
    try {
      const cityCode = this.state.cityCode
      const res = await axios.get(
        `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${cityCode}?apikey=${accuweatherApiKey}&language=pt-br&metric=true`
      )
      const hourly12Forecast = []
      for (let hour of res.data) {
        hourly12Forecast.push(this.hourlyForecast(hour))
      }
      this.setState(
        {
          hourly12Forecast,
        },
        this.get5DayForecast
      )
    } catch (e) {
      console.log(e)
    }
  }

  get5DayForecast = async () => {
    try {
      const cityCode = this.state.cityCode
      const res = await axios.get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityCode}?apikey=${accuweatherApiKey}&language=pt-br&metric=true`
      )
      const dailyForecast = []
      for (let day of res.data.DailyForecasts) {
        dailyForecast.push(this.dailyForecast(day))
      }

      this.setState(
        {
          dailyForecast,
        },
        this.saveSateToAsyncStorage
      )
    } catch (e) {
      console.log(e)
    }
  }

  dailyForecast = nthDayForecast => {
    const forecast = {
      date: nthDayForecast.Date,
      minTemp: Math.round(nthDayForecast.Temperature.Minimum.Value),
      maxTemp: Math.round(nthDayForecast.Temperature.Maximum.Value),
      day: {
        icon: nthDayForecast.Day.Icon,
        iconPhrase: nthDayForecast.Day.IconPhrase,
        hasPrecipitation: nthDayForecast.Day.HasPrecipitation,
        precipitaionType: nthDayForecast.Day.HasPrecipitation
          ? nthDayForecast.Day.PrecipitaionType
          : null,
        precipitaionIntensity: nthDayForecast.Day.HasPrecipitation
          ? nthDayForecast.Day.PrecipitaionIntensity
          : null,
      },
      night: {
        icon: nthDayForecast.Night.Icon,
        iconPhrase: nthDayForecast.Night.IconPhrase,
        hasPrecipitation: nthDayForecast.Night.HasPrecipitation,
        precipitaionType: nthDayForecast.Night.HasPrecipitation
          ? nthDayForecast.Night.PrecipitaionType
          : null,
        precipitaionIntensity: nthDayForecast.Night.HasPrecipitation
          ? nthDayForecast.Night.PrecipitaionIntensity
          : null,
      },
    }
    return forecast
  }

  hourlyForecast = nthHourDay => {
    const hourForecast = {
      date: nthHourDay.DateTime,
      icon: nthHourDay.WeatherIcon,
      iconPhrase: nthHourDay.IconPhrase,
      hasPrecipitation: nthHourDay.HasPrecipitation,
      isDaylight: nthHourDay.IsDaylight,
      temp: Math.round(nthHourDay.Temperature.Value),
      precipitaionProbability: nthHourDay.precipitaionProbability,
    }
    return hourForecast
  }

  render() {
    // console.log(this.context)
    // const { cityName } = this.context.state
    // console.log(Object.keys(this.context.state))
    // console.log(cityName)
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={
            getIcon(this.state.current.icon, this.state.current.isDayTime)[1]
          }
          style={styles.background}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
              <Text style={[styles.headerCity, styles.headerText]}>
                {this.state.cityName}
              </Text>
              <Text style={[styles.headerTemp, styles.headerText]}>
                {this.state.current.temp}°
              </Text>
              <Text style={[styles.headerDesc, styles.headerText]}>
                {this.state.current.iconPhrase}
              </Text>
              <Text style={[styles.headerMaxMin, styles.headerText]}>
                Máx.: {this.state.dailyForecast[0].maxTemp}° Mín.:{' '}
                {this.state.dailyForecast[0].minTemp}°
              </Text>
              <Image
                source={
                  getIcon(
                    this.state.current.icon,
                    this.state.current.isDayTime
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
                  data={this.state.hourly12Forecast}
                  keyExtractor={item => item.date}
                  renderItem={({ item }) => <HourlyForecast {...item} />}
                />
              </View>

              <View style={[styles.infoContainer, styles.infoDaily]}>
                <Text style={[styles.infoContainerTitle, { marginBottom: 5 }]}>
                  Previsão para 5 dias
                </Text>
                <FlatList
                  data={this.state.dailyForecast}
                  keyExtractor={item => item.date}
                  renderItem={({ item }) => <DailyForecast {...item} />}
                />
              </View>
              {/* <TouchableOpacity onPress={this.get5DayForecast}>
                <Text>Get 5 day forecast</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.getCurrentWeather}>
                <Text>Get today weather</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.get12HourForecast}>
                <Text>Get 12 hour forecast</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.requestLocationPermission}>
                <Text>Get location permission</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.getLatlng}>
                <Text>Get lat lng</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.getPostalCode}>
                <Text>Get postal code</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.getCityInfoByLatLng}>
                <Text>Get city info by latlng</Text>
              </TouchableOpacity> */}
              <Text style={{ textAlign: 'center' }}>
                Desenvolvido por deVicenzi
              </Text>
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
    paddingTop: 35,
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
