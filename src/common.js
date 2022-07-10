import icon1 from '../assets/imgs/icons/1-s.png'
import icon2 from '../assets/imgs/icons/2-s.png'
import icon3 from '../assets/imgs/icons/3-s.png'
import icon4 from '../assets/imgs/icons/4-s.png'
import icon5 from '../assets/imgs/icons/5-s.png'
import icon6 from '../assets/imgs/icons/6-s.png'
import icon7 from '../assets/imgs/icons/7-s.png'
import icon8 from '../assets/imgs/icons/8-s.png'
import icon11 from '../assets/imgs/icons/11-s.png'
import icon12 from '../assets/imgs/icons/12-s.png'
import icon13 from '../assets/imgs/icons/13-s.png'
import icon14 from '../assets/imgs/icons/14-s.png'
import icon15 from '../assets/imgs/icons/15-s.png'
import icon16 from '../assets/imgs/icons/16-s.png'
import icon17 from '../assets/imgs/icons/17-s.png'
import icon18 from '../assets/imgs/icons/18-s.png'
import icon19 from '../assets/imgs/icons/19-s.png'
import icon20 from '../assets/imgs/icons/20-s.png'
import icon21 from '../assets/imgs/icons/21-s.png'
import icon22 from '../assets/imgs/icons/22-s.png'
import icon23 from '../assets/imgs/icons/23-s.png'
import icon24 from '../assets/imgs/icons/24-s.png'
import icon25 from '../assets/imgs/icons/25-s.png'
import icon26 from '../assets/imgs/icons/26-s.png'
import icon29 from '../assets/imgs/icons/29-s.png'
import icon30 from '../assets/imgs/icons/30-s.png'
import icon31 from '../assets/imgs/icons/31-s.png'
import icon32 from '../assets/imgs/icons/32-s.png'
import icon33 from '../assets/imgs/icons/33-s.png'
import icon34 from '../assets/imgs/icons/34-s.png'
import icon35 from '../assets/imgs/icons/35-s.png'
import icon36 from '../assets/imgs/icons/36-s.png'
import icon37 from '../assets/imgs/icons/37-s.png'
import icon38 from '../assets/imgs/icons/38-s.png'
import icon39 from '../assets/imgs/icons/39-s.png'
import icon40 from '../assets/imgs/icons/40-s.png'
import icon41 from '../assets/imgs/icons/41-s.png'
import icon42 from '../assets/imgs/icons/42-s.png'
import icon43 from '../assets/imgs/icons/43-s.png'
import icon44 from '../assets/imgs/icons/44-s.png'

const getIcon = number => {
  // return global[`icon${number}`]
  switch (number) {
    case 1:
      return icon1
    case 2:
      return icon2
    case 3:
      return icon3
    case 4:
      return icon4
    case 5:
      return icon5
    case 6:
      return icon6
    case 7:
      return icon7
    case 8:
      return icon8
    case 11:
      return icon11
    case 12:
      return icon12
    case 13:
      return icon13
    case 14:
      return icon14
    case 15:
      return icon15
    case 16:
      return icon16
    case 17:
      return icon17
    case 18:
      return icon18
    case 19:
      return icon19
    case 20:
      return icon20
    case 21:
      return icon21
    case 22:
      return icon22
    case 23:
      return icon23
    case 24:
      return icon24
    case 25:
      return icon25
    case 26:
      return icon26
    case 29:
      return icon29
    case 30:
      return icon30
    case 31:
      return icon31
    case 32:
      return icon32
    case 33:
      return icon33
    case 34:
      return icon34
    case 35:
      return icon35
    case 36:
      return icon36
    case 37:
      return icon37
    case 38:
      return icon38
    case 39:
      return icon39
    case 40:
      return icon40
    case 41:
      return icon41
    case 42:
      return icon42
    case 43:
      return icon43
    case 44:
      return icon44
    default:
      return null
  }
}

const initialState = {
  cityName: 'Abuble',
  cityCode: '35954',
  hasLocationPermission: true,
  latlng: '',
  current: {
    date: '2022-07-07T14:20:00-03:00',
    temp: 29,
    icon: 7,
    iconPhrase: 'Nublado',
    hasPrecipitation: false,
    precipitaionType: null,
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
    {
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
    {
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
    {
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
    {
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
  ],

  hourly12Forecast: [
    {
      date: '2022-07-07T13:00:00-03:00',
      icon: 7,
      iconPhrase: 'Nublado',
      hasPrecipitation: false,
      isDaylight: true,
      temp: 25,
      precipitaionProbability: 0,
    },
    {
      date: '2022-07-07T12:00:00-03:00',
      icon: 7,
      iconPhrase: 'Nublado',
      hasPrecipitation: false,
      isDaylight: true,
      temp: 24,
      precipitaionProbability: 0,
    },
    {
      date: '2022-07-07T14:00:00-03:00',
      icon: 7,
      iconPhrase: 'Nublado',
      hasPrecipitation: false,
      isDaylight: true,
      temp: 26,
      precipitaionProbability: 0,
    },
    {
      date: '2022-07-07T15:00:00-03:00',
      icon: 7,
      iconPhrase: 'Nublado',
      hasPrecipitation: false,
      isDaylight: true,
      temp: 26,
      precipitaionProbability: 0,
    },
    {
      date: '2022-07-07T16:00:00-03:00',
      icon: 7,
      iconPhrase: 'Nublado',
      hasPrecipitation: false,
      isDaylight: true,
      temp: 25,
      precipitaionProbability: 0,
    },
    {
      date: '2022-07-07T17:00:00-03:00',
      icon: 7,
      iconPhrase: 'Nublado',
      hasPrecipitation: false,
      isDaylight: true,
      temp: 24,
      precipitaionProbability: 0,
    },
    {
      date: '2022-07-07T18:00:00-03:00',
      icon: 7,
      iconPhrase: 'Nublado',
      hasPrecipitation: false,
      isDaylight: true,
      temp: 22,
      precipitaionProbability: 0,
    },
    {
      date: '2022-07-07T19:00:00-03:00',
      icon: 38,
      iconPhrase: 'Predominantemente nublado',
      hasPrecipitation: false,
      isDaylight: false,
      temp: 21,
      precipitaionProbability: 0,
    },
    {
      date: '2022-07-07T20:00:00-03:00',
      icon: 36,
      iconPhrase: 'Nuvens esparsas',
      hasPrecipitation: false,
      isDaylight: false,
      temp: 19,
      precipitaionProbability: 0,
    },
    {
      date: '2022-07-07T21:00:00-03:00',
      icon: 35,
      iconPhrase: 'Parcialmente nublado',
      hasPrecipitation: false,
      isDaylight: false,
      temp: 18,
      precipitaionProbability: 0,
    },
    {
      date: '2022-07-07T22:00:00-03:00',
      icon: 35,
      iconPhrase: 'Parcialmente nublado',
      hasPrecipitation: false,
      isDaylight: false,
      temp: 18,
      precipitaionProbability: 0,
    },
    {
      date: '2022-07-07T23:00:00-03:00',
      icon: 34,
      iconPhrase: 'Predominantemente aberto',
      hasPrecipitation: false,
      isDaylight: false,
      temp: 17,
      precipitaionProbability: 0,
    },
  ],
}

export { initialState, getIcon }
