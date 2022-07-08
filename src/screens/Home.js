import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ImageBackground,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native'
// import { ACCUWEATHERAPIKEY } from '@env'

import clouds from '../../assets/imgs/clouds.png'
import DailyForecast from '../components/DailyForecast'
import HourlyForecast from '../components/HourlyForecast'
import axios from 'axios'
import { initialState } from '../common'

export default class Home extends Component {
  state = {
    ...initialState,
  }

  getCityInfo = async () => {
    try {
      const cityName = this.state.cityName
      const res = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=m7YVXQ5NAYdGRbXEygi5hyuFUcT9657F&q=${cityName}&language=pt-br&details=true&offset=1`
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
        `http://dataservice.accuweather.com/currentconditions/v1/${cityCode}?apikey=m7YVXQ5NAYdGRbXEygi5hyuFUcT9657F&language=pt-br`
      )
      const today = res.data[0]
      this.setState({
        current: {
          date: today.LocalObservationDateTime,
          temp: Math.round(today.Temperature.Metric.Value),
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
      const cityCode = this.state.cityCode
      const res = await axios.get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityCode}?apikey=m7YVXQ5NAYdGRbXEygi5hyuFUcT9657F&language=pt-br&metric=true`
      )
      const dailyForecast = []
      for (day of res.data.DailyForecasts) {
        dailyForecast.push(this.dailyForecast(day))
      }

      this.setState({
        dailyForecast,
      })

      // this.setState({
      //   dailyForecast: [
      //     this.dailyForecast(res.data.DailyForecasts[0]),
      //     this.dailyForecast(res.data.DailyForecasts[1]),
      //     this.dailyForecast(res.data.DailyForecasts[2]),
      //     this.dailyForecast(res.data.DailyForecasts[3]),
      //     this.dailyForecast(res.data.DailyForecasts[4]),
      //   ],
      // })
    } catch (e) {
      console.log(e)
    }
  }

  get12HourForecast = async () => {
    try {
      const cityCode = this.state.cityCode
      const res = await axios.get(
        `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${cityCode}?apikey=m7YVXQ5NAYdGRbXEygi5hyuFUcT9657F&language=pt-br&metric=true`
      )
      const hourly12Forecast = []
      for (hour of res.data) {
        hourly12Forecast.push(this.hourlyForecast(hour))
      }
      this.setState({
        hourly12Forecast,
      })
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
      temp: nthHourDay.Temperature.Value,
      precipitaionProbability: nthHourDay.precipitaionProbability,
    }
    return hourForecast
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
                Máx.: {this.state.dailyForecast[0].maxTemp}° Mín.:{' '}
                {this.state.dailyForecast[0].minTemp}°
              </Text>
            </View>

            <View style={styles.main}>
              <View style={[styles.infoContainer, styles.infoHourly]}>
                <Text style={styles.infoContainerTitle}>Infos hora a hora</Text>
                <FlatList
                  horizontal
                  data={this.state.hourly12Forecast}
                  keyExtractor={item => item.date}
                  renderItem={({ item }) => (
                    <HourlyForecast
                      hour={item.date.substring(11, 13)}
                      temp={item.temp}
                    />
                  )}
                />
              </View>

              <View style={[styles.infoContainer, styles.infoDaily]}>
                <Text style={[styles.infoContainerTitle, { marginBottom: 5 }]}>
                  Previsão para 5 dias
                </Text>
                <DailyForecast
                  day={this.state.dailyForecast[0].date.substring(8, 10)}
                  minTemp={this.state.dailyForecast[0].minTemp}
                  maxTemp={this.state.dailyForecast[0].maxTemp}
                />
                <DailyForecast
                  day={this.state.dailyForecast[1].date.substring(8, 10)}
                  minTemp={this.state.dailyForecast[1].minTemp}
                  maxTemp={this.state.dailyForecast[1].maxTemp}
                />
                <DailyForecast
                  day={this.state.dailyForecast[2].date.substring(8, 10)}
                  minTemp={this.state.dailyForecast[2].minTemp}
                  maxTemp={this.state.dailyForecast[2].maxTemp}
                />
                <DailyForecast
                  day={this.state.dailyForecast[3].date.substring(8, 10)}
                  minTemp={this.state.dailyForecast[3].minTemp}
                  maxTemp={this.state.dailyForecast[3].maxTemp}
                />
                <DailyForecast
                  day={this.state.dailyForecast[4].date.substring(8, 10)}
                  minTemp={this.state.dailyForecast[4].minTemp}
                  maxTemp={this.state.dailyForecast[4].maxTemp}
                />
              </View>
              <TouchableOpacity onPress={this.get5DayForecast}>
                <Text>Get 5 day forecast</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.getCurrentWeather}>
                <Text>Get today weather</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.get12HourForecast}>
                <Text>Get 12 hour forecast</Text>
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
