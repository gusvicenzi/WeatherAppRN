import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Appearance,
  TouchableOpacity,
  FlatList,
  // useColorScheme
} from 'react-native'
import CityCard from '../components/CityCard'
// import { initialCardState } from '../common'
import WeatherContext from '../context/WeatherContext'
export default class SearchCity extends Component {
  render() {
    const state = this.context.state
    // this.context.addCity({
    //   cityName: 'Pomerode',
    //   cityCode: '77777',
    //   icon: 3,
    //   temp: 22,
    //   maxTemp: 29,
    //   minTemp: 13,
    //   isDayTime: true,
    //   iconPhrase: 'Nublado',
    //   time: '12:08',
    // })
    return (
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tempo</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput style={styles.inputCity}></TextInput>
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={state.cityList}
            keyExtractor={item => item.cityCode}
            renderItem={({ item }) => <CityCard {...item} />}
          />
        </View>
      </View>
    )
  }
}

SearchCity.contextType = WeatherContext

let isDarkMode = Appearance.getColorScheme() === 'dark'
let bgColor = isDarkMode ? 'black' : 'white'
let secondaryColor = isDarkMode ? 'white' : 'black'

const styles = StyleSheet.create({
  main: {
    backgroundColor: bgColor,
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '90%',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    width: '90%',
  },
  inputCity: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    flex: 8,
    height: 35,
  },
  searchButton: {
    flex: 2,
    backgroundColor: secondaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 5,
  },
  searchButtonText: {
    color: bgColor,
  },
})
