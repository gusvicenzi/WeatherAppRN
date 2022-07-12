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

const initialState = {
  cities: [
    {
      cityName: 'Blumenau',
      cityCode: '35954',
      icon: 2,
      temp: 23,
      maxTemp: 28,
      minTemp: 14,
      isDayTime: true,
      iconPhrase: 'Nublado',
      time: '12:08',
    },
    {
      cityName: 'Timbó',
      cityCode: '99999',
      icon: 3,
      temp: 22,
      maxTemp: 29,
      minTemp: 13,
      isDayTime: true,
      iconPhrase: 'Nublado',
      time: '12:08',
    },
  ],
}
export default class SearchCity extends Component {
  state = {
    ...initialState,
  }
  render() {
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
            data={this.state.cities}
            keyExtractor={item => item.cityCode}
            renderItem={({ item }) => <CityCard {...item} />}
          />
        </View>
      </View>
    )
  }
}

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
