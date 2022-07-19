import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import { getIcon } from '../common'

export default props => {
  const renderRightActions = () => {
    return (
      <TouchableOpacity
        style={styles.right}
        onPress={() => props.onDelete && props.onDelete(props.index)}>
        <MaterialIcons
          name="delete"
          size={40}
          color="#FFF"
        />
      </TouchableOpacity>
    )
  }

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableWithoutFeedback
        onPress={() => props.navigateToCityWeather(props.cityName)}>
        <View style={styles.card}>
          {/* <ImageBackground
        source={getIcon(props.icon, props.isDayTime)[1]}
        style={styles.background}
        imageStyle={{ height: 600, width: 350 }}
        resizeMode="stretch"> */}
          <View style={styles.leftContainer}>
            <View>
              <Text style={styles.mainText}>{props.cityName}</Text>
              <Text style={styles.time}>
                {props.current.date.substring(11, 16)}
              </Text>
            </View>
            <Text style={styles.description}>{props.current.iconPhrase}</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.mainText}>{props.current.temp}°</Text>
            <Text style={styles.tempsText}>
              Máx.:{props.dailyForecast[0].maxTemp}° Mín.:
              {props.dailyForecast[0].minTemp}°
            </Text>
          </View>
          {/* </ImageBackground> */}
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 120,
    backgroundColor: '#134',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
  },
  // background: {
  //   // flex: 1,
  // },
  right: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    marginLeft: 10,
    height: 120,
    borderRadius: 20,
    marginVertical: 5,
  },
  mainText: {
    fontSize: 23,
    color: 'white',
  },
  time: {
    fontSize: 12,
    color: 'white',
  },
  description: {
    fontSize: 15,
    color: 'white',
  },
  tempsText: {
    fontSize: 14,
    color: 'white',
  },
  rightContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  leftContainer: {
    justifyContent: 'space-between',
  },
})
