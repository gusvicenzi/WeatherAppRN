import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ImageBackground,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import clouds from '../../assets/imgs/clouds.png'
import DailyForecast from '../components/DailyForecast'
import HourlyWeather from '../components/HourlyForecast'
import axios from 'axios'

const initialState = {
  cityName: 'Blumenau',
  current: {
    date: '2022-07-07T14:20:00-03:00',
    temp: 29,
    icon: 7,
    iconPhrase: 'Nublado',
    hasPrecipitation: false,
    precipitaionType: null,
    isDayTime: true,
  },
  todayForecast: {
    date: '2022-07-07T07:00:00-03:00',
    minTemp: 9,
    maxTemp: 30,
    day: {
      icon: 7,
      iconPhrase: 'Nublado',
      hasPrecipitation: false,
      precipitaionType: null,
      precipitaionIntensity: null,
    },
    night: {
      icon: 34,
      iconPhrase: 'Predominantemente aberto',
      hasPrecipitation: false,
      precipitaionType: null,
      precipitaionIntensity: null,
    },
  },
  day2Forecast: {
    date: '2022-07-08T07:00:00-03:00',
    minTemp: 14,
    maxTemp: 26,
    day: {
      icon: 4,
      iconPhrase: 'Nuvens esparsas',
      hasPrecipitation: false,
      precipitaionType: null,
      precipitaionIntensity: null,
    },
    night: {
      icon: 12,
      iconPhrase: 'Pancadas de chuva',
      hasPrecipitation: true,
      precipitaionType: 'Rain',
      precipitaionIntensity: 'Light',
    },
  },
  day3Forecast: {
    date: '2022-07-09T07:00:00-03:00',
    minTemp: 14,
    maxTemp: 26,
    day: {
      icon: 4,
      iconPhrase: 'Nuvens esparsas',
      hasPrecipitation: false,
      precipitaionType: null,
      precipitaionIntensity: null,
    },
    night: {
      icon: 12,
      iconPhrase: 'Pancadas de chuva',
      hasPrecipitation: true,
      precipitaionType: 'Rain',
      precipitaionIntensity: 'Light',
    },
  },
  day4Forecast: {
    date: '2022-07-10T07:00:00-03:00',
    minTemp: 14,
    maxTemp: 26,
    day: {
      icon: 4,
      iconPhrase: 'Nuvens esparsas',
      hasPrecipitation: false,
      precipitaionType: null,
      precipitaionIntensity: null,
    },
    night: {
      icon: 12,
      iconPhrase: 'Pancadas de chuva',
      hasPrecipitation: true,
      precipitaionType: 'Rain',
      precipitaionIntensity: 'Light',
    },
  },
  day5Forecast: {
    date: '2022-07-11T07:00:00-03:00',
    minTemp: 14,
    maxTemp: 26,
    day: {
      icon: 4,
      iconPhrase: 'Nuvens esparsas',
      hasPrecipitation: false,
      precipitaionType: null,
      precipitaionIntensity: null,
    },
    night: {
      icon: 12,
      iconPhrase: 'Pancadas de chuva',
      hasPrecipitation: true,
      precipitaionType: 'Rain',
      precipitaionIntensity: 'Light',
    },
  },
}

export default class Home extends Component {
  state = {
    ...initialState,
  }

  getCurrentWeather = async () => {
    try {
      const cityCode = '35954'
      const res = await axios.get(
        `http://dataservice.accuweather.com/currentconditions/v1/${cityCode}?apikey=m7YVXQ5NAYdGRbXEygi5hyuFUcT9657F&language=pt-br`
      )
      const today = res.data[0]
      // console.log(today)
      this.setState({
        current: {
          date: today.LocalObservationDateTime,
          temp: today.Temperature.Metric.Value,
          icon: today.WeatherIcon,
          iconPhrase: today.WeatherText,
          hasPrecipitation: today.HasPrecipitation,
          precipitaionType: today.PrecipitationType,
          isDayTime: today.IsDayTime,
        },
      })
    } catch (e) {
      console.log(e)
    }
  }
  get5DayForecast = async () => {
    try {
      const cityCode = '35954'
      const res = await axios.get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityCode}?apikey=m7YVXQ5NAYdGRbXEygi5hyuFUcT9657F&language=pt-br&metric=true`
      )
      const today = res.data.DailyForecasts[0]
      console.log(today)
      this.setState({
        todayForecast: {
          date: today.Date,
          minTemp: today.Temperature.Minimum.Value,
          maxTemp: today.Temperature.Maximum.Value,
          day: {
            icon: today.Day.Icon,
            iconPhrase: today.Day.IconPhrase,
            hasPrecipitation: today.Day.HasPrecipitation,
            precipitaionType: today.Day.HasPrecipitation
              ? today.Day.PrecipitaionType
              : null,
            precipitaionIntensity: today.Day.HasPrecipitation
              ? today.Day.PrecipitaionIntensity
              : null,
          },
          night: {
            icon: 34,
            iconPhrase: 'Predominantemente aberto',
            hasPrecipitation: today.Night.HasPrecipitation,
            precipitaionType: today.Night.HasPrecipitation
              ? today.Night.PrecipitaionType
              : null,
            precipitaionIntensity: today.Night.HasPrecipitation
              ? today.Night.PrecipitaionIntensity
              : null,
          },
        },
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={clouds}
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
                Máx.: {this.state.todayForecast.maxTemp}° Mín.:{' '}
                {this.state.todayForecast.minTemp}°
              </Text>
            </View>

            <View style={styles.main}>
              <View style={[styles.infoContainer, styles.infoHourly]}>
                <Text style={styles.infoContainerTitle}>Infos hora a hora</Text>
                <ScrollView horizontal>
                  <View style={{ flexDirection: 'row' }}>
                    <HourlyWeather
                      hour="Agora"
                      temp="22"
                    />
                    <HourlyWeather
                      hour="12"
                      temp="23"
                    />
                    <HourlyWeather
                      hour="13"
                      temp="24"
                    />
                    <HourlyWeather
                      hour="14"
                      temp="25"
                    />
                    <HourlyWeather
                      hour="15"
                      temp="23"
                    />
                    <HourlyWeather
                      hour="16"
                      temp="22"
                    />
                    <HourlyWeather
                      hour="17"
                      temp="21"
                    />
                  </View>
                </ScrollView>
              </View>

              <View style={[styles.infoContainer, styles.infoDaily]}>
                <Text style={[styles.infoContainerTitle, { marginBottom: 5 }]}>
                  Previsão para 5 dias
                </Text>
                <DailyForecast
                  day={this.state.todayForecast.date.substring(8, 10)}
                  minTemp={this.state.todayForecast.minTemp}
                  maxTemp={this.state.todayForecast.maxTemp}
                />
                <DailyForecast
                  day={this.state.day2Forecast.date.substring(8, 10)}
                  minTemp={this.state.day2Forecast.minTemp}
                  maxTemp={this.state.day2Forecast.maxTemp}
                />
                <DailyForecast
                  day={this.state.day3Forecast.date.substring(8, 10)}
                  minTemp={this.state.day3Forecast.minTemp}
                  maxTemp={this.state.day3Forecast.maxTemp}
                />
                <DailyForecast
                  day={this.state.day4Forecast.date.substring(8, 10)}
                  minTemp={this.state.day4Forecast.minTemp}
                  maxTemp={this.state.day4Forecast.maxTemp}
                />
                <DailyForecast
                  day={this.state.day5Forecast.date.substring(8, 10)}
                  minTemp={this.state.day5Forecast.minTemp}
                  maxTemp={this.state.day5Forecast.maxTemp}
                />
              </View>
              <TouchableOpacity onPress={this.get5DayForecast}>
                <Text>Get 5 day forecast</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.getCurrentWeather}>
                <Text>Get today weather</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
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
    marginBottom: 60,
  },
  infoContainer: {
    alignItems: 'center',
    padding: 5,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  infoHourly: {
    height: 150,
  },
  infoDaily: {
    height: '60%',
  },
  infoContainerTitle: {
    color: '#FFF',
  },
})
