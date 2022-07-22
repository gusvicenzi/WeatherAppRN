import React, { Component, createContext } from 'react'
import { LogBox, PermissionsAndroid } from 'react-native'

import axios from 'axios'
import { accuweatherApiKey } from '../../apiKey'
import { ACCUWEATHERAPIKEY } from 'react-native-dotenv'
import { generalInitialState } from '../common'
import Geolocation from 'react-native-geolocation-service'
import AsyncStorage from '@react-native-async-storage/async-storage'

const WeatherContext = createContext({})

export class WeatherProvider extends Component {
  state = {
    ...generalInitialState,
  }

  componentDidMount = async () => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    // AsyncStorage.clear()
    const stateString = await AsyncStorage.getItem('weatherState')
    const savedState = JSON.parse(stateString) || this.state
    this.setState(
      savedState
      // ,this.updateWeather
    )
    // this.updateWeather()
    // this.getLatlng()
  }

  // updateWeather = async () => {
  //   this.getLatlng()
  //   const list = [this.getCityCodeByLatLng, this.getCurrentWeather]
  //   for (let fn of list) {
  //     await fn()
  //   }
  //   try {
  //     await this.getCityCodeByLatLng()
  //     await this.getCurrentWeather()
  //     await this.get12HourForecast()
  //     await this.get5DayForecast()
  //   } catch (e) {
  //     console.log(e)
  //   }
  //   console.log(this.state)
  // }

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
        this.setState(
          prevState => ({
            ...prevState,
            local: {
              ...prevState.local,
              hasLocationPermission: true,
            },
          })

          // ,this.getCityCodeByLatLng
        )
        // this.setState({ hasLocationPermission: true })
      } else {
        console.log('Location permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  getLatlng = () => {
    if (this.state.local.hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          this.setState(
            prevState => ({
              ...prevState,
              local: {
                ...prevState.local,
                latlng: `${position.coords.latitude},${position.coords.longitude}`,
              },
            }),

            this.getCityCodeByLatLng
          )
          console.log('latlng: ', this.state.local.latlng)
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

  getCityCodeByLatLng = async () => {
    try {
      const res = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${accuweatherApiKey}&q=${this.state.local.latlng}&language=pt-br`
      )
      const cityCode = res.data.Key
      const cityName = res.data.LocalizedName
      console.log('Código da cidade accuweather:', cityCode)
      console.log('Nome da cidade:', cityName)
      this.setState(
        prevState => ({
          ...prevState,
          local: { ...prevState.local, cityCode, cityName },
        }),
        this.getCurrentWeather
      )
    } catch (e) {
      console.log(e)
    }
  }

  getCityCodeByCityName = async index => {
    try {
      const cityName = this.state.cityList[index].cityName
      const res = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${accuweatherApiKey}&q=${cityName}&language=pt-br&details=true&offset=1`
      )
      const cityCode = res.data[0].Key
      // const cityCode = 'mudou o codigo da cidade'
      // cityList[index].cityCode: cityCode
      this.setState(
        prevState => ({
          cityList: prevState.cityList.map((city, i) =>
            i === index ? { ...city, cityCode } : city
          ),
        }),
        () => this.getCurrentWeather(index)
      )
    } catch (e) {
      console.log(e)
    }
  }

  getCurrentWeather = async index => {
    try {
      console.log('index', index)
      const cityCode =
        index != undefined
          ? this.state.cityList[index].cityCode
          : this.state.local.cityCode
      console.log(cityCode)
      index != undefined
        ? console.log('Citycode list: ', this.state.cityList[index].cityCode)
        : false
      const res = await axios.get(
        `http://dataservice.accuweather.com/currentconditions/v1/${cityCode}?apikey=${accuweatherApiKey}&language=pt-br`
      )
      const today = res.data[0]
      const current = {
        date: today.LocalObservationDateTime,
        temp: Math.round(today.Temperature.Metric.Value),
        icon: today.WeatherIcon,
        iconPhrase: today.WeatherText,
        hasPrecipitation: today.HasPrecipitation,
        precipitationType: today.PrecipitationType,
        //adicionar precipitationIntensity
        isDayTime: today.IsDayTime,
      }
      if (index == undefined) {
        this.setState(
          prevState => ({
            ...prevState,
            local: { ...prevState.local, current },
          }),
          this.get12HourForecast
        )
      } else {
        this.setState(
          prevState => ({
            cityList: prevState.cityList.map((city, i) =>
              i === index ? { ...city, current } : city
            ),
          }),
          () => {
            this.get12HourForecast(index)
          }
        )
      }
    } catch (e) {
      console.log(e)
    }
  }

  get12HourForecast = async index => {
    try {
      const cityCode =
        index != undefined
          ? this.state.cityList[index].cityCode
          : this.state.local.cityCode
      const res = await axios.get(
        `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${cityCode}?apikey=${accuweatherApiKey}&language=pt-br&metric=true`
      )
      const hourly12Forecast = []
      for (let hour of res.data) {
        hourly12Forecast.push(this.hourlyForecast(hour))
      }

      if (index == undefined) {
        this.setState(
          prevState => ({
            ...prevState,
            local: { ...prevState.local, hourly12Forecast },
          }),
          this.get5DayForecast
        )
      } else {
        this.setState(
          prevState => ({
            cityList: prevState.cityList.map((city, i) =>
              i === index ? { ...city, hourly12Forecast } : city
            ),
          }),
          () => {
            this.get5DayForecast(index)
          }
        )
      }
    } catch (e) {
      console.log(e)
    }
  }

  get5DayForecast = async index => {
    try {
      const cityCode =
        index != undefined
          ? this.state.cityList[index].cityCode
          : this.state.local.cityCode
      const res = await axios.get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityCode}?apikey=${accuweatherApiKey}&language=pt-br&metric=true`
      )
      const dailyForecast = []
      for (let day of res.data.DailyForecasts) {
        dailyForecast.push(this.dailyForecast(day))
      }
      if (index == undefined) {
        this.setState(
          prevState => ({
            ...prevState,
            local: { ...prevState.local, dailyForecast },
          }),
          this.saveSateToAsyncStorage
        )
      } else {
        this.setState(
          prevState => ({
            cityList: prevState.cityList.map((city, i) =>
              i === index ? { ...city, dailyForecast } : city
            ),
          }),
          this.saveSateToAsyncStorage
        )
      }
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
        precipitationType: nthDayForecast.Day.HasPrecipitation
          ? nthDayForecast.Day.PrecipitationType
          : null,
        precipitationIntensity: nthDayForecast.Day.HasPrecipitation
          ? nthDayForecast.Day.PrecipitationIntensity
          : null,
      },
      night: {
        icon: nthDayForecast.Night.Icon,
        iconPhrase: nthDayForecast.Night.IconPhrase,
        hasPrecipitation: nthDayForecast.Night.HasPrecipitation,
        precipitationType: nthDayForecast.Night.HasPrecipitation
          ? nthDayForecast.Night.PrecipitationType
          : null,
        precipitationIntensity: nthDayForecast.Night.HasPrecipitation
          ? nthDayForecast.Night.PrecipitationIntensity
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
      precipitationProbability: nthHourDay.PrecipitationProbability,
    }
    return hourForecast
  }

  addCity = cityName => {
    const newCity = {
      cityName,
      cityCode: 'xxxx',
      latlng: '',
      current: {
        date: '2022-07-07T14:20:00-03:00',
        temp: null,
        icon: 1,
        iconPhrase: '',
        hasPrecipitation: false,
        precipitationType: null,
        isDayTime: true,
      },
      dailyForecast: [
        {
          date: '2022-07-07T07:00:00-03:00',
          minTemp: 9,
          maxTemp: 30,
          day: {
            icon: 7,
            iconPhrase: 'Nublado',
            hasPrecipitation: false,
            precipitationType: null,
            precipitationIntensity: null,
          },
          night: {
            icon: 34,
            iconPhrase: 'Predominantemente aberto',
            hasPrecipitation: false,
            precipitationType: null,
            precipitationIntensity: null,
          },
        },
      ],
      hourly12Forecast: [
        {
          date: '2022-07-07T13:00:00-03:00',
          icon: 7,
          iconPhrase: 'Nublado',
          hasPrecipitation: false,
          isDaylight: true,
          temp: 25,
          precipitationProbability: 0,
        },
      ],
    }

    this.setState(
      prevState => ({
        cityList: [...prevState.cityList, newCity],
      }),
      () => this.getCityCodeByCityName(this.state.cityList.length - 1)
    )
    console.log('Nova cidade adicionada: ', newCity)
    for (let city of this.state.cityList) {
      console.log(city.cityName)
    }
  }

  removeCity = index => {
    this.setState(prevState => ({
      cityList: prevState.cityList.filter((city, i) => i != index),
    }))
    this.saveSateToAsyncStorage()
  }

  render() {
    const { getCityCodeByCityName, getLatlng, addCity, removeCity } = this
    return (
      <WeatherContext.Provider
        value={{
          state: this.state,
          getCityCodeByCityName,
          getLatlng,
          addCity,
          removeCity,
        }}>
        {this.props.children}
      </WeatherContext.Provider>
    )
  }
}
export default WeatherContext
