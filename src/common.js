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
import cloudyDay from '../assets/imgs/bgImgs/cloudyDay.png'
import cloudyNight from '../assets/imgs/bgImgs/cloudyNight.png'
import cloudySunnyWFlurriesSnow from '../assets/imgs/bgImgs/cloudySunnyWFlurriesSnow.png'
import cloudySunnyWShowers from '../assets/imgs/bgImgs/cloudySunnyWShowers.png'
import cloudySunnyWTStorms from '../assets/imgs/bgImgs/cloudySunnyWTStorms.png'
import day from '../assets/imgs/bgImgs/day.png'
import drearyDay from '../assets/imgs/bgImgs/drearyDay.png'
import drearyNight from '../assets/imgs/bgImgs/drearyNight.png'
import flurriesSnowDay from '../assets/imgs/bgImgs/flurriesSnowDay.png'
import flurriesSnowNight from '../assets/imgs/bgImgs/flurriesSnowNight.png'
import fogDay from '../assets/imgs/bgImgs/fogDay.png'
import fogNight from '../assets/imgs/bgImgs/fogNight.png'
import iceSleetRainSnowDay from '../assets/imgs/bgImgs/iceSleetRainSnowDay.png'
import iceSleetRainSnowNight from '../assets/imgs/bgImgs/iceSleetRainSnowNight.png'
import mostlySunny from '../assets/imgs/bgImgs/mostlySunny.png'
import intToMostlyCloudy from '../assets/imgs/bgImgs/intToMostlyCloudy.png'
import night from '../assets/imgs/bgImgs/night.png'
import partlySunny from '../assets/imgs/bgImgs/partlySunny.png'
import rainDay from '../assets/imgs/bgImgs/rainDay.png'
import rainNight from '../assets/imgs/bgImgs/rainNight.png'
import showersDay from '../assets/imgs/bgImgs/showersDay.png'
import showersNight from '../assets/imgs/bgImgs/showersNight.png'
import sunny from '../assets/imgs/bgImgs/sunny.png'
import tStormsDay from '../assets/imgs/bgImgs/tStormsDay.png'
import tStormsNight from '../assets/imgs/bgImgs/tStormsNight.png'

const getIcon = (number, isDayTime) => {
  // return global[`icon${number}`]
  switch (number) {
    case 1:
      return [icon1, sunny]
    case 2:
      return [icon2, mostlySunny]
    case 3:
      return [icon3, partlySunny]
    case 4:
      return [icon4, intToMostlyCloudy]
    case 5:
      return [icon5, intToMostlyCloudy]
    case 6:
      return [icon6, intToMostlyCloudy]
    case 7:
      if (isDayTime) {
        return [icon7, cloudyDay]
      } else {
        return [icon7, cloudyNight]
      }
    case 8:
      if (isDayTime) {
        return [icon8, drearyDay]
      } else {
        return [icon8, drearyNight]
      }
    case 11:
      if (isDayTime) {
        return [icon11, fogDay]
      } else {
        return [icon11, fogNight]
      }
    case 12:
      if (isDayTime) {
        return [icon12, showersDay]
      } else {
        return [icon12, showersNight]
      }
    case 13:
      return [icon13, cloudySunnyWShowers]
    case 14:
      return [icon14, cloudySunnyWShowers]
    case 15:
      if (isDayTime) {
        return [icon15, tStormsDay]
      } else {
        return [icon15, tStormsNight]
      }
    case 16:
      return [icon16, cloudySunnyWTStorms]
    case 17:
      return [icon17, cloudySunnyWTStorms]
    case 18:
      if (isDayTime) {
        return [icon18, rainDay]
      } else {
        return [icon18, rainNight]
      }
    case 19:
      if (isDayTime) {
        return [icon19, flurriesSnowDay]
      } else {
        return [icon19, flurriesSnowNight]
      }
    case 20:
      return [icon20, cloudySunnyWFlurriesSnow]
    case 21:
      return [icon21, cloudySunnyWFlurriesSnow]
    case 22:
      if (isDayTime) {
        return [icon22, flurriesSnowDay]
      } else {
        return [icon22, flurriesSnowNight]
      }
    case 23:
      return [icon23, cloudySunnyWFlurriesSnow]
    case 24:
      if (isDayTime) {
        return [icon24, iceSleetRainSnowDay]
      } else {
        return [icon24, iceSleetRainSnowNight]
      }
    case 25:
      if (isDayTime) {
        return [icon25, iceSleetRainSnowDay]
      } else {
        return [icon25, iceSleetRainSnowNight]
      }
    case 26:
      if (isDayTime) {
        return [icon26, iceSleetRainSnowDay]
      } else {
        return [icon26, iceSleetRainSnowNight]
      }
    case 29:
      if (isDayTime) {
        return [icon29, iceSleetRainSnowDay]
      } else {
        return [icon29, iceSleetRainSnowNight]
      }
    case 30:
      if (isDayTime) {
        return [icon30, day]
      } else {
        return [icon30, night]
      }
    case 31:
      if (isDayTime) {
        return [icon31, day]
      } else {
        return [icon31, night]
      }
    case 32:
      if (isDayTime) {
        return [icon32, day]
      } else {
        return [icon32, night]
      }
    case 33:
      return [icon33, night]
    case 34:
      return [icon34, night]
    case 35:
      return [icon35, night]
    case 36:
      return [icon36, night]
    case 37:
      return [icon37, night]
    case 38:
      return [icon38, night]
    case 39:
      return [icon39, night]
    case 40:
      return [icon40, night]
    case 41:
      return [icon41, night]
    case 42:
      return [icon42, night]
    case 43:
      return [icon43, night]
    case 44:
      return [icon44, night]
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
