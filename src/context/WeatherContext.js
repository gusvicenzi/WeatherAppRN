import React, { Component, createContext } from 'react'
// import { initialState } from '../common'
// import { initialCardState } from '../common'
import { generalInitialState } from '../common'
import { LogBox, PermissionsAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import AsyncStorage from '@react-native-async-storage/async-storage'

const WeatherContext = createContext({})

export class WeatherProvider extends Component {
  state = {
    ...generalInitialState,
  }

  componentDidMount = async () => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    const stateString = await AsyncStorage.getItem('weatherState')
    const savedState = JSON.parse(stateString) || this.state
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

  getCityInfoByCityName = async index => {
    try {
      const cityName = this.state.cityList[index].cityName
      // const res = await axios.get(
      //   `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${accuweatherApiKey}&q=${cityName}&language=pt-br&details=true&offset=1`
      // )
      // const cityCode = res.data[0].Key
      const cityCode = 'mudou o codigo da cidade'
      // cityList[index].cityCode: cityCode
      this.setState(prevState => ({
        cityList: prevState.cityList.map((city, i) =>
          i === index ? { ...city, cityCode } : city
        ),
      }))
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
    const { getCityInfoByCityName } = this
    return (
      <WeatherContext.Provider
        value={{ state: this.state, getCityInfoByCityName }}>
        {this.props.children}
      </WeatherContext.Provider>
    )
  }
}
export default WeatherContext
